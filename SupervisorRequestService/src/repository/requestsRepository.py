from botocore.exceptions import ClientError
from boto3.resources.base import ServiceResource
from boto3.dynamodb.conditions import Key
import logging
from src.exceptions.exceptions import RetryableError, ValidationError, InternalError

# Configure logging to a file
# TODO: Considering including info/debug log levels if helpful
logging.basicConfig(filename='requestRepository.log', level=logging.ERROR,
                    format='%(asctime)s - %(levelname)s - %(name)s - %(message)s')

# Get a logger instance
logger = logging.getLogger(__name__)

# TODO: Move all constants to a central file for maintainability
# Ref: https://medium.com/nerd-for-tech/introduction-to-fastapi-and-local-dynamodb-595c990ed0f8
class RequestsRepository:
    def __init__(self, db: ServiceResource) -> None:
        self.__db = db
        self.__table = self.__db.Table('StoreRequests')

    # TODO: Support pagination
    def get_all_pending(self, store_id: str):
        try:
            return self.__table.query(
                IndexName="secondarySk-index",
                KeyConditionExpression=(Key("pk").eq(f"{store_id}") & Key("secondarySk").begins_with("PENDING")),
                ScanIndexForward=False).get('Items', [])
        except ClientError as e:
            logging.exception(f"DDB exception when trying to get all pending requests for store_id {store_id}")
            self.__handle_client_errors(e)
        except Exception as e:
            logging.exception(f"An unexpected error occurred when getting all pending requests for store_id: {store_id},"
                              f" {e}")
            raise InternalError("Internal error")

    def get_request(self, store_id: str, request_id: str):
        try:
            return self.__table.query(
                KeyConditionExpression=(Key("pk").eq(f"{store_id}") & Key("sk").eq(f"{request_id}"))).get('Items', [])
        except ClientError as e:
            logging.exception(f"DDB exception when trying to get request for store_id: {store_id} and request_id: {request_id}")
            self.__handle_client_errors(e)
        except Exception as e:
            logging.exception(f"An unexpected error occurred when getting request for store_id: {store_id} and request_id: {request_id}: {e}")
            raise InternalError("Internal error")

    def create_request(self, request: dict):
        response = self.__table.put_item(Item=request)
        return response

    # TODO: Update to request specifics
    # TODO: Make sure these changes to pk/sk result in a transactional delete and put to avoid creating a new entry
    def update_request(self, request: dict):
        pass

    def __handle_client_errors(self, e: ClientError):
        if e.response['Error']['Code'] == 'ProvisionedThroughputExceededException':
            logging.exception("Provisioned throughput exceeded. Consider retrying with backoff.")
            raise RetryableError(e.response['Error']['Message'])
        else:
            logging.exception(f"An unexpected DynamoDB error occurred: {e.response['Error']['Message']}")
            raise InternalError(e.response['Error']['Message'])


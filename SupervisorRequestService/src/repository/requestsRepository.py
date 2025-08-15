from botocore.exceptions import ClientError
from boto3.resources.base import ServiceResource

# Ref: https://medium.com/nerd-for-tech/introduction-to-fastapi-and-local-dynamodb-595c990ed0f8
class RequestsRepository:
    def __init__(self, db: ServiceResource) -> None:
        self.__db = db

    def get_all_pending(self):
        table = self.__db.Table('Requests')
        # TODO: Switch this to query
        response = table.scan()
        return response.get('Items', [])

    def get_request(self, pk: str):
        try:
            table = self.__db.Table('Requests')
            response = table.get_item(Key={'pk': pk})
            return response['Item']
        except ClientError as e:
            raise ValueError(e.response['Error']['Message'])

    def create_request(self, request: dict):
        print("hello")
        table = self.__db.Table('Requests')
        response = table.put_item(Item=request)
        print(response)
        return response

    # TODO: Make sure these are conditional writes
    # TODO: Update to request specifics
    def update_request(self, request: dict):
        table = self.__db.Table('Requests')
        response = table.update_item(
            Key={'pk': request.get('pk')},
            UpdateExpression="""                
                set
                    author=:author,
                    description=:description,
                    ingredients=:ingredients,
                    title=:title,
                    steps=:steps
            """,
            ExpressionAttributeValues={
                ':author': request.get('author'),
                ':description': request.get('description'),
                ':ingredients': request.get('ingredients'),
                ':title': request.get('title'),
                ':steps': request.get('steps')
            },
            ReturnValues="UPDATED_NEW"
        )
        return response


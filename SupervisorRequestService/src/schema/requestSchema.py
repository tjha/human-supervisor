from pydantic import BaseModel
from src.models.request import Request
import uuid
import time

# TODO: Pk could have scaling issues if a single store has significant requests (unlikely for SMB)
class RequestSchema(BaseModel):
    # storeId
    pk: str
    # requestId
    sk: str
    # status._.priority._.requestTime._.requestId
    secondarySk: str
    storeId: str
    status: str
    statusCode: str
    requestTime: int
    requestId: str
    lastUpdatedTime: int
    name: str
    header: str
    body: str
    phoneNumber: str
    answerTime: int | None = None
    answer: str | None = None
    resolvedBy: str | None = None
    priority: int | None = None
    idempotencyToken: str | None = None

# TODO: Define converter classes or utilize existing library tools
def construct_request_schema(request: Request, store_id: str):
    request_id = request.requestId if (request.requestId is not None) else str(uuid.uuid4())
    current_time = time.time()
    return RequestSchema(
        pk=str(store_id),
        sk=request_id,
        secondarySk=f"{request.status}._.{request.priority}._.{str(request.requestTime)}._.{request_id}",
        requestId=request_id,
        storeId=str(store_id),
        name=request.name,
        header=request.header,
        body=request.body,
        phoneNumber=request.phoneNumber,
        requestTime=request.requestTime,
        answerTime=request.answerTime if (request.answerTime is not None) else None,
        lastUpdatedTime=int(current_time),
        status=request.status,
        statusCode=request.statusCode,
        answer=request.answer,
        resolvedBy=request.resolvedBy,
        priority=request.priority,
        idempotencyToken=request.idempotencyToken
    )



from pydantic import BaseModel
from src.models.request import Request
import uuid
import time
from decimal import Decimal

class RequestSchema(BaseModel):
    # storeId._.requestId
    pk: str
    # status._.requestTime
    sk: str
    requestId: str
    name: str
    header: str
    body: str
    phoneNumber: str
    requestTime: Decimal
    answerTime: Decimal | None = None
    lastUpdatedTime: Decimal
    status: str
    answer: str | None = None
    resolvedBy: str | None = None
    priority: Decimal | None = None
    idempotencyToken: str | None = None

# TODO: Define converter classes or utilize existing library tools
def construct_request_schema(request: Request, storeId: str):
    requestId = request.requestId if (request.requestId is not None) else str(uuid.uuid4())
    current_time = time.time()
    return RequestSchema(
        pk=f"{storeId}._.{requestId}",
        sk=f"{request.status}._.{request.requestTime}",
        requestId=requestId,
        name=request.name,
        header=request.header,
        body=request.body,
        phoneNumber=request.phoneNumber,
        requestTime=Decimal(request.requestTime),
        answerTime=Decimal(request.answerTime) if (request.answerTime is not None) else None,
        lastUpdatedTime=Decimal(current_time),
        status=request.status,
        answer=request.answer,
        resolvedBy=request.resolvedBy,
        priority=request.priority,
        idempotencyToken=request.idempotencyToken
    )



from pydantic import BaseModel

class Request(BaseModel):
    requestId: str | None = None
    name: str
    header: str
    body: str
    phoneNumber: str
    requestTime: int
    answerTime: int | None = None
    status: str # TODO: Define in separate model (only 2 statuses, PENDING, NOT_PENDING)
    statusCode: str # TODO: Define in separate model (PENDING_RESPONSE, TIMEOUT, RESPONSE_RECEIVED)
    answer: str | None = None
    resolvedBy: str | None = None
    assignedTo: str | None = None
    priority: int | None = 0 # TODO: When feature is supported, higher priority number == more important
    idempotencyToken: str | None = None # TODO: Use to make updates idempotent. Maybe create GSI on this attribute

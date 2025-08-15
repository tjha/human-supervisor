from pydantic import BaseModel

class Request(BaseModel):
    requestId: str | None = None
    name: str
    header: str
    body: str
    phoneNumber: str
    requestTime: float
    answerTime: float | None = None
    status: str
    answer: str | None = None
    resolvedBy: str | None = None
    assignedTo: str | None = None
    priority: float | None = None
    idempotencyToken: str | None = None # TODO: Use to make updates idempotent. Maybe create GSI on this attribute

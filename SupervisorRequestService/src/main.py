from fastapi import FastAPI, HTTPException

from src.exceptions.exceptions import InternalError, ValidationError, RetryableError
from src.models.request import Request
from src.repository.requestsRepository import RequestsRepository
from src.db.db import initialize_db
from src.schema import requestSchema

app = FastAPI()
db = initialize_db()
requests_repository = RequestsRepository(db)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# TODO: Support pagination
@app.get("/stores/{store_id}/requests/pending")
def get_pending_requests(store_id: str):
    # TODO: Convert response into api model response obj
    try:
        response = requests_repository.get_all_pending(store_id)
        if len(response) == 0:
            raise HTTPException(status_code=404)
        return {"requests": response}
    except RetryableError:
        raise HTTPException(status_code=429)
    except InternalError:
        raise HTTPException(status_code=500)

# TODO: Support pagination
@app.get("/stores/{store_id}/requests/history")
def get_request_history(store_id: str):
    return {"message": "Hello World"}

@app.get("/stores/{store_id}/requests/{request_id}")
def get_request(store_id: str, request_id: str):
    try:
        response = requests_repository.get_request(store_id, request_id)
        if len(response) == 0:
            raise HTTPException(status_code=404)
        return {"request": response}
    except RetryableError:
        raise HTTPException(status_code=429)
    except InternalError:
        raise HTTPException(status_code=500)

@app.post("/stores/{store_id}/requests")
def create_request(store_id: str, request: Request):
    request_schema = requestSchema.construct_request_schema(request, store_id)
    requests_repository.create_request(request_schema.model_dump())
    return request_schema # TODO: Replace with a defined success/failure status response

@app.put("/stores/{store_id}/requests/{request_id}")
def update_request(store_id: str, request: Request):
    requests_repository.create_request(request.model_dump())
    return {"message": "Hello World"}

# TODO: Define a patch operation to update providing only limited set of fields

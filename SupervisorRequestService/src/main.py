from fastapi import FastAPI
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
    return {"message": "Hello World"}

# TODO: Support pagination
@app.get("/stores/{store_id}/requests/history")
def get_request_history(store_id: str):
    return {"message": "Hello World"}

@app.get("/stores/{store_id}/requests/{request_id}")
def get_request(store_id: str, request_id: str):
    return {"message": "Hello World"}

@app.post("/stores/{store_id}/requests")
def create_request(store_id: str, request: Request):
    print(store_id)
    print(type(store_id))
    request_schema = requestSchema.construct_request_schema(request, store_id)
    requests_repository.create_request(request_schema.model_dump())
    return request_schema # TODO: Replace with a defined success/failure status response

@app.put("/stores/{store_id}/requests/{request_id}")
def update_request(store_id: str, request: Request):
    requests_repository.create_request(request.model_dump())
    return {"message": "Hello World"}

# TODO: Define a patch operation to update providing only limited set of fields

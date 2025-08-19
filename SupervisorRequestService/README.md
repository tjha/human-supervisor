# SupervisorRequestService

This service oversees CRUD operations against the supervisor-requests table,
which contains all requests regardless of their lifecycle status (i.e. 
Pending, Resolved, or Unresolved).

## Local Environment Setup
1. `flox activate` should setup all dependencies you need.
1. Create an `.env` file with AWS credentials similar to `.env.example` 

## Local Environment Testing
1. `flox activate`
1. `source .venv/bin/activate`
1. `cd src/`
1. `fastapi dev`

## Personal Stack Deployment
TBD

## Integration Testing
TBD

## Notes
* Decided to use fastapi for quick setup
* Couple references on deploying scalable python backend service on ECS touching DDB:
  * https://codestax.medium.com/building-scalable-serverless-crud-apis-with-fastapi-and-aws-dynamodb-local-a-step-by-step-guide-794e146278e1
  * https://medium.com/aspiring-data-scientist/deploy-a-fastapi-app-on-aws-ecs-034b8b7b5ac2
* Using uvicorn as the python ASGI (Asynchronous server gateway interface) server: https://www.uvicorn.org/
* Separated out request model from ddb schema in separate modules
* Defined pk as just storeId. This should be fine for most cases since we wouldn't expect a single SMB to have sooo 
  many requests to cause serious hot partition issues. Also eliminates need to create separate table or GSI to query 
  for all the pending/not_pending requests for a store.
* Defined sk as a combination of `status._.priority._.requestTimestamp._.requestId`. This was chosen to 
  enable efficient queries of all PENDING and NOT_PENDING requests, future features like having higher priority 
  requests at the top of the list, and being able to support server-side filtering on request creation time.
* Define status as PENDING and NOT_PENDING to distinguish between 2 major classes of use-cases: pending requests and 
  requests that are completed or timeout in unresolved status. A statusCode was added to support these use cases. It 
  was not added to the sk yet because more consideration would need to be made on expected query patterns inclusive of 
  priority and status.
* statusCode consists of further specifications of the status like PENDING_RESPONSE, TIMEOUT, RESPONSE_RECEIVED.


## Improvements
* Consider adding more info logs to help debug and identify issues
* Support paginated reads for pending and history data
* Implement conversions outside of main.py, either within the requestRepository itself or another layer in between.
* Add unit tests to robustly validate all exception handling
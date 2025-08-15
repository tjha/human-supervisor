# SupervisorRequestService

This service oversees CRUD operations against the supervisor-requests table,
which contains all requests regardless of their lifecycle status (i.e. 
Pending, Resolved, or Unresolved).

## Local Environment Setup

## Local Environment Testing
For development speed, the service can be run locally against a local DDB
server.

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
* 
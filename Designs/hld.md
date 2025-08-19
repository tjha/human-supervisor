# Human-in-the-Loop AI Supervisor High Level Design

**Pre-requisite Readings:**

## Overview

The purpose of this document is to provide a high level overview for the design
of an application that consists of 4 core functions:

1. An AI agent capable of receiving calls from SMB customers, respond if it
   knows an answer
1. If the AI does not know the answer, it should trigger a "request help" 
   event to enable a human supervisor to assist in answering the customer's
   question.
1. A supervisor should be capable of responding to requests through a UI.
1. The AI agent learns the answers to requests. These learned answers are
   present in a knowledge base that can be reviewed by supervisors.

## Requirements

### Customer-Centric Functional Requirements

Please refer to [] for full product requirements. This secetion is tailored
specifically to identify those requirements that will have the most impact to
the overall design. Requirements are tagged by their corresponding phased
release (i.e. P0, P1, etc.).

***As a customer interacting with an AI agent receptionist, I can:***

1. **[P0]** Ask about basic SMB details and offerings and get immediate
   responses from the ai agent.
1. **[P0]** Ask more complicated questions for which I can receive answers
   through text or email if not answered during the live call.
1. **[P1]** Be redirected and talk directly to a human supervisor if the ai
   agent cannot answer my query.

***As a supervisor at an SMB responding to AI agent requests, I can::***

1. **[P0]** View all requests for my SMB in reverse chronological
   order.
1. **[P0]** View all learned responses by my AI agent.
1. **[P1]** See highly prioritized requests by the ai agent at the top.
1. **[P1]** Manually mark specific requests as high priority.
1. **[P1]** Receive an SMS/email for highly urgent requests.
1. **[P2]** Respond to a customer immediately through a phone transfer
   when the ai agent cannot answer a question.

***As an SMB rep (could also be supervisor)  maintaining the functionality of 
our AI agent receptionist, I can:***

1. **[P0]** View all learned answers by the ai agent from supervisor
   responses.

### Technical Requirements

1. Cost
1. Scaling requirements
1. TPS
1. Regions supported
1. Alarms, metrics, and dashboards

### Out-of-Scope

1. SMB Onboarding/offborading process
1. Mechanisms to manually customize and update an AI agent for a particular SMB
1. Mecahnisms to fix issues where incorrect human answers were provided to
   requests and learned by the AI agent
1. Multiple language support

## Design

### Key Decisions

1. A dedicated service will be responsible for orchestrating all phone call
   conversations with end customers across all SMBs.
1. A dedicated service will be responsible for all CRUD operations for Request
   lifecycle.
1. A dedicated service will be responsible for all CRUD operations for the
   Knowledge Base.
1. A dedicated service will handle all async notifications to customers for 
   completed requests.
1. All updates to the request table will trigger DDB streams and made available
   to all clients through eventbus.
1. Knowlege base will be updated with a lambda that is subscriped (via SQS) to
   request completion events filtering for appropriate status code. It can then
   talk to the outboundNotifiation service to send messsages to customers.
1. The agent will pull from the existing knowledge base on every initiation and
   be provided with the knowedge base answers that can be leveraged for future
   answers.
1. Another lambda can also subcribe to PENDING request events to notify
   supervisors if they elect for text/email notifications.

### High-Level Architecture

### Components


## Open Questions



## Appendix

### Glossary

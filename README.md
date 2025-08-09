# Human-in-the-Loop AI Supervisor

Goal: AI agent that can receive phone calls, respond if an answer is known, and
loop in a human when necessary. This project encompases the UI where a human
supervisor will handle responding to escalated queries. Additionally, the agent
should have a record of "learned" responses to update it's knowledge base for
future interactions with the same or other clients.

## Navigating the Repository

*Spikes* ==> Contains everything w.r.t. deep-dives on product, technologies, and
prototypes

*Designs* ==> Central place for all designs for the overall system. Includes
high-level and low-level designs

*Agent* ==> All code corresponding to the ai agent, it's interactions with
customers, sending routing requests to supervisor(s), and pulling from existing
knowledge base.

*Supervisor* ==> The full-stack supervisor application to view and respond to
requests from the ai agent

*KnowledgeBase* ==> Core application storing supervisor requests during their
lifecycle and saving learning answers for the ai agent to leverage in future
interactions

# Product Questions

Project spec: https://docs.google.com/document/d/1NsyjnR-Xq9qD4EBdAB50GZ14pxzoJqD1QLoXveMNBm0/edit?tab=t.0

These questions are about the overall experience as described in the project
spec. They may not all be answerable now, but should lay the groundwork for
high-level key decisions of the overall application.

1. In the project spec, the ask is to prompt the ai agent with business
   information about a fake salon. If we were to launch this to become more
   customizable for any SMB, how would the initial prompting be peformed? Who
   would perform it, an engineer at Frontdesk or reps from the SMB? How can we make
   the onboarding process easy, whether for an engineer or an SMB rep? How do we
   measure the effectiveness of the initial prompting? What is the process like
   to manually expand the scope of the ai in the future (i.e. concept of adding
   new funtions like in the call-gpt function-manifest)?
1. Will there be a single supervisor, or could there be multiple simultaneously
   working? *This could impact technical decisions w.r.t. making sure supervisors
   don't step on top of each other, and making sure there is a balance when it
   comes to how requests are handled. For future versions, this could impact
   escalation to human supervisor. Could there be a concept of multiple chains of
   escalation (i.e. supervisor of supervisors)?*
    1. V0 -> There is a single supervisor responding async to all requests.
    1. V1 -> There could be multiple supervisors responding async requests
       at the same time. Each request should only be answerable by a single
       supervisor. Other supervisors should know when a request is actively being
       worked on by another supervisor.
    1. V2 -> Multiple supervisors on the platform, but some can also take live
       call transfers from the ai agent. Load is evenly split across available
       supervisors.
1. What constitutes a request going from pending -> unresolved? How long do we
   want this timeout to be? Is there some SLA we want to tell customers on when
   the can expect to get a text back about the answer? If a request is
   unresolved, is it ever answerable again, or do we need to wait for a customer to
   ask a similar question again, or can a supervisor "revive" these requests by
   answering them, resulting in the answer being added to the agents knowledge
   base.
1. What sorts of questions could we expect the ai agent to receive and be able
   to answer without directing to a supervisor? Would they be general about the
   salon (like HOOP, address, etc.) or could there be customer-specific questions
   that should be easily answerable like ("when is my appt?", "can you reschedule
   my appt?"). What sorts of scenarios could cause a need to escalate to a
   supervisor?
    1. V0 -> Only answers general salon questions.
    1. V1 -> Can lookup basic appt information, but redirects rescheduling to a
       human supervisor
    1. V2 -> Can perform basic operation like appt. scheduling, but redirects to
       human supervisor for anything with a more subjective answer (i.e. "who
       would you recommend I set an appt. with?")
1. Is the ai agent able to learn PII specific to a customer? (i.e. Tejas is a
   regular customer who prefers to get a haircut from Leo. He also prefers
   afternoon appointments.) Or, should learning be limited to only general
   questions?
1. Is learning limited to supervisor request ansers? Can learning also take
   place from customer interactions?
1. What happens if a supervisor makes a mistake? They answered a request
   incorrectly. How do we identify such scenarios and enable an admin/supervisor
   to fix these mistakes and fix any incorrect learnings to the ai knowledge base?
1. How often could a supervisor be logged into to see requests? If they're not
   expected to be on the application often, how do we notify them of a pending
   request?
1. On the supervisor UI, what sorts of filtering mechanisms can a user perform?
   Can they review multiple businesses or only one? How should requests be
   sorted? (perhaps reverse chronological order?) Is there a concept of placing
   priority on specific requests? Are priorities decided by the supervisor or can
   the ai agent identify very critical requests? How should the requests be arranged on the UI to
   support potentially multiple pages cleanly?
1. Can a customer specify that they specifically want a supervisor to answer a
   particular question? (i.e. the request is to have a human rep contact the
   customer directly)
1. Can a supervisor delete requests?
1. Are there any legal requirements to clear up request data? Can it be
   considered PII? (i.e. GDPR and CCPA requirements).
1. What does the offborading process look like for a SMB that wants to delete
   all their requests or close their account?
1. How many concurrent customers can call a single SMB? Let's say the limit is
   5, would the rest be in a call waiting? How high can we make this limit (more
   of a technical/cost question.)


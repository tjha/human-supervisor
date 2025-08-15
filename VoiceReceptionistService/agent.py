from dotenv import load_dotenv

from livekit import agents
from livekit.agents import AgentSession, Agent, RoomInputOptions, RunContext
from livekit.agents.llm import function_tool
from livekit.plugins import (
    openai,
    cartesia,
    deepgram,
    noise_cancellation,
    silero,
)
from livekit.plugins.turn_detector.multilingual import MultilingualModel

import requests
import logging
import time
import json

logging.basicConfig(filename='logs/agent.log', level=logging.ERROR,
                    format='%(asctime)s - %(levelname)s - %(name)s - %(message)s')
logger = logging.getLogger(__name__)

# TODO: Move to utils file
def load_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
        return content
    except FileNotFoundError:
        logging.exception(f"Error: The file '{file_path}' was not found.")
    except Exception as e:
        logging.exception(f"An error occurred: {e}")


load_dotenv()

greeting_file_path = "functions/greeting.txt"
greeting = load_file(greeting_file_path)
instructions_file_path = "functions/instructions.txt"
instructions = load_file(instructions_file_path)

TEST_CUSTOMER_PHONE_NUMBER = "6095551234"
TEST_SALON_STORE_ID = "tejas-salon-uuid"

# TODO: Use environment variables for this (works well when deployed in different stages)
SUPERVISOR_REQUEST_URL = "http://0.0.0.0:8000"


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(instructions=instructions)

    # TODO: Move this in a separate module for scalability
    @function_tool
    async def request_supervisor(self, context: RunContext, phone_number: str, header: str, body: str, caller_name:
    str):
        print(f"Agent called request_supervisor tool with: phoneNumber: {phone_number}, callerName: {caller_name},"
              f" header: {header}, and body: {body}")
        data = {
            "name": caller_name,
            "header": header,
            "body": body,
            "phoneNumber": str(phone_number),
            "requestTime": int(time.time()),
            "status": "PENDING",
            "statusCode": "PENDING_RESPONSE"
        }
        response = requests.post(f"{SUPERVISOR_REQUEST_URL}/stores/{TEST_SALON_STORE_ID}/requests", data=json.dumps(data))
        print(response)
        if response.status_code == 200:
            return "The request was sent to the supervisor."
        else:
            logging.exception(f"Failed to create request to supervisor: {response}")
            return "The request to supervisor failed to send."

    # TODO: These should be lookups to data store to get details about the store. Combine them all into a single,
    #  getStoreInfo method
    @function_tool
    async def hours_of_operation(self):
        return "The store is open from 9am - 5pm Mon-Friday and 10am - 3pm on Saturday and Sunday"

    @function_tool
    async def all_stylists(self):
        return "Mandy, Mindy, Leo, and George are stylists working at Tejas's Amazing Salon"

    @function_tool
    async def available_stylists(self):
        return ("Leo is only available before 3pm. Mindy is available after 5pm. Mandy and George are on vacation for "
                "the rest of the week")

    @function_tool
    async def address(self):
        return "Tejas's Amazing Salon is located at 450 W 33rd St, New York, NY 10001."


async def entrypoint(ctx: agents.JobContext):
    session = AgentSession(
        stt=deepgram.STT(model="nova-3", language="multi"),
        llm=openai.LLM(model="gpt-4o-mini"),
        tts=cartesia.TTS(model="sonic-2", voice="f786b574-daa5-4673-aa0c-cbe3e8534c02"),
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
    )

    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_input_options=RoomInputOptions(
            # LiveKit Cloud enhanced noise cancellation
            # - If self-hosting, omit this parameter
            # - For telephony applications, use `BVCTelephony` for best results
            noise_cancellation=noise_cancellation.BVC(), 
        ),
    )

    await session.generate_reply(
        instructions=greeting
    )


if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))

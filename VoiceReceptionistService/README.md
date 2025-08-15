# Voice Receptionist Service

## Setup Instructions
* flox activate
* source `.venv/bin/activate`
* 

## Notes
Starting here: https://docs.livekit.io/agents/start/voice-ai/

* Init flox in voice-ai-quickstart
* Set flox edit to vim default (env variables in manifest.toml)
* Install python3
* Create venv and activated
* pip install packages
* Copy initial agent.py script
* `python agent.py download-files` - download model files
* `python agent.py console` - test running from terminal
* `python agent.py dev` - connect to livekit playground
* Tested out hosted playground here: https://agents-playground.livekit.io/
* Optionally can look more into local setup if ever needed: https://github.com/livekit/agents-playground/

## Future Improvements
* A better failsafe mechanism to record failed requests to a supervisor so that they're not lost.
* End the call after conversation is over (or it's fine to just wait for the customer to hang up?)
import requests
import os

BASE_URL = "https://voidr-challenge-785568282479.us-central1.run.app"
HEADERS = {
    "api_token": os.getenv("API_TOKEN"),
    "api_key": os.getenv("API_KEY"),
}


def festival_operation(operation: str):
    response = requests.post(BASE_URL, headers=HEADERS, json={"operation": operation})
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    festival_operation("start")
    festival_operation("end")

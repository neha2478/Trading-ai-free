#This of brokers fyers
from fyers_api import fyersModel
from app.core.config import settings

def fyers_auth(api_key: str, api_secret: str) -> str:
    session = fyersModel.SessionModel(
        client_id=api_key,
        secret_key=api_secret,
        response_type="code",
        grant_type="authorization_code",
        redirect_uri="https://your-app.com/callback"
    )
    response = session.generate_token()
    return response["access_token"]


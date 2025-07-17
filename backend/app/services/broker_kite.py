#This of broker kite connection
from kiteconnect import KiteConnect

def kite_auth(api_key: str, api_secret: str) -> str:
    kite = KiteConnect(api_key=api_key)
    # user must follow login flow to get request_token
    request_token = "...GET_FROM_UI..."
    data = kite.generate_session(request_token, api_secret=api_secret)
    return data["access_token"]


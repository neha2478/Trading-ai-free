#This is schema's file
from pydantic import BaseModel
from typing import Optional, List

class ScreenerResponse(BaseModel):
    symbol: str
    price: float

class BrokerIn(BaseModel):
    provider: str
    name: Optional[str]
    api_key: Optional[str]
    api_secret: Optional[str]
    oauth_token: Optional[str]

class BrokerOut(BrokerIn):
    id: str
    primary: bool
    status: str

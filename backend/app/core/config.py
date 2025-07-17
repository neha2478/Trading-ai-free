#This is config file
from pydantic import BaseSettings
from typing import List

class Settings(BaseSettings):
    ALLOWED_ORIGINS: List[str]
    ALPHAVANTAGE_KEY: str
    FYERS_CLIENT_ID: str
    FYERS_CLIENT_SECRET: str
    KITE_API_KEY: str
    KITE_API_SECRET: str

    class Config:
        env_file = ".env"

settings = Settings()

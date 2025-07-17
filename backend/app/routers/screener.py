#This is Screener file
from fastapi import APIRouter, Query
from typing import List
from app.services.data_fetcher import fetch_quotes

router = APIRouter()

@router.get("/", response_model=List[dict])
async def screener(symbols: str = Query(..., description="Comma-separated tickers")):
    syms: List[str] = [s.strip() for s in symbols.split(",") if s.strip()]
    quotes = fetch_quotes(syms)
    return [{"symbol": s, "price": quotes[s]} for s in syms]


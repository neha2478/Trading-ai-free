#File to fetchdata
import yfinance as yf
from typing import List, Dict

def fetch_quotes(symbols: List[str]) -> Dict[str, float]:
    data = yf.download(symbols, period="1d", interval="1m", progress=False)
    closes = data["Close"].iloc[-1]
    return {sym: float(closes[sym]) for sym in symbols}

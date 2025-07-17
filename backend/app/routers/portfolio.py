#This is portfolio file
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_portfolio():
    # TODO: connect to DB or in-memory store
    return {"strategies": []}


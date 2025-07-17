#This is brokers file
import uuid
from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import BrokerIn, BrokerOut

router = APIRouter()

# In-memory store
BROKERS: dict[str, dict] = {}

@router.get("", response_model=List[BrokerOut])
async def list_brokers():
    return [BrokerOut(**b) for b in BROKERS.values()]

@router.post("", response_model=BrokerOut)
async def add_broker(payload: BrokerIn):
    broker_id = str(uuid.uuid4())
    rec = payload.dict()
    rec.update({"id": broker_id, "primary": False, "status": "disconnected"})
    BROKERS[broker_id] = rec
    return BrokerOut(**rec)

@router.post("/{broker_id}/connect", response_model=BrokerOut)
async def connect_broker(broker_id: str):
    rec = BROKERS.get(broker_id)
    if not rec:
        raise HTTPException(404, "Broker not found")
    # TODO: exchange API key for OAuth token via service
    rec["status"] = "connected"
    return BrokerOut(**rec)

@router.patch("/{broker_id}/primary", response_model=BrokerOut)
async def set_primary(broker_id: str):
    if broker_id not in BROKERS:
        raise HTTPException(404, "Broker not found")
    for b in BROKERS.values():
        b["primary"] = False
    BROKERS[broker_id]["primary"] = True
    return BrokerOut(**BROKERS[broker_id])

@router.delete("/{broker_id}", status_code=204)
async def delete_broker(broker_id: str):
    if broker_id not in BROKERS:
        raise HTTPException(404, "Broker not found")
    del BROKERS[broker_id]


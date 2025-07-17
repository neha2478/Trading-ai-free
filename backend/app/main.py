#This is main file
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import ping, screener, portfolio, brokers

def create_app() -> FastAPI:
    app = FastAPI(title="Trading AI Free")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(ping.router)
    app.include_router(screener.router, prefix="/screener", tags=["screener"])
    app.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
    app.include_router(brokers.router, prefix="/brokers", tags=["brokers"])
    return app

app = create_app()

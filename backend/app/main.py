from fastapi import FastAPI
from pydantic import BaseModel
from app.routes import users


app = FastAPI()

app.include_router(users.router)

from fastapi import FastAPI
from pydantic import BaseModel
from routes import users,categorias


app = FastAPI()



app.include_router(users.router)
app.include_router(categorias.router)

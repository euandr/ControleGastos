from fastapi import FastAPI
from pydantic import BaseModel
from routes import users,categorias,tags, transacoes


app = FastAPI()



app.include_router(users.router)
app.include_router(categorias.router)
app.include_router(tags.router)
app.include_router(transacoes.router)

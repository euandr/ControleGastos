from fastapi import FastAPI
from pydantic import BaseModel
from routes import users,categorias,tags, transacoes, anotacoes, analytics


app = FastAPI(title="ControleGastos API", version="1.0.0")



app.include_router(users.router)
app.include_router(categorias.router)
app.include_router(tags.router)
app.include_router(transacoes.router)
app.include_router(anotacoes.router)
app.include_router(analytics.router)


@app.get("/")
def read_root():
    return {"message": "API rodando!"}
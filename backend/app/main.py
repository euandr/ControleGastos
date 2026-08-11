from fastapi import FastAPI
from pydantic import BaseModel
from routes import users,categorias,tags, transacoes, anotacoes, analises
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ControleGastos API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router)
app.include_router(categorias.router)
app.include_router(tags.router)
app.include_router(transacoes.router)
app.include_router(anotacoes.router)
app.include_router(analises.router)


@app.get("/")
def read_root():
    return {"message": "API rodando!"}
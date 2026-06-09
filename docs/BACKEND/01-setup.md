# Backend: Setup FastAPI

## O que você vai fazer

Neste documento:

- Criar pasta `backend/`
- Instalar FastAPI e dependências
- Criar arquivo `main.py`
- Rodar o servidor
- Testar documentação automática

---

## Passo 1: Criar pasta backend

```bash
mkdir backend
cd backend
```

---

## Passo 2: Criar virtual environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

---

## Passo 3: Instalar dependências

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv pydantic
```

**Crie `backend/requirements.txt`:**

```
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
python-dotenv==1.0.0
pydantic==2.5.0
```

---

## Passo 4: Criar `main.py`

Crie `backend/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ControleGastos API",
    description="API para controlar gastos pessoais",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "✓ ControleGastos API está rodando!"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
```

---

## Passo 5: Rodar o servidor

```bash
cd backend
uvicorn main:app --reload
```

**Saída esperada:**

```
Uvicorn running on http://127.0.0.1:8000
```

---

## Passo 6: Testar

### No Browser

- Acesse: http://localhost:8000/docs (Swagger UI)
- Ou: http://localhost:8000/redoc (ReDoc)

### Via curl

```bash
curl http://localhost:8000/
```

---

## Estrutura de pastas

```
backend/
├── main.py
├── requirements.txt
├── .env
├── venv/
├── app/
│   ├── main.py (depois)
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   └── services/
└── test_connection.py (depois)
```

---

## Próximo passo

➡️ [[BACKEND/02-models.md]] - Crie os modelos SQLAlchemy

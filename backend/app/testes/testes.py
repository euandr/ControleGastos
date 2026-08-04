# import requests
from datetime import datetime
import calendar

# dados = {
#     "username": "teste",
#     "password": "teste"
# }

# resposta = requests.post(
#     "http://127.0.0.1:8000/usuarios/login-form",
#     data=dados
# )

# print(resposta.status_code)
# print(resposta.json())


# mes_atual = datetime.now().strftime("%m-%Y")
# mes = "2027-04"
# mes = mes[0:5] + f"{int(mes[5:])-1:02d}"
# if mes[5:] == '00':
#     mes = str(int(mes[0:4])-1) + "-12"

# dia_atual = datetime.now().day




# qtd_dias_no_mes = calendar.monthrange(int(mes[:4]), int(mes[5:]))[1]
# print(dias)   


categorias = [
    {
      "id": "d0f03464-612d-44e4-82fd-0d677390fe61",
      "nome": "comida",
      "cor": "#3B82F6",
      "quantidade_transacoes": 6
    },
    {
      "id": "53ba15ef-1800-4ca5-b97d-6e4957275150",
      "nome": "testando123",
      "cor": "#F59E0B",
      "quantidade_transacoes": 0
    },
    {
      "id": "2d9e3863-dee1-47bf-a33d-8916794eb9d2",
      "nome": "teste1",
      "cor": "#3B82F6",
      "quantidade_transacoes": 0
    },
    {
      "id": "d17f2956-57f2-49c4-87ca-2b1b6e584ad1",
      "nome": "teste2",
      "cor": "#3B82F6",
      "quantidade_transacoes": 0
    },
    {
      "id": "afdda993-03e9-4cb1-9350-69306cd1bb37",
      "nome": "teste3",
      "cor": "#3B82F6",
      "quantidade_transacoes": 0
    }
  ]

resultado = [] 

transacoes = [
    {"categoria_id": "d0f03464-612d-44e4-82fd-0d677390fe61", "valor": 50.0},
    {"categoria_id": "d0f03464-612d-44e4-82fd-0d677390fe61", "valor": 20.0},
    {"categoria_id": "2d9e3863-dee1-47bf-a33d-8916794eb9d2", "valor": 15.0}
]

for c in categorias:
    total = 0.0

    for t in transacoes:
        if c['id']==t['categoria_id']:
            total+=t['valor']

    resultado.append({
        'id':c['id'],
        'nome':c['nome'],
        'valor_total':total
    })

print(resultado)
  
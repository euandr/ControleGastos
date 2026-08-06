# Comunicação entre Frontend e Backend (React + Axios)

## Objetivo

O frontend precisa enviar requisições para o backend (FastAPI).

Como praticamente todas as rotas exigem autenticação (`Bearer Token`), não é interessante enviar o token manualmente em cada requisição.

A solução é criar uma única instância do Axios e configurá-la para adicionar o token automaticamente.

---

# Estrutura

```text
src/

services/
│
├── api.ts
├── analytics.ts
├── transacoes.ts
├── categorias.ts
└── auth.ts
```

---

# api.ts

Este arquivo cria uma única instância do Axios.

Exemplo:

```ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

Agora qualquer arquivo poderá fazer:

```ts
api.get(...)
api.post(...)
api.put(...)
api.delete(...)
```

---

# Token

Durante o desenvolvimento, enquanto a tela de Login ainda não estiver pronta, posso utilizar um token obtido pelo Swagger do FastAPI.

Depois que a autenticação for implementada, esse token será obtido automaticamente após o Login.

---

# Interceptor

O interceptor executa antes de qualquer requisição.

Sua função é adicionar automaticamente:

```http
Authorization: Bearer TOKEN
```

Assim não preciso escrever esse código em todas as requisições.

Depois de configurado:

```ts
api.get("/transacoes");
```

automaticamente será enviado:

```http
GET /transacoes

Authorization: Bearer eyJhbGc...
```

---

# Como a página utiliza

A página faz a chamada para um service.

Fluxo:

```text
Dashboard
        ↓
analytics.ts
        ↓
api.get(...)
        ↓
FastAPI
```

Exemplo simples:

```ts
// analytics.ts

export async function buscarResumoMensal(mes: string) {
  return await api.get(`/analytics/resumo?mes=${mes}`);
}
```

Na página:

```ts
const dados = await buscarResumoMensal("2026-07");
```

---

# Componentes

Os componentes **não fazem requisições**.

Eles apenas recebem os dados.

Exemplo:

```tsx
<SummaryCards cards={dados} />
```

Assim:

- Dashboard busca os dados.
- SummaryCards apenas exibe.

---

# Fluxo completo

```text
Dashboard
        ↓
Service
        ↓
api.ts
        ↓
Interceptor adiciona o Bearer Token
        ↓
FastAPI
        ↓
Resposta
        ↓
Dashboard
        ↓
Componentes
```

---

# api.ts e auth.ts

Esses arquivos **não são temporários**.

## api.ts

Permanece durante todo o projeto.

Responsabilidades:

- criar a instância do Axios;
- definir a URL da API;
- configurar o interceptor;
- adicionar automaticamente o token em todas as requisições.

Exemplo de uso:

```ts
api.get("/transacoes");
api.post("/login", dados);
```

---

## auth.ts

Também permanece no projeto.

É responsável por tudo relacionado à autenticação.

Exemplos de funções:

```ts
login();

logout();

getToken();

isAuthenticated();
```

Com o projeto evoluindo, pode conter:

```ts
salvarToken();

removerToken();

refreshToken();
```

---

# O que é temporário?

Apenas o token utilizado durante o desenvolvimento.

Enquanto a tela de Login não estiver pronta:

```text
Swagger
    ↓
Faço Login
    ↓
Copio o JWT
    ↓
Interceptor utiliza esse token
```

Quando o Login for implementado:

```text
Tela de Login
    ↓
Backend retorna o JWT
    ↓
Token salvo (ex.: localStorage)
    ↓
Interceptor lê automaticamente esse token
```

Ou seja, o único elemento temporário é o **token fixo**.

Os arquivos `api.ts` e `auth.ts` continuam existindo normalmente.

---

# Ordem de implementação

1. Criar `api.ts`.
2. Configurar a URL da API utilizando `.env`.
3. Criar o interceptor.
4. Utilizar um token obtido pelo Swagger.
5. Desenvolver normalmente todas as páginas consumindo a API.
6. Implementar a tela de Login.
7. Substituir o token fixo pelo token retornado pelo backend.

Dessa forma não é necessário esperar a autenticação ficar pronta para começar o desenvolvimento do restante da aplicação.

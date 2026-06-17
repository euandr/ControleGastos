# referencia

## repositorios

https://github.com/betaacid/FastAPI-Reference-App

https://www.youtube.com/watch?v=0sOvCWFmrtA

## videos

continuar nessa playlist do youtube: [youtubeHashtag](https://www.youtube.com/watch?v=5k0ko2e_pso&list=PLpdAy0tYrnKy3TvpCT-x7kGqMQ5grk1Xq&index=3)

- entender mais sobre o token

# documentação supabase com python

https://supabase.com/docs/reference/python/select

# to do

## ✅ Já concluído

- [X]  Estrutura do projeto
- [X]  Conexão com Supabase
- [X]  Hash de senha
- [X]  Cadastro de usuário (`POST /usuarios`)
- [X]  Login (`POST /usuarios/login`)
- [X]  Geração de JWT
- [X]  Verificação de JWT

# 1. Finalizar autenticação

## Dependência de usuário logado

- [ ]  Criar função `usuario_logado()`
- [ ]  Ler token do header `Authorization`
- [ ]  Extrair o Bearer Token
- [ ]  Chamar `verificar_token()`
- [ ]  Retornar `user_id`

## Teste de autenticação

- [ ]  Criar endpoint `GET /usuarios/me`
- [ ]  Retornar o ID do usuário logado
- [ ]  Testar no Swagger

---

# 2. Categorias

## Backend

- [ ]  Schema de Categoria
- [ ]  Service de Categoria
- [ ]  Route de Categoria

## Endpoints

- [ ]  `POST /categorias`
- [ ]  `GET /categorias`
- [ ]  `DELETE /categorias/{id}`

## Segurança

- [ ]  Todas as rotas usando `Depends(usuario_logado)`

---

# 3. Tags

## Backend

- [ ]  Schema de Tag
- [ ]  Service de Tag
- [ ]  Route de Tag

## Endpoints

- [ ]  `POST /tags`
- [ ]  `GET /tags`
- [ ]  `DELETE /tags/{id}`

---

# 4. Transações

## Backend

- [ ]  Schema de Transação
- [ ]  Service de Transação
- [ ]  Route de Transação

## Endpoints

- [ ]  `POST /transacoes`
- [ ]  `GET /transacoes`
- [ ]  `GET /transacoes/{id}`
- [ ]  `PUT /transacoes/{id}`
- [ ]  `DELETE /transacoes/{id}`

---

# 5. Anotações

## Backend

- [ ]  Schema de Anotação
- [ ]  Service de Anotação
- [ ]  Route de Anotação

## Endpoints

- [ ]  `POST /anotacoes`
- [ ]  `GET /anotacoes`
- [ ]  `PUT /anotacoes/{id}`
- [ ]  `DELETE /anotacoes/{id}`

---

# 6. Dashboard

## Resumo mensal

- [ ]  Receitas do mês
- [ ]  Despesas do mês
- [ ]  Saldo do mês

## Endpoint

- [ ]  `GET /analytics/resumo-mensal`

---

# 7. Relatórios e gráficos

- [ ]  Gastos por categoria
- [ ]  Evolução mensal
- [ ]  Categorias mais utilizadas
- [ ]  Tags mais utilizadas

---

# 8. Frontend

## Autenticação

- [ ]  Tela de cadastro
- [ ]  Tela de login
- [ ]  Salvar token
- [ ]  Logout

## Categorias

- [ ]  Criar categoria
- [ ]  Listar categorias

## Tags

- [ ]  Criar tag
- [ ]  Listar tags

## Transações

- [ ]  Criar transação
- [ ]  Editar transação
- [ ]  Excluir transação
- [ ]  Listar transações

## Dashboard

- [ ]  Cards de resumo
- [ ]  Gráficos

---

# Meta Atual

- [ ]  Criar `usuario_logado()`
- [ ]  Criar `GET /usuarios/me`
- [ ]  Criar `POST /categorias`
- [ ]  Criar `GET /categorias`

Quando isso estiver pronto, a autenticação e o primeiro CRUD estarão funcionando.

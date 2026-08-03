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

- [X] Estrutura do projeto
- [X] Conexão com Supabase
- [X] Hash de senha
- [X] Cadastro de usuário (`POST /usuarios`)
- [X] Login (`POST /usuarios/login`)
- [X] Geração de JWT
- [X] Verificação de JWT

# 1. Finalizar autenticação

## Dependência de usuário logado

- [X] Criar função `usuario_logado()`
- [X] Ler token do header `Authorization`
- [X] Extrair o Bearer Token
- [X] Chamar `verificar_token()`
- [X] Retornar `user_id`

## Teste de autenticação

- [X] Criar endpoint `GET /usuarios/me`
- [X] Retornar o ID do usuário logado
- [X] Testar no Swagger

- configurar para poder testar os enpoint protegidos atraves do swagger

---

# 2. Categorias

- precisa criar as polices

## Backend

- [X] Schema de Categoria
- [X] Service de Categoria
- [X] Route de Categoria

## Endpoints

- [X] `POST /categorias`
- [X] `GET /categorias`

  - [X] melhorar a formatacao do **response**
- [X] `DELETE /categorias/{id}`

## Segurança

- [X] Todas as rotas usando `Depends(usuario_logado)`

---

# 3. Tags

## Backend

- [X] Schema de Tag
- [X] Service de Tag
- [X] Route de Tag

## Endpoints

- [X] `POST /tags`
- [X] `GET /tags`
- [X] `DELETE /tags/{id}`

---

# 4. Transações

## Backend

- [X] Schema de Transação
- [X] Service de Transação
- [X] Route de Transação

## Endpoints

- [X] `POST /transacoes`
- [X] `GET /transacoes`
- [X] `GET /transacoes/{id}`
- [X] `PUT /transacoes/{id}`
- [X] `DELETE /transacoes/{id}`

---

# 5. Anotações

## Backend

- [X] Schema de Anotação
- [X] Service de Anotação
- [X] Route de Anotação

## Endpoints

- [X] `POST /anotacoes`
- [X] `GET /anotacoes`
- [X] `PATCH /anotacoes/{id}`
- [X] `DELETE /anotacoes/{id}`

---

# 6. Dashboard

## Resumo mensal

- [ ] Receitas do mês
- [ ] Despesas do mês
- [ ] Saldo do mês

## Endpoint

- [ ] `GET /analytics/resumo-mensal`

---

# 7. Relatórios e gráficos

- [ ] Gastos por categoria
- [ ] Evolução mensal
- [ ] Categorias mais utilizadas
- [ ] Tags mais utilizadas

---

# 8. Frontend

## Autenticação

- [ ] Tela de cadastro
- [ ] Tela de login
- [ ] Salvar token
- [ ] Logout

## Categorias

- [ ] Criar categoria
- [ ] Listar categorias

## Tags

- [ ] Criar tag
- [ ] Listar tags

## Transações

- [ ] Criar transação
- [ ] Editar transação
- [ ] Excluir transação
- [ ] Listar transações

## Dashboard

- [ ] Cards de resumo
- [ ] Gráficos

---

# Meta Atual

- [ ] Criar `usuario_logado()`
- [ ] Criar `GET /usuarios/me`
- [ ] Criar `POST /categorias`
- [ ] Criar `GET /categorias`

Quando isso estiver pronto, a autenticação e o primeiro CRUD estarão funcionando.

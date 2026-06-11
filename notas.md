# referencia

## repositorios

https://github.com/betaacid/FastAPI-Reference-App

https://www.youtube.com/watch?v=0sOvCWFmrtA

## videos

- [ ]  continuar nessa playlist do youtube: [youtubeHashtag](https://www.youtube.com/watch?v=5k0ko2e_pso&list=PLpdAy0tYrnKy3TvpCT-x7kGqMQ5grk1Xq&index=3)

# documentação supabase com python

https://supabase.com/docs/reference/python/select

# to do

- [X]  login

- em service/auth.py, criar uma funcao login que recebe os dados e retorna um tokin
- como funcionara o token

```
A ideia do JWT é:
```

1. Usuário faz login.
2. Backend gera o token.
3. Frontend guarda o token.
4. Toda vez que o usuário acessa uma rota protegida, o frontend envia o token.
5. O backend valida o token antes de executar a rota.
6.

- [ ]  pesquisar como fazer verificação de expiração do token
- [ ]  cadastro

  - [ ]  verificação de email
    - [ ]  verficar se ja existe
    - [ ]  mensagem de verificão de email, para validar email

      - [X]  criar coluna: email_verificado(true or false). Na tabea users

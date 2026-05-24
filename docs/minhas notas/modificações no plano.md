# modificações no plano

Como falado eu ficarei responsavel pelo backend, o que inclui o BD, por isso quero uma boa documentação. AInda estouaprendendo.

Python=3.11

para deployment provavelmente sera os do plano mesmo (Deployment: Vercel (Frontend) + Railway/Render (Backend)), mas ainda nao sei exatamente, podendo haver mudanças.

A porcentagem das deduções automáticas (dízimo e investimento) é ajustada pelo proprio usuario ao criar.

crie uma tabela users e modifique as outras para se conportarem de acordo. como não tera login de inicio, havera apenas um usuario fixo, mas isso ja deixa o sistema preparado para ter multiplos usuarios no futuro, para quando eu quiser implementar o login.

dizimo e investimento precisam ser configuradas manualmente para irem para a tabela dedections.

### Carry-Over do Restante

No fim de janeiro:

- Sistema calcula restante: R$ 1.000
- Sistema cria uma receita automática no mês seguinte
  com is_carried_over = true ← Sistema faz tudo

Início de fevereiro:

- Receita já está lá!
- Você só vê e pronto

## Logica dos cálculos

dízimo deve ser configurado assim como investimento.

investimento pode ser tanto uma porcentagem das receitas quanto um valor fixo, ou ambos ao mesmo tempo ( podendo haver um percentual fixo e o usuario cria uam linha para colocar um valor a mais), a escolha é do usuario.

## gráficos

- quero Gráfico de Barras por Categoria
- quero um grafico comparando gastos com receitas, investimento e restante disponível(analise isso e recomende o melhor tipo de gráfico e a melhor forma, caso essa não seja adequada.)

## futuro

add templates de configurações de investimento (ex: 10% dízimo + 20% investimento e outras.) para o usuario escolher, alem de permitir criar templates personalizados.

## tecnologias e dependencias

nao deixe algo fixo, pois estou aprendendo e possívelmente posso mudar.
deixe como recomendação e na frente explique o que faz e o pq usar.

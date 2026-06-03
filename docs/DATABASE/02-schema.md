# Database: Schema das Tabelas

## Visão geral

O modelo final é centrado em **transações**. Em vez de separar receita, despesa e investimento em tabelas diferentes, tudo passa por `transacoes`, com classificação por `tipo`, `natureza`, `necessidade`, categorias, tags e anotações mensais.

## Tabelas principais

O projeto usa 7 tabelas:


| Tabela                  | Descrição                                            |
| ----------------------- | ------------------------------------------------------ |
| `usuarios`              | Usuários do sistema                                   |
| `transacoes`            | Núcleo financeiro: receitas, despesas e investimentos |
| `categorias`            | Categorias criadas por usuário                        |
| `transacoes_categorias` | Relação N:N entre transações e categorias          |
| `tags`                  | Marcadores livres criados por usuário                 |
| `transacoes_tags`       | Relação N:N entre transações e tags                |
| `anotacoes`             | Anotações por usuário e mês de referência         |

---

## Script SQL para criar todas as tabelas

Copie e execute no Supabase SQL Editor:

```sql
dCREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    senha_hash TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    natureza VARCHAR(20),
    necessidade BOOLEAN DEFAULT TRUE,
    metodo_pagamento VARCHAR(20),
    data DATE NOT NULL,
    mes_ref CHAR(7) NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    UNIQUE(usuario_id, nome)
);

CREATE TABLE transacoes_categorias (
    transacao_id UUID REFERENCES transacoes(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES categorias(id) ON DELETE CASCADE,
    PRIMARY KEY (transacao_id, categoria_id)
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    nome VARCHAR(50) NOT NULL,
    UNIQUE(usuario_id, nome)
);

CREATE TABLE transacoes_tags (
    transacao_id UUID REFERENCES transacoes(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (transacao_id, tag_id)
);

CREATE TABLE anotacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL,
    mes_ref CHAR(7),
    criado_em TIMESTAMP DEFAULT NOW()
);
```

---

## Colunas principais

### usuarios

- `id` - UUID único
- `email` - Email único
- `nome` - Nome do usuário
- `senha_hash` - Senha criptografada
- `criado_em` - Data de criação

### transacoes

- `id` - UUID único
- `usuario_id` - Referência ao usuário dono da transação
- `descricao` - Texto livre da transação
- `valor` - Valor monetário
- `tipo` - `receita`, `despesa` ou `investimento`
- `natureza` - `fixo` ou `variavel`
- `necessidade` - Indica se a despesa é necessária
- `metodo_pagamento` - `debito`, `dinheiro`, `pix` ou `cartao`
- `data` - Data real da transação
- `mes_ref` - Referência mensal no formato `YYYY-MM`
- `criado_em` - Data de criação

### categorias

- `id` - UUID único
- `usuario_id` - Dono da categoria
- `nome` - Nome visível da categoria
- `cor` - Cor usada em gráficos

### transacoes_categorias

- `transacao_id` - Referência à transação
- `categoria_id` - Referência à categoria

### tags

- `id` - UUID único
- `usuario_id` - Dono da tag
- `nome` - Nome da tag

### transacoes_tags

- `transacao_id` - Referência à transação
- `tag_id` - Referência à tag

### anotacoes

- `id` - UUID único
- `usuario_id` - Dono da anotação
- `conteudo` - Texto livre
- `mes_ref` - Mês de referência opcional
- `criado_em` - Data de criação

---

## Relacionamentos

```
usuarios (1) → (N) transacoes
usuarios (1) → (N) categorias
usuarios (1) → (N) tags
usuarios (1) → (N) anotacoes
transacoes (N) ↔ (N) categorias
transacoes (N) ↔ (N) tags
```

---

## Regras de modelagem

- `transacoes.tipo` concentra o domínio financeiro em três valores: receita, despesa e investimento.
- `transacoes.natureza` ajuda a separar lançamentos fixos e variáveis.
- `transacoes.necessidade` permite análises como despesas necessárias vs. não necessárias.
- `mes_ref` substitui a tabela de meses; o mês é inferido diretamente da transação e da anotação.
- `categorias` e `tags` são entidades por usuário, com unicidade garantida por nome dentro do mesmo `usuario_id`.

---

## Próximo passo

➡️ [[DIAGRAMAS/er-diagram.md]] - Veja o diagrama ER visual

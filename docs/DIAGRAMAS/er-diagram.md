# Diagramas: Entity Relationship (ER)

## Diagrama ER em PlantUML

Copie e cole em: https://www.plantuml.com/plantuml/uml/

```plantuml
@startuml ControleGastos_ER
entity "usuarios" as usuarios {
    * id : UUID <<PK>>
    email : VARCHAR(255)
    nome : VARCHAR(255)
    senha_hash : TEXT
    criado_em : TIMESTAMP
}

entity "transacoes" as transacoes {
    * id : UUID <<PK>>
    * usuario_id : UUID <<FK>>
    descricao : TEXT
    valor : DECIMAL(10,2)
    tipo : VARCHAR(20)
    natureza : VARCHAR(20)
    necessidade : BOOLEAN
    metodo_pagamento : VARCHAR(20)
    data : DATE
    mes_ref : CHAR(7)
    criado_em : TIMESTAMP
}

entity "categorias" as categorias {
    * id : UUID <<PK>>
    * usuario_id : UUID <<FK>>
    nome : VARCHAR(100)
    cor : VARCHAR(7)
    criado_em : TIMESTAMP
}

entity "transacoes_categorias" as transacoes_categorias {
    * transacao_id : UUID <<PK,FK>>
    * categoria_id : UUID <<PK,FK>>
}

entity "tags" as tags {
    * id : UUID <<PK>>
    * usuario_id : UUID <<FK>>
    nome : VARCHAR(50)
}

entity "transacoes_tags" as transacoes_tags {
    * transacao_id : UUID <<PK,FK>>
    * tag_id : UUID <<PK,FK>>
}

entity "anotacoes" as anotacoes {
    * id : UUID <<PK>>
    * usuario_id : UUID <<FK>>
    conteudo : TEXT
    mes_ref : CHAR(7)
    criado_em : TIMESTAMP
}

usuarios ||--o{ transacoes
usuarios ||--o{ categorias
usuarios ||--o{ tags
usuarios ||--o{ anotacoes
transacoes ||--o{ transacoes_categorias
categorias ||--o{ transacoes_categorias
transacoes ||--o{ transacoes_tags
tags ||--o{ transacoes_tags
@enduml
```

---

## Como visualizar

1. Acesse: https://www.plantuml.com/plantuml/uml/
2. Cole o código acima
3. Clique "Submit"
4. Veja o diagrama renderizado

---

## Relacionamentos

- **usuarios → transacoes**: Um usuário registra várias transações
- **usuarios → categorias**: Um usuário cria várias categorias
- **usuarios → tags**: Um usuário cria várias tags
- **usuarios → anotacoes**: Um usuário pode registrar várias anotações por mês
- **transacoes ↔ categorias**: Uma transação pode ter uma ou mais categorias
- **transacoes ↔ tags**: Uma transação pode ter uma ou mais tags

---

## Próximo passo

➡️ [[DIAGRAMAS/sequencia.md]] - Veja os diagramas de sequência

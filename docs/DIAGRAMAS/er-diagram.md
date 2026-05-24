# Diagramas: Entity Relationship (ER)

## Diagrama ER em PlantUML

Copie e cole em: https://www.plantuml.com/plantuml/uml/

```plantuml
@startuml ControleGastos_ER
entity "users" as users {
    * id : UUID <<PK>>
    email : VARCHAR(255)
    name : VARCHAR(255)
    password_hash : VARCHAR(255)
}

entity "months" as months {
    * id : UUID <<PK>>
    * user_id : UUID <<FK>>
    month : DATE
    total_income : DECIMAL
    total_expenses : DECIMAL
    balance : DECIMAL
}

entity "income" as income {
    * id : UUID <<PK>>
    * user_id : UUID <<FK>>
    * month_id : UUID <<FK>>
    description : VARCHAR
    amount : DECIMAL
}

entity "expense_categories" as categories {
    * id : UUID <<PK>>
    * user_id : UUID <<FK>>
    name : VARCHAR
    color : VARCHAR
}

entity "expenses" as expenses {
    * id : UUID <<PK>>
    * user_id : UUID <<FK>>
    * month_id : UUID <<FK>>
    * category_id : UUID <<FK>>
    description : VARCHAR
    amount : DECIMAL
}

entity "deductions" as deductions {
    * id : UUID <<PK>>
    * user_id : UUID <<FK>>
    * month_id : UUID <<FK>>
    type : VARCHAR
    calculated_amount : DECIMAL
}

entity "notes" as notes {
    * id : UUID <<PK>>
    * user_id : UUID <<FK>>
    * month_id : UUID <<FK>>
    content : TEXT
}

users ||--o{ months
users ||--o{ income
users ||--o{ expenses
users ||--o{ categories
months ||--o{ income
months ||--o{ expenses
months ||--o{ deductions
categories ||--o{ expenses
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

- **users → months**: Um usuário tem vários meses
- **users → income**: Um usuário registra várias receitas
- **months → income**: Um mês agrupa várias receitas
- **categories → expenses**: Uma categoria tem várias despesas

---

## Próximo passo

➡️ [[DIAGRAMAS/sequencia.md]] - Veja os diagramas de sequência

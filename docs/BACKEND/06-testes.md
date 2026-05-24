# Backend: Testes de Endpoints

## Ferramentas recomendadas

- **Insomnia** - GUI visual (recomendado)
- **Postman** - Também é ótimo
- **curl** - Linha de comando

---

## Exemplo: Criar Receita

**Método:** POST  
**URL:** http://localhost:8000/api/income/  
**Body (JSON):**

```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "month_id": "660e8400-e29b-41d4-a716-446655440111",
  "description": "Salário",
  "amount": 3000.00,
  "income_date": "2024-01-05"
}
```

**Resposta esperada:**

```json
{
  "id": "770e8400-e29b-41d4-a716-446655440222",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "month_id": "660e8400-e29b-41d4-a716-446655440111",
  "description": "Salário",
  "amount": 3000,
  "income_date": "2024-01-05",
  "created_at": "2024-01-05T10:30:00"
}
```

---

## Checklist de testes

### Income
- [ ] GET /api/income/?month_id=xxx - Listar
- [ ] POST /api/income/ - Criar
- [ ] PUT /api/income/{id} - Atualizar
- [ ] DELETE /api/income/{id} - Deletar

### Expenses
- [ ] GET /api/expenses/?month_id=xxx - Listar
- [ ] POST /api/expenses/ - Criar
- [ ] PUT /api/expenses/{id} - Atualizar
- [ ] DELETE /api/expenses/{id} - Deletar

### Categories
- [ ] GET /api/categories/ - Listar
- [ ] POST /api/categories/ - Criar

---

## Teste com curl

```bash
# Listar receitas
curl http://localhost:8000/api/income/?month_id=660e8400-e29b-41d4-a716-446655440111

# Criar receita
curl -X POST http://localhost:8000/api/income/ \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "month_id": "660e8400-e29b-41d4-a716-446655440111",
    "description": "Salário",
    "amount": 3000.00,
    "income_date": "2024-01-05"
  }'

# Deletar receita
curl -X DELETE http://localhost:8000/api/income/770e8400-e29b-41d4-a716-446655440222
```

---

## Próximo passo

➡️ [[BACKEND/07-validacoes.md]] - Implemente validações

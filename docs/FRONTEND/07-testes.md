# Frontend: Testes

## Checklist

- [ ] Componentes renderizam sem erro
- [ ] Formulários submetem dados
- [ ] Gráficos mostram dados corretos
- [ ] Network tab mostra requisições ao backend
- [ ] Sem erros no console

---

## Como testar

### 1. Verificar Network

1. Abra DevTools (F12)
2. Vá para Network
3. Faça uma ação (criar receita)
4. Veja a requisição
5. Resposta deve ser 200 ou 201

### 2. Verificar Console

- Pressione F12
- Vá para Console
- Procure por erros (red)

### 3. Testar Componentes

```jsx
// No seu componente
useEffect(() => {
  console.log('Dados carregados:', data)
}, [data])
```

---

## Erro comum: CORS

Se receber erro de CORS:
- Verifique se backend tem CORS habilitado
- URL no frontend deve ser exata (localhost vs 127.0.0.1)

---

## Pronto!

Você tem uma aplicação funcional! 🎉

# Database: Setup Supabase

## O que você vai fazer

Neste documento, você aprenderá a:

- Entender o que é Supabase
- Criar uma conta e projeto
- Obter as credenciais necessárias
- Configurar o `.env` no backend
- Testar a conexão com o banco de dados

---

## O que é Supabase?

**Supabase** é uma plataforma de backend open-source que fornece um banco de dados PostgreSQL gerenciado na nuvem, além de serviços prontos para acelerar o projeto. Ele oferece:

- **PostgreSQL** - banco de dados relacional confiável
- **API REST** - acesso aos dados via HTTP
- **Autenticação** - gerenciamento de usuários
- **Real-time** - atualizações em tempo real
- **Storage** - armazenamento de arquivos

Para o projeto **ControleGastos**, usamos Supabase porque:

- É **fácil de configurar**
- Oferece **tier gratuito** generoso
- Suporta **PostgreSQL** (melhor para relacionamentos)
- Integra bem com **FastAPI** (nosso backend)
- Já entrega peças que o projeto pode usar sem criar tudo do zero, como autenticação, storage e recursos de tempo real

---

## Passo 1: Criar conta no Supabase

1. Acesse: [https://supabase.com](https://supabase.com)
2. Clique em **"Start your project"** ou **"Sign in"**
3. Escolha uma das opções:
   - **GitHub** (recomendado - mais rápido)
   - **Google**
   - **Email + Password**
4. Confirme seu email (se necessário)

---

## Passo 2: Criar um novo projeto

1. No painel do Supabase, clique em **"New project"**
2. Preencha os dados:
   - **Project name**: `ControleGastos`
   - **Database password**: Escolha uma senha **forte**
   - **Region**: `South America (São Paulo)` recomendado
3. Clique em **"Create new project"**
4. Aguarde 3-5 minutos

---

## Passo 3: Obter as credenciais

Na sidebar, vá para **Settings** → **Database**

**Copie:**

- **Host**: `db.xxxx.supabase.co`
- **Port**: `5432`
- **User**: `postgres`
- **Password**: Aquela que você definiu

**Ou copie a connection string completa:**

```
postgresql://postgres:SENHA@db.xxxx.supabase.co:5432/postgres
```

---

## Passo 4: Configurar `.env` no Backend

Crie o arquivo `backend/.env`:

```
DATABASE_URL="postgresql://postgres:SENHA@db.xxxx.supabase.co:5432/postgres"
SECRET_KEY=sua_chave_secreta_aleatoria_123456
```

**⚠️ IMPORTANTE:** Adicione `.env` ao `.gitignore`

---

## Passo 5: Testar a conexão

```bash
cd backend
pip install python-dotenv psycopg2-binary sqlalchemy
python -c "import psycopg2; conn = psycopg2.connect('postgresql://...'); print('✓ OK')"
```

---

## Próximo passo

➡️ [[DATABASE/02-schema.md]] - Crie o schema do banco de dados

# 💈 Barber App

Aplicação **Full Stack** desenvolvida para o **gerenciamento de uma barbearia**, permitindo o agendamento de serviços, controle de usuários e visualização de barbeiros disponíveis.  
O sistema foi construído com **React**, **Node.js**, **TypeScript** e **PostgreSQL**, seguindo boas práticas de arquitetura, segurança e organização de código.

---

## 🌐 Deploy

🟢 Acesse a aplicação online: [**Barber App no Render**](https://SEU-LINK-AQUI.onrender.com)

---

## 🖼️ Prévia do Projeto

> Aqui você pode adicionar capturas de tela das principais páginas do sistema (Home, Login, Usuários, Barbeiros etc.).

<div align="center">

| Tela Inicial | Página de Login |
|---------------|----------------|
| ![Home](<img width="1872" height="934" alt="image" src="https://github.com/user-attachments/assets/52ee184e-3473-4cf7-80dd-d31ceb3d4f0d" />
) | ![Login](<img width="1882" height="948" alt="image" src="https://github.com/user-attachments/assets/b363ef04-9a48-4dcf-9155-d5f6437d5a9e" />
) |

| Lista de Barbeiros | Agendamento |
|--------------------|--------------|
| ![Barbers](<img width="1879" height="943" alt="image" src="https://github.com/user-attachments/assets/8a278897-c653-422a-993d-9da3b35ca8ed" />
) | ![Agendamento](<img width="1871" height="943" alt="image" src="https://github.com/user-attachments/assets/063b9983-a8c5-4d6b-acab-685fb00f6f4b" />
) |

</div>

---

## 💻 Tecnologias Utilizadas

### **Frontend**
- ⚛️ **React** com **TypeScript**
- 🌐 **Axios** para requisições HTTP
- 🧭 **React Router DOM** para navegação
- 🎨 **Tailwind CSS / CSS Modules**
- 🔐 **JWT Decode** para gerenciamento de autenticação

### **Backend**
- 🚀 **Node.js** com **Express** e **TypeScript**
- 🧩 **TypeORM** para integração com banco de dados
- 🗄️ **PostgreSQL** como banco de dados principal
- 🔑 **JWT (JSON Web Token)** para autenticação segura
- 🧂 **bcrypt** para criptografia de senhas
- ⚙️ **dotenv** para variáveis de ambiente
- ✉️ **Nodemailer** para envio de notificações por e-mail

---

## 🧩 Estrutura do Sistema

O Barber App possui páginas de **Home**, **Login**, **Usuários** e **Barbeiros**, oferecendo uma experiência completa tanto para clientes quanto para administradores.

- **Usuários** podem criar perfis, editar informações, visualizar horários e agendar serviços.  
- **Barbeiros** têm seus perfis listados com horários disponíveis.  
- **Home** apresenta informações gerais.  
- **Login** garante acesso seguro via autenticação **JWT**.  

O backend, desenvolvido com **Express** e **TypeORM**, se conecta ao **PostgreSQL**, garantindo persistência e integridade dos dados.  
As requisições são feitas via **Axios**, e notificações de agendamento são enviadas por e-mail com **Nodemailer**.

---

## 🧠 Boas Práticas Aplicadas

- Estrutura modular e escalável  
- Tipagem forte em **TypeScript** (frontend e backend)  
- Rotas no padrão **RESTful**  
- Tratamento de erros com `try/catch`  
- Autenticação e segurança aprimoradas com **JWT**  
- Envio de e-mails automatizado com **Nodemailer**  
- Foco em **performance**, **segurança** e **UX**

---

## ⚙️ Como Executar Localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/barber-app.git

# Acesse a pasta do projeto
cd barber-app

# Instale as dependências
npm install

# Configure as variáveis de ambiente (.env)

# Inicie o backend
cd server
npm run dev

# Em outro terminal, inicie o frontend
cd client
npm start

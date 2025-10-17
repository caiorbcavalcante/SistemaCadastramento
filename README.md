# 💈 Barber App

Aplicação web completa desenvolvida para o gerenciamento de uma barbearia, permitindo o agendamento de serviços, gerenciamento de usuários e visualização de barbeiros disponíveis.  
O projeto foi desenvolvido com **TypeScript**, **React**, **Express** e **PostgreSQL**, seguindo boas práticas de arquitetura, segurança e organização de código.

---

## 💻 Tecnologias Utilizadas

### **Frontend**
- **React** com **TypeScript**
- **Axios** para requisições HTTP
- **React Router DOM** para navegação
- **CSS Modules / Tailwind** (ou o que você utilizou)
- **JWT Decode** para gerenciamento de autenticação

### **Backend**
- **Node.js** com **Express** e **TypeScript**
- **TypeORM** para integração com banco de dados
- **PostgreSQL** como banco de dados principal
- **JWT (JSON Web Token)** para autenticação segura
- **bcrypt** para criptografia de senhas
- **dotenv** para gerenciamento de variáveis de ambiente
- **Nodemailer** para envio de notificações por e-mail

### **Banco de Dados**
- **PostgreSQL** como banco de dados principal
- **TypeORM** para integração e mapeamento objeto-relacional
- Garantia de persistência segura dos dados, com suporte a consultas complexas e transações
- 
---

## 🚀 Implementação

O site possui páginas de **Home**, **Login**, **Usuários** e **Barbeiros**, oferecendo uma experiência completa para os clientes da barbearia. Na página de **Usuários**, é possível criar e gerenciar perfis, editando informações como nome, e-mail, senha e telefone, visualizar horários disponíveis para agendamento, escolher barbeiros e serviços oferecidos e realizar agendamentos diretamente pelo sistema. A página de **Barbeiros** permite visualizar a lista de profissionais e seus horários disponíveis, enquanto as páginas de **Home** e **Login** fornecem informações gerais e acesso seguro à plataforma. O backend, desenvolvido em **Express** com **TypeScript**, integra-se ao **PostgreSQL** usando **TypeORM**, garantindo persistência segura dos dados. Todas as requisições são feitas com **Axios**, a autenticação é gerenciada com **JWT** e o envio de notificações por e-mail é realizado com **Nodemailer**, permitindo confirmação de agendamentos e comunicação eficiente com os clientes.

---

## 🧠 Boas Práticas Aplicadas

- Código modular e organizado, facilitando manutenção e escalabilidade  
- Tipagem forte com **TypeScript** em frontend e backend  
- Padrão RESTful nas rotas  
- Tratamento de erros com `try/catch`  
- Uso de bibliotecas confiáveis para autenticação (**JWT**) e envio de e-mails (**Nodemailer**)  
- Foco em segurança, performance e experiência do usuário  
 

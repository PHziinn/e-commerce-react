# 🛍️ E-Commerce React

Um e-commerce moderno e completo desenvolvido com React, Vite e Material-UI, oferecendo uma experiência de compra online intuitiva e eficiente.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool rápida e moderna
- **Material-UI (MUI)** - Componentes React seguindo as diretrizes do Material Design
- **Redux Toolkit** - Gerenciamento de estado global
- **React Query** - Gerenciamento de estado do servidor e cache
- **React Router DOM** - Roteamento de aplicações SPA
- **Emotion** - CSS-in-JS para estilização avançada
- **Swiper** - Slider/carrossel responsivo
- **Chart.js** - Visualização de dados e gráficos

### Autenticação & Segurança
- **JWT Decode** - Decodificação e validação de tokens JWT
- **Zod** - Validação de esquemas e tipos

### Desenvolvimento
- **ESLint** - Linting e qualidade de código
- **Prettier** - Formatação de código
- **Husky** - Git hooks para garantir qualidade
- **Lint-staged** - Linting em arquivos staged

## 📋 Funcionalidades

### Públicas
- 🏠 **Homepage** - Página inicial com produtos em destaque
- 🔍 **Busca de Produtos** - Sistema de busca avançada
- 📱 **Detalhes do Produto** - Visualização completa de produtos
- 🛒 **Carrinho de Compras** - Gerenciamento de itens
- 💳 **Checkout** - Processo de pagamento
- 👤 **Autenticação** - Login e cadastro de usuários
- 📱 **Responsividade** - Totalmente adaptável para dispositivos móveis

### Privadas (Usuários)
- 👤 **Perfil do Usuário** - Gerenciamento de informações pessoais
- 📦 **Resumo de Pedidos** - Histórico e acompanhamento de pedidos
- ✅ **Confirmação de Pagamento** - Página de sucesso no pagamento
- ❌ **Falha no Pagamento** - Tratamento de erros de pagamento

### Administrativas
- 📊 **Dashboard Administrativo** - Visão geral do e-commerce
- 📝 **Gerenciamento de Produtos** - CRUD completo de produtos
- 👥 **Gerenciamento de Usuários** - Administração de clientes
- ⚙️ **Configurações** - Personalização do sistema

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 22 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/PHziinn/e-commerce-react.git
cd e-commerce-react
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
Copie o arquivo `.env.example` para `.env` e configure as variáveis necessárias:
```bash
cp .env.example .env
```

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
Abra seu navegador e acesse: `http://localhost:5173`


## 🔐 Sistema de Autenticação

O projeto utiliza JWT (JSON Web Token) para autenticação com as seguintes características:

- **Validação de Token** - Verificação automática de expiração
- **Refresh Token** - Atualização automática de tokens expirados
- **Proteção de Rotas** - Rotas privadas protegidas por autenticação
- **Gestão de Sessão** - Armazenamento seguro no localStorage
- **Banimento de Usuários** - Sistema de banimento com notificação

## 📱 Responsividade

O e-commerce é totalmente responsivo, adaptando-se perfeitamente a:

- 📱 Smartphones (iOS e Android)
- 📱 Tablets
- 💻 Desktops
- 🖥️ Telas grandes

## 🎨 Design System

O projeto segue um design system consistente com:

- **Material Design Guidelines** - Padrões do Google
- **Cores Personalizadas** - Paleta de cores do e-commerce
- **Tipografia Consistente** - Hierarquia visual clara
- **Componentes Reutilizáveis** - Biblioteca de componentes
- **Animações Suaves** - Transições e micro-interações

## 🚀 Deploy

### Build para Produção
```bash
npm run build
# ou
yarn build
```

### Deploy no Vercel
O projeto está configurado para deploy automático no Vercel. Configure as variáveis de ambiente no painel do Vercel.


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [licença MIT](./LICENCE) para mais detalhes.

## 👥 Autor

**Wesley Santos** - [@PHziinn](https://github.com/PHziinn)
**Paulo Santos**  - [@paulinsan](https://github.com/paulinsan)

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!**

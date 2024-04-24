# Contador de Números Primos

## Introdução

O projeto `Contador de Números Primos` é uma aplicação web full-stack projetada para permitir que os usuários calculem o número de números primos menores que um inteiro `k` dado. Desenvolvido usando Java Springboot para o backend e React com Vite para o frontend, esta aplicação combina tecnologias web modernas para proporcionar uma experiência de usuário responsiva e eficiente.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [Deploy](#deploy)
- [Recursos](#recursos)
- [Dependências](#dependências)
- [Exemplos](#exemplos)

## Tecnologias Utilizadas

### Backend

- **Java Spring Boot**: Escolhido por seu ecossistema robusto e suporte para construir aplicações web escaláveis. O Java Spring Boot facilita a criação de aplicações baseadas em Spring de nível de produção independentes.
  - **Spring Web**: Usado para construir serviços web RESTful. Gerencia requisições HTTP e simplifica a vinculação de dados.
  - **Spring Boot DevTools**: Fornece reinícios rápidos de aplicação, LiveReload e configurações para melhorar a experiência de desenvolvimento.
  - **Spring Boot Test**: Para testes unitários e testes de integração para garantir que a funcionalidade atenda aos requisitos especificados.
- **Maven**: Gerencia a construção do projeto e o gerenciamento de dependências.
- **Docker**: Usado para contêinerizar o backend, garantindo que ele funcione de maneira consistente em diferentes ambientes computacionais.

### Frontend

- **React**: Uma biblioteca JavaScript para construir interfaces de usuário. O React é usado por seu eficiente renderização de componentes e seu vasto ecossistema.
  - **Vite**: Uma ferramenta de construção frontend moderna que melhora significativamente a experiência de desenvolvimento com sua rápida substituição de módulo quente (HMR).
  - **Material-UI (MUI)**: Um framework UI React popular que fornece componentes prontos para uso que são customizáveis e acessíveis.
  - **Axios**: Cliente HTTP baseado em promessas para fazer requisições HTTP do navegador, usado para se comunicar com o backend.

### DevOps

- **Docker**: Simplifica o deployment por contêinerizar a aplicação, facilitando o deploy e a escalabilidade em qualquer ambiente que suporte Docker.

### Outras Bibliotecas e Ferramentas

- **ESLint**: Usado para impor um estilo de código consistente e capturar erros de código JavaScript e React.
- **@emotion/styled e @emotion/react**: Bibliotecas CSS-in-JS usadas para escrever estilos CSS com JavaScript, aprimorando as capacidades de estilização no React.

## Estrutura do Projeto

```bash
Desafio_Bridge/
├── backend/
│ ├── Dockerfile
│ ├── .mvn/
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/com/example/nprimos/
│ │ │ └── resources/
│ │ └── test/
│ │ └── java/com/example/nprimos/
├── frontend/
│ └── nprimos-front/
│ ├── public/
│ └── src/
│ ├── assets/
│ ├── components/
│ ├── config/
│ ├── theme/
│ └── views/
├── .git/
└── README.md
```

## Instalação

### Backend

#### Pré-requisitos

- Java 17 ou superior
- Node.js e npm
- Maven
- Docker (opcional)

#### Usando Docker:

```bash
cd backend
docker build -t nprimos-backend .
docker run -p 8080:8080 nprimos-backend
```

#### Sem o Docker (recomendado):

1. Clone o repositório:

```bash
git clone git@github.com:felipeverones/Desafio_Bridge.git
```

2. Navegue até o diretório do backend:

```bash
cd backend
```

3. Agora execute os seguintes comandos para iniciar a aplicação:

```bash
mvn clean install
mvn spring-boot:run
```

5. Pronto! sua API deve estar rodando em `http://localhost:3000/`

### Frontend

1. Certifique-se de ter Node.js instalado.

2. Navegue até o diretório do frontend:

```bash
cd frontend/nprimos-front
```

3. Instale as dependências com:

```bash
npm install
```

3. Inicie o servidor local de desenvolvimento:

```bash
npm run dev
```

## Uso

Navegue até `http://localhost:5173/` (porta padrão do `Vite`) em seu navegador, insira um inteiro positivo `k` no campo de texto, e clique no botão Calcular para ver o número de primos menores que `k` junto com o tempo de cálculo.

Também é possível ver o histórico de números calculados, com seus respectivos resultados, na página de histórico, acessada a partir da página inicial.

## Deploy

A aplicação já está hospedada e pode ser acessada através dos seguintes links:

### Backend
O backend da aplicação está hospedado na `Railway` e pode ser acessado pelo seguinte URL:
[Backend nprimos](https://nprimos-production.up.railway.app/)

### Frontend
O frontend da aplicação está hospedado na `Vercel` e pode ser acessado pelo seguinte URL:
[Frontend nprimos](https://nprimos-bridge.vercel.app/)

Esses links direcionam para as versões em produção da aplicação, onde todas as funcionalidades podem ser testadas em um ambiente real.


## Recursos

- Design responsivo adequado para vários dispositivos.
- Validação em tempo real da entrada para garantir que apenas inteiros sejam aceitos.
- Exibição dos resultados do cálculo dos primos e do tempo de processamento.

## Dependências

Este projeto utiliza várias bibliotecas e ferramentas de terceiros para lidar com vários aspectos da aplicação, desde a framework do servidor web até o design da interface do usuário. Abaixo estão as principais dependências usadas tanto no backend quanto no frontend.

### Dependências do Backend

- **Spring Boot Starter Web**: Facilita a criação de aplicações web (incluindo serviços RESTful) usando o Spring Boot. Simplifica o processo de criação do servidor, apenas executando um único comando.
- **Spring Boot DevTools**: Fornece recursos adicionais de tempo de desenvolvimento, como reinícios automáticos para uma experiência de desenvolvimento mais suave.
- **Spring Boot Starter Test**: Oferece bibliotecas essenciais para testar aplicações Spring com bibliotecas incluindo JUnit, Hamcrest e Mockito.
- **Spring Boot Starter Validation**: Adiciona suporte para validação usando a API de Validação Bean Java.
- **Maven**: Gerencia dependências do projeto e configurações de construção.

### Dependências do Frontend

- **React**: Biblioteca para construção de interfaces de usuário especificamente voltadas para aplicações de página única.
- **Vite**: Uma ferramenta de construção frontend moderna que utiliza rollup, esbuild e outras técnicas modernas para garantir reconstruções e atualizações rápidas.
- **Material-UI**: Fornece componentes React para um desenvolvimento web mais rápido e fácil.
- **Axios**: Cliente HTTP baseado em promessas para realizar requisições HTTP do navegador para conectar ao backend.
- **@emotion/react e @emotion/styled**: Permitem estilizar aplicativos usando CSS em JS com ênfase em desempenho otimizado e estilização dinâmica.
- **react-toastify**: Criação fácil de notificações para aplicações React.
**normalize.css**: Faz com que os navegadores renderizem todos os elementos de forma mais consistente e de acordo com os padrões modernos.

### Ferramentas de Desenvolvimento

- **ESLint**: Uma ferramenta de lint plugável e configurável para identificar e relatar padrões em JavaScript e React, ajudando a manter a qualidade do código.
- **Docker**:  Fornece uma maneira de empacotar aplicativos e suas dependências em um contêiner virtual que pode ser executado em qualquer servidor Linux. Isso ajuda a proporcionar consistência entre ambientes de desenvolvimento, teste, produção e staging.

Certifique-se de instalar as versões corretas dessas dependências conforme especificado em seus arquivos `package.json` e `pom.xml` para evitar problemas de compatibilidade.

### Docker

Se você estiver usando Docker, garanta que o Docker esteja instalado e funcionando em sua máquina. O Dockerfile no diretório backend está pré-configurado para configurar seu ambiente e contêinerizar a aplicação Spring Boot.



### Node.js

Certifique-se de ter o Node.js instalado para lidar com os comandos npm para o frontend. Isso é fundamental para executar servidores de desenvolvimento e construir o aplicativo front-end.


## Exemplos

Exemplo de uso:
1. O usuário insere `10` na caixa de texto.
2. A aplicação calcula e exibe `4`, já que existem quatro números primos menores que 10. 
3. Juntamente com o resultado, é exibido o tempo, em milissegundos, que a API levou para calcular a quantidade de primos até o número inserido.
4. Também é possível ver o histórico de números digitados e seus respectivos resultados, poupando tempo. Posteriormente, o usuário pode escolher limpar o histórico e começar novamente um novo.



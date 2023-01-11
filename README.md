# FaceBurguer

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![NodeJs](https://img.shields.io/badge/NodeJs-v16.17-4a8735.svg?style=for-the-badge)
![AngularCli](https://img.shields.io/badge/AngularCli-v15.0.3-aa0025.svg?style=for-the-badge)

<!-- ![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/iuricode/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge) -->

https://user-images.githubusercontent.com/103137627/210684089-8069673e-19d9-4c11-ae8e-704ecb417f0d.mp4

> Curto vídeo mostrando as principais funcionalidades do site desenvolvidas até o momento.

## ⚙ Tecnologias e funcionalidades

Estes são os principais frameworks e bibliotecas utilizados no projeto:

-   [![Angular][angular.io]][angular-url]
-   [![TypeScript][typescript]][typescript-url]
-   [![TailwindCSS][tailwindcss]][tailwind-url]
-   [![Mongo][mongo]][mongo-url]
-   [![NodeJs][nodejs]][nodejs-url]
-   [![Express][express]][express-url]

### Ajustes e melhorias

<details>
  <summary>
O projeto ainda está em desenvolvimento. Aqui está uma lista das features já existentes e as que ainda serão implementadas.
  </summary>
  <br>

-   [x] CRUD completo com MongoDB (manipulação de dados do usuário)
-   [x] Chamadas de API
-   [x] Login com autenticação JsonWebToken
-   [x] Pagamento do pedido através da API do Paypal
-   [x] Sistema de geo-localização pela lib 'leaflet'

**Na fila de desenvolvimento:**

-   [ ] Landing page
-   [ ] Criação página de Pedidos do usuário
-   [ ] Incluir review ao finalizar pedido
-   [ ] Atribuir funcionalidade aos favoritos
-   [ ] Consulta de endereço por CEP
-   [ ] Visualização da página inicial em formato de lista detalhada
-   [ ] Validar email ao criar conta
-   [ ] Gerar nota fiscal eletrônica

</details>

<br>

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

<!---Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário--->

-   [Instalou a versão mais recente](https://angular.io/cli) do `Angular`
-   [Instalou a versão mais recente](https://nodejs.org/en/) do `NodeJs`

_O projeto usa o [MongoDB Atlas](https://www.mongodb.com/atlas/database), uma versão em nuvem do MongoDB que não necessita de instalação._

<br>

## 🚀 Instalando e iniciando o FaceBurguer

_Windows_

Primeiramente, abra um terminal e faça um clone do app FaceBurguer:

```
git clone https://github.com/luizcomparin/app_restaurante_curso.git
```

Abra 2 terminais dentro da pasta clonada (/app-restaurante-curso), um para o frontend e outro para o backend.

#### No terminal do frontend, rode os comandos:

1. Entre na pasta frontend

```
cd frontend
```

2. Instale os pacotes NPM

```
npm install --force
```

3. Inicie o servidor

```
ng serve
```

#### E no terminal do backend:

```
cd backend

npm install

npm start
```

Se tudo ocorrer bem, seu app estará instalado e já rodando em `localhost:4200/`.
Obs: o backend está em `localhost:5000/`.

<br>

## 💲 Pagando pelo Paypal

Para efetuar o pagamento fictício do pedido, disponibilizo aqui uma conta sandbox do paypal.
Esta conta poderá ser usada para efetuar o pagamento.

```
Usuário:
sb-epr6q23993823@personal.example.com
```

```
Senha:
pO4)Euhi
```

<br>

## 🌎 Contato

### **👋 Prazer, meu nome é Luiz Carlos Comparin.**

Estudo desenvolvimento fullstack há mais ou menos um ano. Atualmente me encontro indo a fundo no framework Angular, mas como todo programador iniciante, já trilhei algumas linguagens e frameworks, como Python, React, JavaScript, MySQL e Delphi, das quais tenho um conhecimento fundamental.

Se gostou do que viu, entre em contato comigo para que possamos trabalhar juntos:

-   [![linkedin][linkedin]][linkedin-url]
-   [![gmail][gmail]][gmail-url]

[⬆ Voltar ao topo](#faceburguer)<br>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[mongo]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[mongo-url]: https://www.mongodb.com/
[nodejs]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org/en/
[express]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://expressjs.com/pt-br/
[linkedin]: https://img.shields.io/badge/-LuizCarlosComparin-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/luiz-carlos-comparin-887150150/
[linkedin-url]: https://www.linkedin.com/in/luiz-carlos-comparin-887150150/
[gmail]: https://img.shields.io/badge/-luizcomparin18@gmail.com-006bed?style=flat-square&logo=Gmail&logoColor=white&link=mailto:luizcomparin18@gmail.com
[gmail-url]: mailto:luizcomparin18@gmail.com

<!-- [wpp]: https://img.shields.io/badge/-(47)992831801-25D366?style=flat-square&logo=Whatsapp&logoColor=white
[wpp-url]: https://api.whatsapp.com/send?phone=47992831801 -->

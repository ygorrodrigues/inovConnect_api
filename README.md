# API InovConnect

Esta é uma API REST para responder e se comunicar com nosso trabalho de conclusão de curso, o [Inov Connect](https://github.com/ygorrodrigues/inovConnect).

## Estrutura
Estrutura MVC de um projeto de API em NodeJS, onde dentro da pasta principal, a /src, temos os controllers onde ficam os responsáveis por responder as requisições, os models que são os modelos do nosso banco de dados e os services, que são os responsáveis pela lógica do que será feito dependendo da requisição.

Temos também a pasta config, onde ficam definidas as configurações do express e do banco de dados, a pasta dev para criação de modelos para teste, a pasta socket para o socket.io do chat e a pasta views para as telas de fora do aplicativo.

## Dependências
Todas as depêndencias do projeto podem ser encontradas no package.json

## Variáveis de ambiente
Algumas variáveis de ambiente são necessárias para a aplicação funcionar corretamente, elas são definidas em um arquivo .env que deve ser inserido na raiz do projeto. Essas variáveis são:
1. ACCESS_TOKEN_SECRET = um valor hash ou uma senha responsável pelos tokens.
2. EMAIL_SECRET = um valor hash ou uma senha responsável pelo envio de emails.
3. PASSWORD_RESET_SECRET = um valor hash ou uma senha responsável pelo reset de senha.
4. GMAIL_USER = usuário de um email do gmail pois utilizamos o SMTP do gmail.
5. GMAIL_PASSWORD = a senha deste usuário.
6. POSTGRES_PASSWORD = a senha do postgres local se existir.
7. HEROKU_PASSWORD = se continuar utilizando o heroku deve ser inserida a senha dele.
8. FORCE = um valor boolean para definir se o banco de dados deve ser reiniciado (true) ou não (false).

## Como utilizar
1. Instalar npm (node package manager)
2. Na pasta da API no seu prompt digitar npm install para instalar todos os pacotes
3. Editar o src/config/config.json com os dados do seu banco postgres local na entrada "development"
4. Rodar a API com npm run dev para rodar utilizando o nodemon, se não for necessário basta utilizar um npm start
5. Caso não queira que os logs apareçam em seu servidor, adicione "logging: false" no config\config.json
6. Para manter os dados no banco a cada alteração, altere o "force" em server.js para false // isso agora é no env

Para a aplicação flutter funcionar corretamente em testes é necessário copiar o seu endereço local IPv4 ou o endereço do seu servidor e colar no caminho (lib/http/webclient.dart) na variável url.
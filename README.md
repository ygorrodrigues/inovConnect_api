# API InovConnect

1. Instalar npm (node package manager)
2. Na pasta da API no seu prompt digitar npm install para instalar todos os pacotes
3. Editar o src/config/config.json com os dados do seu banco postgres local
4. Rodar a API com npm run dev
5. Caso não queira que os logs apareçam em seu servidor, adicione "logging: false" no config\config.json
6. Para manter os dados no banco a cada alteração, altere o "force" em server.js para false

Para a aplicação flutter funcionar corretamente em testes é necessário copiar o seu endereço IPv4 e colar no caminho (lib/http/webclient.dart)
na variável url.

Existem algumas configurações a serem feitas em um arquivo .env, veja o nosso discord para entender como proceder.
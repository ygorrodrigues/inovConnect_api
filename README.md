# API InovConnect

1. Instalar npm (node package manager)
2. Na pasta da API no seu prompt digitar npm install para instalar todos os pacotes
3. Editar o src/config/config.json com os dados do seu banco postgres local
4. Rodar a API com npm run dev

Para a aplicação flutter funcionar corretamente em testes é necessário copiar o seu endereço IPv4 e colar no caminho (lib/http/webclient.dart)
na variável url.

Adicionar o logging do config.json como false caso não queira os logs aparecendo no seu servidor.
Alterar o force do server.js caso queira que os dados sejam mantidos no banco a cada atualização.
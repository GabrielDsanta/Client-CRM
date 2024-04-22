# Instruções para o Projeto

## Passo 1: Clonar o Projeto

Clone este repositório em sua máquina local usando o seguinte comando:

git clone https://github.com/GabrielDsanta/Client-CRM.git

## Passo 2: Instalar as Dependências

Após clonar o projeto, navegue até a pasta do projeto e instale as dependências utilizando o Yarn. Certifique-se de que você tenha o Yarn instalado globalmente em sua máquina

cd nome-do-projeto
yarn install

## Passo 3: Criar o arquivo .env.local

Na raiz do projeto, crie um arquivo chamado .env.local e adicione as seguintes chaves de ambiente conforme indicado abaixo:

NEXT_PUBLIC_API_KEY=sk_live_be5a776a-b0df-4256-878f-41727e2fc4a0-ssQBcGmN0F9JaDEgoTL-02a0ff4b-0aab-4561-9c71-5d150c945a17
NEXT_PUBLIC_APP_ID=KYL3WWsNu0PidZCgoSYm3Fzhl97EqGJ4h1goTK
NEXT_PUBLIC_API_URL=https://unify.apideck.com
NEXT_PUBLIC_CONSUMER_ID=test-consumer
UNIFY_API_KEY=sk_live_be5a776a-b0df-4256-878f-41727e2fc4a0-ssQBcGmN0F9JaDEgoTL-02a0ff4b-0aab-4561-9c71-5d150c945a17
NEXT_PUBLIC_UNIFY_API_URL=https://unify.apideck.com

## Passo 3: Iniciar o Projeto

Após configurar as chaves de ambiente, você pode iniciar o projeto executando o seguinte comando:

yarn dev

Isso iniciará o projeto em modo de desenvolvimento. Você pode acessá-lo em seu navegador utilizando o endereço http://localhost:3000.

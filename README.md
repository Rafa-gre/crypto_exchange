# Crypto Exchange

## Descrição

Este projeto é parte de um desafio técnico para a construção de uma RESTful API para o Balcão de Ofertas de um aplicativo voltado para uma blockchain. A API fornece os serviços necessários para listar, criar e excluir ofertas no Balcão de Ofertas.

## Recursos

- Listagem das ofertas do dia atual
- Criação de novas ofertas
- Exclusão de ofertas existentes

## Pré-requisitos

Antes de executar a API, verifique se os seguintes pré-requisitos estão atendidos:

- Node.js e NPM instalados
- Banco de dados configurado (SQLite)
- Variáveis de ambiente configuradas (consulte o arquivo .env.example)

## Configuração

Siga as etapas abaixo para configurar e executar a API localmente:

1. Clone o repositório para o seu ambiente local ou extraia o arquivo zip.
2. Execute o comando `npm install` para instalar as dependências do projeto.
3. Crie um arquivo `.env` e configure as variáveis de ambiente necessárias, como a conexão com o banco de dados utilize o arquivo .env.example como exemplo.
4. Execute as migrações do banco de dados para criar a estrutura necessária usando o comando `npm run migrate`.
5. Execute os scripts de seed para popular o banco de dados com dados iniciais usando o comando `npm run seed`.
6. Inicie a aplicação com o comando `npm run start:dev`.

## Uso

A API fornece os seguintes endpoints para interagir com o Balcão de Ofertas:

- **GET /offers**: Retorna a listagem de todas as ofertas do dia atual. Suporta paginação ou scroll para visualizar as ofertas em ordem decrescente de criação.
- **POST /offers**: Cria uma nova oferta no Balcão de Ofertas. A criação da oferta está vinculada a uma carteira específica do usuário e requer saldo prévio da moeda.
- **DELETE /offers/:id**: Deleta uma oferta existente no Balcão de Ofertas. Somente o criador da oferta pode executar essa ação.

A documentação das rotas pode ser encontrada em localhost:3000/api-docs

## Testes

Execute o comando `npm run test` para executar os testes automatizados da API. Os testes irão validar as funcionalidades principais da API, garantindo que as operações do Balcão de Ofertas estejam funcionando corretamente.

## Melhorias e Visão de Longo Prazo

Aqui estão algumas sugestões de melhorias e considerações para o projeto:

Melhoria na validação de entrada dos dados: É recomendado aprimorar a validação dos dados fornecidos pelos usuários para garantir a consistência e segurança das informações. Isso pode ser feito utilizando bibliotecas de validação, como o Joi ou o class-validator, para validar e sanitizar os dados de entrada, evitando problemas como injeção de código malicioso (SQL injection, XSS, etc.) e inconsistências nos dados armazenados.

Implementação de cache: Utilizar um sistema de cache pode melhorar significativamente o desempenho da API, reduzindo a carga no banco de dados. Podemos utilizar uma solução de cache como o Redis para armazenar em memória os resultados das consultas mais frequentes, evitando consultas repetitivas ao banco de dados. O cache pode ser configurado com políticas de expiração adequadas para garantir que as informações estejam sempre atualizadas.

Implementação de logs: É essencial ter um sistema de logs para monitorar e solucionar problemas de forma eficiente. Podemos utilizar bibliotecas como o Winston ou o Bunyan para registrar eventos e erros relevantes da aplicação. Os logs podem ser armazenados em arquivos ou enviados para serviços de monitoramento, como o ELK Stack ou o Papertrail, para análise e acompanhamento em tempo real. Existem aplicações na nuvem voltadas pra isso também como o CloudWatch da AWS. Isso ajuda a identificar e solucionar problemas rapidamente, além de fornecer informações valiosas para a melhoria contínua do sistema.

Escalabilidade da aplicação: Ao considerar o aumento do número de usuários e transações no Balcão de Ofertas, é importante projetar a aplicação levando em conta a escalabilidade. Isso envolve utilizar técnicas como o balanceamento de carga, em que múltiplas instâncias da aplicação são distribuídas em servidores para lidar com o aumento de tráfego. 

Trabalhar com dados em tempo real: Para permitir uma rápida atualização das ofertas e dos valores dos ativos, pode-se considerar a utilização de tecnologias de dados em tempo real, como WebSockets , GraphQL Subscriptions, Google firestore e mongodb também possuem produtos voltados para esse fim. Isso possibilita que as informações sejam atualizadas em tempo real nos clientes, eliminando a necessidade de atualizações constantes por meio de requisições HTTP tradicionais. Além disso a sincronização desse banco real time com o banco relacional pode ser feita utilizando uma arquitetura voltada a eventos possibilitando atualizações e conexões com outros serviços de forma assíncrona .

Implantação em ambiente de nuvem: É altamente recomendado implantar a aplicação em um ambiente de nuvem para garantir alta disponibilidade e escalabilidade. Serviços de nuvem, como o Amazon Web Services (AWS) , Microsoft Azure ou Google Cloud Platform, fornecem recursos escaláveis e gerenciados que facilitam a implantação e o gerenciamento da aplicação. É possível utilizar recursos como balanceadores de carga, autoescalonamento e serviços de contêineres para garantir que a aplicação esteja sempre disponível, independentemente do volume de tráfego.

## Licença

Este projeto está licenciado sob a Licença MIT.

## Contato

Para qualquer dúvida ou informação adicional, sinta-se à vontade para entrar em contato com a equipe de desenvolvimento através do email [email protected]

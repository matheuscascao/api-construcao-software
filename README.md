# Documentação API

## API REST de Serviço Bancário 
- Versão 1.0
- Engenharia de Software - UFG
- Construção de Software 2024/01

## Entrega da versão revisada do projeto
*Instituto de Informática UFG*

*Professor:* Elias batista Ferreira

*Alunos:*
- Frederico Garcez
- Matheus Cascão
- Mikael Junior
- Vitor Paulo
- Hugo Moreno

## Introdução
O sistema foi projetado para simplificar o gerenciamento de contas bancárias, investimentos e resgates, oferecendo uma solução integrada e eficaz. Os usuários têm autonomia para gerenciar suas contas e investimentos de forma integrada, incluindo a aplicação e resgate de investimentos.

A gestão das contas é simplificada pela diferenciação entre contas correntes e de investimento, permitindo operações básicas e acesso a uma variedade de produtos financeiros, respectivamente. Cada qual possuindo um saldo próprio, o que auxilia no controle dos saldos e facilita a visualização.

Além disso, o sistema registra de forma precisa todas as transações financeiras, fornecendo um histórico completo das atividades dos clientes. Transações como depósitos, saques, compras, vendas de investimentos e resgates são monitoradas em tempo real, promovendo transparência e controle financeiro. Eventos específicos relacionados a transações são automaticamente registrados, facilitando a monitoração, auditoria e conformidade regulatória, garantindo assim a integridade e segurança das operações financeiras.


## Estratégia de controle de versão
*Ferramenta Utilizada:* Git
*Repositório:* GitHub

*Práticas:*
- *Branches:* 
  - *main:* Única branch utilizada.
 - *Commits:* Fazer commits frequentes com mensagens claras e descritivas sobre as mudanças realizadas.
 - *TBD:* A estratégia utilizada foi uma versão simplista do trunk-based development. Por não ter a necessidade de versionamento ou integração entre diferentes times, optamos por não adotar o git flow.

*Configuração de ambiente:* 
 - Cada desenvolvedor usa seu próprio ambiente local com seu computador pessoal.
 - O código fonte é compartilhado entre os membros da equipe usando um repositório Git hospedado no GitHub.
 - Utilizamos um arquivo .env para armazenar configurações específicas do ambiente local, como chaves de API e configurações de banco de dados.

## Como executar o projeto
* Primeiro, baixe o NodeJS na versão 22
* Execute yarn install para instalar as dependências
* Execute npm run dev para executar o projeto em modo de desenvolvimento
# Setup banco de dados
* Adicione uma conexão do banco de dados no .env, com a variável DATABASE_URL
* Execute as migrations com o comando npx prisma migrate 

## Endpoints
http://localhost:3100
### Clientes ###  

* Get - FindAll - /clientes


	Retorno:

  		[	
			{
			"id": ,
			"cpf": "",
			"renda_estimada":
			"nome": ,
			"data_nascimento":
			},
		]
* Get - Index - /clientes/:id

	Retorno:

		{
			"id": 5,
			"cpf": "123.456.789-05",
			"renda_estimada": 12000,
			"nome": "mario",
			"data_nascimento": "2003-09-13T00:00:00.000Z"
		}
* Post - Create - /clientes

	Envio:

		{
		  "nome": "Elias batista",
		  "cpf": "123.456.789-08",
		  "data_nascimento": "2000-09-13T00:00:00.000Z",
		  "renda_estimada": 12000.00
		}


	Retorno:

		{
			"id": 7,
			"cpf": "123.456.789-08",
			"renda_estimada": 12000,
			"nome": "Elias batista",
			"data_nascimento": "2000-09-13T00:00:00.000Z"
		}

  ### Conta-Corrente ###  

* Get - index-transacoes - /contas-correntes/:id/transacoes

	Retorno:

  		[
			{
			"id": 26,
			"valor": -10,
			"evento_transacao": "SAQUE_CORRENTE",
			"conta_corrente_id": 9,
			"atualizado_em": "2024-07-26T21:25:24.640Z",
			"criado_em": "2024-07-26T21:25:24.640Z",
			"tipo_transacao": "SAIDA"
			},
  		]
* Get - Index - /contas-correntes/:id

	Retorno:

		{
			"id": 12,
			"status_conta": "ATIVA",
			"limite": 5000,
			"atualizado_em": "2024-07-26T21:07:52.599Z",
			"criado_em": "2024-07-26T21:07:52.599Z",
			"cliente_id": 5,
			"saldo": 630011
		}
* Get - FindAll - /contas-correntes/

	Retorno:

		[
			{
			"id": 9,
			"status_conta": "ATIVA",
			"limite": 30000,
			"atualizado_em": "2024-07-17T01:18:18.483Z",
			"criado_em": "2024-07-17T01:18:18.483Z",
			"cliente_id": 1
			},
  		]
  
* Post - create-transacao - /contas-correntes/transferir

  	Envio:
  
  		{
			"contaOrigemId": 9,
			"contaDestinoId": 11,
			"valor": 10
		}
  
	Retorno:

		{
			"message": "Transfer completed successfully"
		}
  
* Post - create-conta-corrente - /contas-correntes/

  	Envio:
  
  		{
		  "cliente_id": 5,
		  "limite": 5000
		}
  
	Retorno:

		{
			"id": 12,
			"status_conta": "ATIVA",
			"limite": 5000,
			"atualizado_em": "2024-07-26T21:07:52.599Z",
			"criado_em": "2024-07-26T21:07:52.599Z",
			"cliente_id": 5
		}
  
  ### Conta-Investimento ###  

* Get - Index - /contas-investimentos/:id

	Retorno:

		{
			"id": 2,
			"status_conta": "ATIVA",
			"tipo_investidor": "QUALIFICADO",
			"atualizado_em": "2024-07-25T23:55:38.261Z",
			"criado_em": "2024-07-25T23:55:38.261Z",
			"cliente_id": 1,
			"conta_corrente_id": 9,
			"retornoTotalAtual": {
				"computadoTransacoesPendentes": 0,
				"computadoTransacoesResgatadas": 4000
			}
		}
* Get - FindAll - /contas-investimentos/

	Retorno:

		[
			{
				"id": 2,
				"status_conta": "ATIVA",
				"tipo_investidor": "QUALIFICADO",
				"atualizado_em": "2024-07-25T23:55:38.261Z",
				"criado_em": "2024-07-25T23:55:38.261Z",
				"cliente_id": 1,
				"conta_corrente_id": 9
			},
		]
  
* Post - create-investimento - /contas-investimentos/aplica-investimento

  	Envio:
  
  		{
			"conta_investimento_id": 2 ,
			"produto_financeiro_id": 2,
			"quantidade": 1
		}
  
	Retorno:

		Investimento aplicado com sucesso
  
* Post - create-conta-corrente - /contas-investimentos/

  	Envio:
  
  		{
			"cliente_id": 3,
			"tipo_investidor": "NORMAL",
			"conta_corrente_id": 12
		}
  
	Retorno:

		{
			"id": 4,
			"status_conta": "ATIVA",
			"tipo_investidor": "NORMAL",
			"atualizado_em": "2024-07-26T21:46:46.275Z",
			"criado_em": "2024-07-26T21:46:46.275Z",
			"cliente_id": 3,
			"conta_corrente_id": 12
		}
   	
  ### Produto-Financeiro ###  

* Get - Index - /produtos-financeiros/:id

	Retorno:

		{
			"id": 2,
			"preco_unitario": 12.5,
			"data_resgate": "2024-07-26T21:59:44.076Z",
			"emissor": "meu banco",
			"quantidade_cotas": 1000,
			"atualizado_em": "2024-07-26T22:04:45.699Z",
			"criado_em": "2024-07-26T22:04:45.699Z",
			"rentabilidade_anual": 12
		}
  
* Get - FindAll - /produtos-financeiros

	Retorno:

		[
			{
				"id": 1,
				"preco_unitario": 1000,
				"data_resgate": "2023-07-26T14:30:00.000Z",
				"emissor": "BACEN",
				"quantidade_cotas": 1,
				"atualizado_em": "2024-07-24T02:31:02.027Z",
				"criado_em": "2024-07-24T02:31:02.027Z",
				"rentabilidade_anual": 13
			},
		]
  
* Post - create-produto-financeiro - /produtos-financeiros

  	Envio:
  
  		{
		    "preco_unitario": 12.5,
		    "data_resgate": "2024-07-26T21:59:44.076Z",
		    "emissor": "meu banco",
		    "quantidade_cotas": 1000,
		    "rentabilidade_anual": 12
		}
  
	Retorno:

		{
			"id": 2,
			"preco_unitario": 12.5,
			"data_resgate": "2024-07-26T21:59:44.076Z",
			"emissor": "meu banco",
			"quantidade_cotas": 1000,
			"atualizado_em": "2024-07-26T22:04:45.699Z",
			"criado_em": "2024-07-26T22:04:45.699Z",
			"rentabilidade_anual": 12
		}

   ### Transações ###  

* Post - Create - /produtos-financeiros/:id

  	Envio: 

		{
			"conta_corrente_id": 9,
			"valor": -1500,
			"evento_transacao": "DEPOSITO_CORRENTE"
		}

	Retorno:

		{
			"id": 8,
			"valor": -1500,
			"tipo_transacao": "SAIDA",
			"evento_transacao": "DEPOSITO_CORRENTE",
			"conta_corrente_id": 9,
			"criado_em": "2024-07-18T02:51:10.893Z",
			"atualizado_em": "2024-07-18T02:51:10.893Z"
		}

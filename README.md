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
 - Usaremos um arquivo .env para armazenar configurações específicas do ambiente local, como chaves de API e configurações de banco de dados.

## Endpoints
http://localhost:3100
### Clientes ###  

*Get - FindAll - /clientes
Retorno: [
	{
		"id": ,
		"cpf": "",
		"renda_estimada": 
		"nome": ,
		"data_nascimento": 
	},
]

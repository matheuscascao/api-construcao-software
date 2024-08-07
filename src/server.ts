import fastify, { FastifyInstance } from 'fastify';
import { clienteRoutes } from './routes/cliente.routes';
import { contaCorrenteRoutes } from './routes/conta-corrente.routes';
import { contaInvestimentoRoutes } from './routes/conta-investimento.routes';
import { transacoesRoutes } from './routes/transacao.routes';
import { ProdutoFinanceiroRoutes } from './routes/produto-financeiro.routes';
import { startResgateInvestimentoCronJob } from './routines/resgatar-investimentos';

const app: FastifyInstance = fastify({ logger: true });

app.register(clienteRoutes, {
  prefix: '/clientes',
});
app.register(contaCorrenteRoutes, {
  prefix: '/contas-correntes',
});
app.register(contaInvestimentoRoutes, {
  prefix: '/contas-investimentos',
});
app.register(transacoesRoutes, {
  prefix: '/transacoes',
});
app.register(ProdutoFinanceiroRoutes, {
  prefix: '/produtos-financeiros',
});

app.listen(
  {
    port: 3100,
  },
  () => console.log('Server is running on port 3100')
);

startResgateInvestimentoCronJob();

import ContaInvestimentoService from '../services/conta-investimento.service';
import { InvestidorTipo } from '@prisma/client';

import { FastifyInstance } from 'fastify';

export async function contaInvestimentoRoutes(fastify: FastifyInstance) {
  const contaInvestimentoService = new ContaInvestimentoService();

  fastify.post<{
    Body: {
      cliente_id: number;
      tipo_investidor: InvestidorTipo;
      conta_corrente_id: number;
    };
  }>('/', async (req, reply) => {
    const { cliente_id, tipo_investidor, conta_corrente_id } = req.body;
    try {
      const data = await contaInvestimentoService.create({
        cliente_id,
        tipo_investidor,
        conta_corrente_id,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post<{
    Body: {
      conta_investimento_id: number;
      produto_financeiro_id: number;
      quantidade: number;
    };
  }>('/aplica-investimento', async (req, reply) => {
    const { conta_investimento_id, produto_financeiro_id, quantidade } =
      req.body;
    try {
      const transacao = await contaInvestimentoService.aplicaInvestimento({
        conta_investimento_id,
        produto_financeiro_id,
        quantidade,
      });
      return reply.send(transacao);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get<{
    Params: {
      contaInvestimentoId: string;
    };
  }>('/:contaInvestimentoId', async (req, reply) => {
    const { contaInvestimentoId } = req.params;
    try {
      const retornoTotalAtual =
        await contaInvestimentoService.calculateretornoTotalAtual(
          Number(contaInvestimentoId)
        );
      const contaInvestimento =
        await contaInvestimentoService.getContaInvestimento(
          +contaInvestimentoId
        );
      return reply.send({ ...contaInvestimento, retornoTotalAtual });
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  fastify.get('/', async (req, reply) => {
    try {
      const data = await contaInvestimentoService.findAll();
      return reply.send(data);
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  fastify.patch<{
    Body: {
      tipo_investidor?: InvestidorTipo;
      cliente_id?: number;
      conta_corrente_id?: number;
    };
    Params: {
      id: string;
    };
  }>('/:id', async (req, reply) => {
    const { id } = req.params;
    const { tipo_investidor } = req.body;
    try {
      const data = await contaInvestimentoService.update(Number(id), {
        tipo_investidor,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}

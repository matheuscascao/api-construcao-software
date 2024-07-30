import ContaCorrenteRepository from '../repositories/conta-corrente.repository';
import TransacaoRepository from '../repositories/transacao.repository';
import { ContaCorrente, Transacao } from '@prisma/client';
import TransacaoService from '../services/transacao.service';

class ContaCorrenteService {
  private contaCorrenteRepository: ContaCorrenteRepository;
  private transacaoRepository: TransacaoRepository;
  private transacaoService: TransacaoService;
  constructor() {
    this.contaCorrenteRepository = new ContaCorrenteRepository();
    this.transacaoRepository = new TransacaoRepository();
    this.transacaoService = new TransacaoService();
  }

  public async create({
    cliente_id,
    limite,
  }: Pick<ContaCorrente, 'cliente_id' | 'limite'>): Promise<ContaCorrente> {
    const result = await this.contaCorrenteRepository.create({
      cliente_id,
      limite,
    });
    return result;
  }

  public async findById(
    id: number
  ): Promise<ContaCorrente & { saldo: number }> {
    const result = await this.contaCorrenteRepository.findById(id);
    if (!result) {
      throw new Error('O cliente não existe');
    }
    const saldo = await this.transacaoRepository.calculaSaldo(id);
    return { ...result, saldo };
  }

  public async getTransacoes(conta_corrente_id: number): Promise<Transacao[]> {
    const result = await this.transacaoRepository.getTransacoes(
      conta_corrente_id
    );
    return result;
  }

  public async findAll(): Promise<
    (ContaCorrente & { saldo: number })[] | null
  > {
    const contas = await this.contaCorrenteRepository.findMany();
    if (!contas) {
      return null;
    }

    const contasComSaldo = await Promise.all(
      contas.map(async (conta) => {
        const saldo = await this.transacaoRepository.calculaSaldo(conta.id);
        return { ...conta, saldo };
      })
    );

    return contasComSaldo;
  }

  public async transferirFundos({
    contaOrigemId,
    contaDestinoId,
    valor,
  }: {
    contaOrigemId: number;
    contaDestinoId: number;
    valor: number;
  }): Promise<void> {
    await this.transacaoService.create({
      conta_corrente_id: contaOrigemId,
      valor: -valor,
      evento_transacao: 'SAQUE_CORRENTE',
    });

    await this.transacaoService.create({
      conta_corrente_id: contaDestinoId,
      valor: valor,
      evento_transacao: 'DEPOSITO_CORRENTE',
    });
  }

  public async update(
    id: number,
    data: Partial<Pick<ContaCorrente, 'limite' | 'status_conta'>>
  ): Promise<ContaCorrente | null> {
    const result = await this.contaCorrenteRepository.update(id, data);
    return result;
  }
}

export default ContaCorrenteService;

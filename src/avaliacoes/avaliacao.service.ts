import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from './avaliacao.entity';

@Injectable()
export class AvaliacoesService {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacoesRepository: Repository<Avaliacao>,
  ) {}

  async criar(usuarioId: number, filmeId: number, nota: number): Promise<Avaliacao> {
    // Verifica se o usuário já avaliou este filme
    const avaliacaoExistente = await this.avaliacoesRepository.findOne({
      where: { usuarioId, filmeId },
    });

    if (avaliacaoExistente) {
      // Atualiza a avaliação existente
      avaliacaoExistente.nota = nota;
      return this.avaliacoesRepository.save(avaliacaoExistente);
    }

    const avaliacao = this.avaliacoesRepository.create({
      usuarioId,
      filmeId,
      nota,
    });

    return this.avaliacoesRepository.save(avaliacao);
  }

  async listarPorFilme(filmeId: number): Promise<Avaliacao[]> {
    return this.avaliacoesRepository.find({
      where: { filmeId },
      relations: ['usuario'],
    });
  }

  async calcularMedia(filmeId: number): Promise<number> {
    const avaliacoes = await this.listarPorFilme(filmeId);
    
    if (avaliacoes.length === 0) {
      return 0;
    }

    const soma = avaliacoes.reduce((acc, av) => acc + Number(av.nota), 0);
    return Number((soma / avaliacoes.length).toFixed(1));
  }

  async deletar(id: number): Promise<void> {
    await this.avaliacoesRepository.delete(id);
  }
}
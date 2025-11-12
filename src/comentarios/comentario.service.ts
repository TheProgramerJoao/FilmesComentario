import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from './comentario.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private comentariosRepository: Repository<Comentario>,
  ) {}

  async criar(usuarioId: number, filmeId: number, texto: string): Promise<Comentario> {
    const comentario = this.comentariosRepository.create({
      usuarioId,
      filmeId,
      texto,
    });

    return this.comentariosRepository.save(comentario);
  }

  async listarPorFilme(filmeId: number): Promise<Comentario[]> {
    return this.comentariosRepository.find({
      where: { filmeId },
      relations: ['usuario'],
      order: { dataCriacao: 'DESC' },
    });
  }

  async atualizar(id: number, texto: string){
    const updatedComentario = await this.comentariosRepository.update(id, { texto });
    return updatedComentario;
  }

  async deletar(id: number): Promise<void> {
    await this.comentariosRepository.delete(id);
  }
}
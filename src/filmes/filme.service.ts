import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Filme } from './filme.entity';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private filmesRepository: Repository<Filme>,
  ) {}

  async criar(filmeData: Partial<Filme>): Promise<Filme> {
    const filme = this.filmesRepository.create(filmeData);
    return this.filmesRepository.save(filme);
  }

  async listarTodos(){
    return this.filmesRepository.find({
      order: { dataCriacao: 'DESC' },
    });
  }

  async buscarPorId(id: number){
    return await this.filmesRepository.findOne({
      where: { id },
      relations: ['avaliacoes', 'comentarios', 'comentarios.usuario'],
    });
  }

  async buscarPorTitulo(titulo: string){
    return this.filmesRepository.find({
      where: { titulo: Like(`%${titulo}%`) },
    });
  }

  async atualizar(id: number, filmeData: Partial<Filme>){
    const updatedFilme= await this.filmesRepository.update(id, filmeData);
    return updatedFilme;
  }

  async deletar(id: number){
    await this.filmesRepository.delete(id);
  }
}
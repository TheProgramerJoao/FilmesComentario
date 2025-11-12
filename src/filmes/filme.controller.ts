import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { FilmesService } from './filme.service';
import { Filme } from './filme.entity';

@Controller('filmes')
export class FilmesController {
  constructor(private filmesService: FilmesService) {}

  @Post()
  criar(@Body() filmeData: Partial<Filme>) {
    return this.filmesService.criar(filmeData);
  }

  @Get()
  listarTodos(@Query('titulo') titulo?: string) {
    if (titulo) {
      return this.filmesService.buscarPorTitulo(titulo);
    }
    return this.filmesService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: number) {
    return this.filmesService.buscarPorId(id);
  }

  @Put(':id')
  atualizar(@Param('id') id: number, @Body() filmeData: Partial<Filme>) {
    return this.filmesService.atualizar(id, filmeData);
  }

  @Delete(':id')
  deletar(@Param('id') id: number) {
    return this.filmesService.deletar(id);
  }
}
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ComentariosService } from './comentario.service';

@Controller('comentarios')
export class ComentariosController {
  constructor(private comentariosService: ComentariosService) {}

  @Post()
  criar(@Body() body: { usuarioId: number; filmeId: number; texto: string }) {
    return this.comentariosService.criar(body.usuarioId, body.filmeId, body.texto);
  }

  @Get('filme/:filmeId')
  listarPorFilme(@Param('filmeId') filmeId: number) {
    return this.comentariosService.listarPorFilme(filmeId);
  }

  @Put(':id')
  atualizar(@Param('id') id: number, @Body() body: { texto: string }) {
    return this.comentariosService.atualizar(id, body.texto);
  }

  @Delete(':id')
  deletar(@Param('id') id: number) {
    return this.comentariosService.deletar(id);
  }
}
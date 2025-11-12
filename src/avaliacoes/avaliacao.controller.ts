import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { AvaliacoesService } from './avaliacao.service';

@Controller('avaliacoes')
export class AvaliacoesController {
  constructor(private avaliacoesService: AvaliacoesService) {}

  @Post()
  criar(@Body() body: { usuarioId: number; filmeId: number; nota: number }) {
    return this.avaliacoesService.criar(body.usuarioId, body.filmeId, body.nota);
  }

  @Get('filme/:filmeId')
  listarPorFilme(@Param('filmeId') filmeId: number) {
    return this.avaliacoesService.listarPorFilme(filmeId);
  }

  @Get('filme/:filmeId/media')
  async calcularMedia(@Param('filmeId') filmeId: number) {
    const media = await this.avaliacoesService.calcularMedia(filmeId);
    return { media };
  }

  @Delete(':id')
  deletar(@Param('id') id: number) {
    return this.avaliacoesService.deletar(id);
  }
}
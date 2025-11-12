import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsuariosService } from './usuario.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post('cadastro')
  async cadastrar(@Body() body: { nome: string; email: string; senha: string }) {
    const usuario = await this.usuariosService.cadastrar(body.nome, body.email, body.senha);
    const { senha, ...resultado } = usuario;
    return resultado;
  }

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const usuario = await this.usuariosService.login(body.email, body.senha);
    const { senha, ...resultado } = usuario;
    return resultado;
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: number) {
    const usuario = await this.usuariosService.buscarPorId(id);
    
    return usuario;
  }
}
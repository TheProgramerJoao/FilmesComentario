import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async cadastrar(nome: string, email: string, senha: string): Promise<Usuario> {
    const usuarioExiste = await this.usuariosRepository.findOne({ where: { email } });
    
    if (usuarioExiste) {
      throw new ConflictException('Email já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    
    const usuario = this.usuariosRepository.create({
      nome,
      email,
      senha: senhaHash,
    });

    return this.usuariosRepository.save(usuario);
  }

  async login(email: string, senha: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return usuario;
  }

  async buscarPorId(id: number) {
   return await this.usuariosRepository.findOne({ where: { id } });
  }
}
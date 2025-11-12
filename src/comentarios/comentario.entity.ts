import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Filme } from '../filmes/filme.entity';

@Entity('comentarios')
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  filmeId: number;

  @Column('text')
  texto: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @ManyToOne(() => Usuario, usuario => usuario.comentarios)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne(() => Filme, filme => filme.comentarios)
  @JoinColumn({ name: 'filmeId' })
  filme: Filme;
}
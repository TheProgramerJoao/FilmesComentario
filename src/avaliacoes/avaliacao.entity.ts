import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Filme } from '../filmes/filme.entity';

@Entity('avaliacoes')
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  filmeId: number;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  nota: number;

  @CreateDateColumn()
  dataCriacao: Date;

  @ManyToOne(() => Usuario, usuario => usuario.avaliacoes)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne(() => Filme, filme => filme.avaliacoes)
  @JoinColumn({ name: 'filmeId' })
  filme: Filme;
}
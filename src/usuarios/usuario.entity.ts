import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Avaliacao } from '../avaliacoes/avaliacao.entity';
import { Comentario } from '../comentarios/comentario.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @OneToMany(() => Avaliacao, avaliacao => avaliacao.usuario)
  avaliacoes: Avaliacao[];

  @OneToMany(() => Comentario, comentario => comentario.usuario)
  comentarios: Comentario[];
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Avaliacao } from '../avaliacoes/avaliacao.entity';
import { Comentario } from '../comentarios/comentario.entity';

@Entity('filmes')
export class Filme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('text')
  sinopse: string;

  @Column()
  diretor: string;

  @Column()
  ano: number;

  @Column()
  genero: string;

  @Column()
  posterUrl: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @OneToMany(() => Avaliacao, avaliacao => avaliacao.filme)
  avaliacoes: Avaliacao[];

  @OneToMany(() => Comentario, comentario => comentario.filme)
  comentarios: Comentario[];
}
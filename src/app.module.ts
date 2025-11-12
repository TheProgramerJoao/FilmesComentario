import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuario.module';
import { FilmesModule } from './filmes/filme.module';
import { AvaliacoesModule } from './avaliacoes/avaliacao.module';
import { ComentariosModule } from './comentarios/comentario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    UsuariosModule,
    FilmesModule,
    AvaliacoesModule,
    ComentariosModule,
  ],
})
export class AppModule {}
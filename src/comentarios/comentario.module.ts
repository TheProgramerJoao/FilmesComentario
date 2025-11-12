import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './comentario.entity';
import { ComentariosController } from './comentario.controller';
import { ComentariosService } from './comentario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario])],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}
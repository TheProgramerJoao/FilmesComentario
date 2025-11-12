import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filme } from './filme.entity';
import { FilmesController } from './filme.controller';
import { FilmesService } from './filme.service';

@Module({
  imports: [TypeOrmModule.forFeature([Filme])],
  controllers: [FilmesController],
  providers: [FilmesService],
  exports: [FilmesService],
})
export class FilmesModule {}
import { Module } from '@nestjs/common';
import { LinkShortenerController } from './link-shortener.controller';
import { LinkShortenerService } from './link-shortener.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLink } from 'src/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLink])],
  controllers: [LinkShortenerController],
  providers: [LinkShortenerService],
  exports: [TypeOrmModule],
})
export class LinkShortenerModule {}

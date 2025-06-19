import { Module } from '@nestjs/common';
import { LinkShortenerController } from './link-shortener.controller';
import { LinkShortenerService } from './link-shortener.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLink, Click } from 'db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLink, Click])],
  controllers: [LinkShortenerController],
  providers: [LinkShortenerService],
})
export class LinkShortenerModule { }

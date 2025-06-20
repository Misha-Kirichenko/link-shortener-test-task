import { Module } from '@nestjs/common';
import { LinkShortenerModule } from '../link-shortener/link-shortener.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Click } from 'src/db/entities';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from 'src/url/url.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    DbModule,
    LinkShortenerModule,
    UrlModule,
    TypeOrmModule.forFeature([Click]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

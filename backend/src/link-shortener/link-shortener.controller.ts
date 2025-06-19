import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LinkShortenerService } from './link-shortener.service';
import { UrlDTO } from './dto/url.dto';
import { IMessage, IShortUrl } from 'common/interfaces';

@Controller('link-shortener')
export class LinkShortenerController {
  constructor(private readonly linkShortenerService: LinkShortenerService) { }

  @Post('/shorten')
  shortenUrl(@Body() urlDTO: UrlDTO): Promise<IShortUrl> {
    return this.linkShortenerService.shortenUrl(urlDTO);
  }

  @Delete('/:shortUrl')
  deleteShortUrl(@Param('shortUrl') shortUrl: string): Promise<IMessage> {
    return this.linkShortenerService.deleteShortUrl(shortUrl);
  }
}

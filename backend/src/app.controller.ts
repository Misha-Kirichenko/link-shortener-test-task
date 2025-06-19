import { Controller, Param, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { TShortLinkAnalytics, TShortLinkInfo } from 'common/types';
import { ShortLinkInfoDTO } from './dto/shortUrlInfo.dto';
import { IShortLinkListItem } from 'common/interfaces';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/:type/:shortUrl')
  getShortenLinkInfo(
    @Param() shortLinkInfoDTO: ShortLinkInfoDTO,
  ): Promise<TShortLinkInfo | TShortLinkAnalytics> {
    const { type, shortUrl } = shortLinkInfoDTO;
    return this.appService.getShortenLinkInfo(type, shortUrl);
  }

  @Get('/url-list')
  getShortUrlList(): Promise<IShortLinkListItem[]> {
    return this.appService.getShortUrlList();
  }

  //redirect without api prefix
  @Get(':shortUrl')
  redirectToUrl(
    @Req() req: Request,
    @Res() res: Response,
    @Param('shortUrl') shortUrl: string,
  ): Promise<void> {
    return this.appService.redirectToUrl(req.ip as string, res, shortUrl);
  }
}

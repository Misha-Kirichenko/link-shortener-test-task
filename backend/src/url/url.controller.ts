import { Controller, Get, Param } from '@nestjs/common';
import { IShortLinkListItem } from 'src/common/interfaces';
import { UrlService } from './url.service';
import { TShortLinkAnalytics, TShortLinkInfo } from 'src/common/types';
import { ShortLinkInfoDTO } from './dto/shortUrlInfo.dto';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Get('/list')
  getShortUrlList(): Promise<IShortLinkListItem[]> {
    return this.urlService.getShortUrlList();
  }

  @Get(':type/:shortUrl')
  getShortenLinkInfo(
    @Param() shortLinkInfoDTO: ShortLinkInfoDTO,
  ): Promise<TShortLinkInfo | TShortLinkAnalytics> {
    const { type, shortUrl } = shortLinkInfoDTO;
    return this.urlService.getShortenLinkInfo(type, shortUrl);
  }
}

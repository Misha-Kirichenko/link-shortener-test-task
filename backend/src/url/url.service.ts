import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { getShortenUrlAddr } from 'src/utils';
import {
  SHORT_LINK_ANALYTICS,
  SHORT_LINK_INFO_QUERY,
  SHORT_URL_LIST_QUERY,
} from 'src/common/constants/sql.constants';
import { MESSAGES } from 'src/common/constants/message.constants';
import { TShortLinkAnalytics, TShortLinkInfo } from 'src/common/types';
import { InfoType } from '../common/enums/info-type.enum';
import { IShortLinkListItem } from 'src/common/interfaces';

@Injectable()
export class UrlService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  public async getShortUrlList(): Promise<IShortLinkListItem[]> {
    try {
      const { HOST, NGINX_PORT } = process.env;
      const shortUrlList: IShortLinkListItem[] = await this.dataSource.query(
        SHORT_URL_LIST_QUERY,
        [HOST, NGINX_PORT],
      );

      return shortUrlList;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(MESSAGES.ERRORS.BAD_REQUEST);
    }
  }

  public async getShortenLinkInfo(
    infoType: InfoType,
    shortUrl: string,
  ): Promise<TShortLinkInfo | TShortLinkAnalytics> {
    try {
      const queryTypes = {
        [InfoType.I]: SHORT_LINK_INFO_QUERY,
        [InfoType.A]: SHORT_LINK_ANALYTICS,
      };

      const [foundShortLinkInfo]: TShortLinkInfo[] | TShortLinkAnalytics[] =
        await this.dataSource.query(queryTypes[infoType], [shortUrl]);

      if (!foundShortLinkInfo) {
        throw new NotFoundException(
          `Information about short url: "${getShortenUrlAddr(shortUrl)}" was not found`,
        );
      }

      return foundShortLinkInfo;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(MESSAGES.ERRORS.BAD_REQUEST);
    }
  }
}

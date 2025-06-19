import {
  BadRequestException,
  GoneException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ShortLink, Click } from 'db/entities';
import { DataSource, Repository } from 'typeorm';
import { Response } from 'express';
import { getShortenUrlAddr, messageUtil } from 'utils';
import {
  SHORT_LINK_ANALYTICS,
  SHORT_LINK_INFO_QUERY,
  SHORT_URL_LIST_QUERY,
} from 'common/constants/sql.constants';
import { MESSAGES } from 'common/constants/message.constants';
import { TShortLinkAnalytics, TShortLinkInfo } from 'common/types';
import { InfoType } from './info-type.enum';
import { IShortLinkListItem } from 'common/interfaces';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShortLink)
    private readonly shortLinkRepository: Repository<ShortLink>,
    @InjectRepository(Click)
    private readonly clickRepository: Repository<Click>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

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

  public async redirectToUrl(
    ip: string,
    res: Response,
    shortUrl: string,
  ): Promise<void> {
    try {
      const shortLink = await this.shortLinkRepository.findOne({
        where: {
          alias: shortUrl,
        },
        select: {
          id: true,
          originalUrl: true,
          expiresAt: true,
        },
      });

      if (!shortLink) {
        throw new NotFoundException(
          messageUtil.EXCEPTION.NOT_FOUND(
            `Short url: "${getShortenUrlAddr(shortUrl)}"`,
          ),
        );
      }

      const { id, expiresAt, originalUrl } = shortLink;
      const shortUrlAddr = getShortenUrlAddr(shortUrl);

      if (expiresAt && expiresAt >= Date.now()) {
        throw new GoneException(messageUtil.EXCEPTION.EXPIRED(shortUrlAddr));
      }

      await this.clickRepository.insert({
        ip,
        createdAt: Math.floor(Date.now() / 1000),
        shortLink: { id },
      });

      res.redirect(originalUrl);
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

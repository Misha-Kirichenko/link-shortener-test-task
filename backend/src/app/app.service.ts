import {
  BadRequestException,
  GoneException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortLink, Click } from 'src/db/entities';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { getShortenUrlAddr, messageUtil } from 'src/utils';
import { MESSAGES } from 'src/common/constants/message.constants';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShortLink)
    private readonly shortLinkRepository: Repository<ShortLink>,
    @InjectRepository(Click)
    private readonly clickRepository: Repository<Click>,
  ) { }

  public async redirectToUrl(
    ip: string,
    res: Response,
    shortUrl: string,
  ): Promise<void> {
    try {
      const shortLinkInstance = await this.shortLinkRepository.findOne({
        where: {
          alias: shortUrl,
        },
      });

      if (!shortLinkInstance) {
        throw new NotFoundException(
          messageUtil.EXCEPTION.NOT_FOUND(
            `Short url: "${getShortenUrlAddr(shortUrl)}"`,
          ),
        );
      }

      const shortLink = shortLinkInstance.toJSON();

      const { id, expiresAt, originalUrl } = shortLink;
      const shortUrlAddr = getShortenUrlAddr(shortUrl);

      if (expiresAt && expiresAt <= Date.now()) {
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
}

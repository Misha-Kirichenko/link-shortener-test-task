import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortLink } from 'src/db/entities';
import { Repository } from 'typeorm';
import { UrlDTO } from './dto/url.dto';
import * as crypto from 'crypto';
import { getShortenUrlAddr, messageUtil } from 'src/utils';
import { IMessage, IShortUrl } from 'src/common/interfaces';
import { MESSAGES } from 'src/common/constants/message.constants';

@Injectable()
export class LinkShortenerService {
  constructor(
    @InjectRepository(ShortLink)
    private readonly shortLinkRepository: Repository<ShortLink>,
  ) { }

  public async shortenUrl(urlDTO: UrlDTO): Promise<IShortUrl> {
    const insertData = {
      originalUrl: urlDTO.originalUrl,
      expiresAt: urlDTO.expiresAt ? new Date(urlDTO.expiresAt).getTime() : null,
      alias: urlDTO.alias || crypto.randomBytes(4).toString('hex'),
    };
    try {
      const newShortLinkData = this.shortLinkRepository.create(insertData);
      await this.shortLinkRepository.save(newShortLinkData);
      return { shortUrl: getShortenUrlAddr(insertData.alias) };
    } catch (error: unknown) {
      const isUniqueFieldError =
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error['code'] === '23505';

      if (isUniqueFieldError) {
        throw new ConflictException(
          `Short url: "${getShortenUrlAddr(insertData.alias)}" already exists`,
        );
      }
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(MESSAGES.ERRORS.BAD_REQUEST);
    }
  }

  public async deleteShortUrl(shortUrl: string): Promise<IMessage> {
    try {
      const result = await this.shortLinkRepository
        .createQueryBuilder()
        .delete()
        .from(ShortLink)
        .where('alias = :shortUrl', { shortUrl })
        .execute();

      if (!result.affected) {
        throw new NotFoundException(
          messageUtil.EXCEPTION.NOT_FOUND(
            `Short url: "${getShortenUrlAddr(shortUrl)}"`,
          ),
        );
      }

      return messageUtil.SUCCESS.DELETED(
        `Short url: "${getShortenUrlAddr(shortUrl)}"`,
      );
    } catch (error: unknown) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(MESSAGES.ERRORS.BAD_REQUEST);
    }
  }
}

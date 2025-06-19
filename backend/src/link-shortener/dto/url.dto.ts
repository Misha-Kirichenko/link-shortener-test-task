import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Matches,
} from 'class-validator';
import { IsFutureDate } from 'common/decorators';

export class UrlDTO {
  @IsNotEmpty()
  @IsUrl(
    { require_protocol: true },
    { message: 'originalUrl must be a valid URL' },
  )
  originalUrl!: string;

  @IsOptional()
  @IsDateString()
  @IsFutureDate()
  expiresAt?: string;

  @IsOptional()
  @Matches(/^[a-zA-Z0-9_-]{2,20}$/, {
    message:
      'alias must be 2-20 characters and contain only letters, numbers, hyphens and underscores',
  })
  alias?: string;
}

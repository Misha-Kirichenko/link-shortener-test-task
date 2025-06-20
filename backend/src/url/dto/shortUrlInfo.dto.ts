import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { InfoType } from 'common/enums/info-type.enum';

export class ShortLinkInfoDTO {
  @IsNotEmpty()
  @IsString()
  shortUrl: string;

  @IsNotEmpty()
  @IsIn(Object.values(InfoType))
  type: InfoType;
}

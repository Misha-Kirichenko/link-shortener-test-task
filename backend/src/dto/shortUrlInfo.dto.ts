import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { InfoType } from 'src/info-type.enum';

export class ShortLinkInfoDTO {
  @IsNotEmpty()
  @IsString()
  shortUrl: string;

  @IsNotEmpty()
  @IsIn(Object.values(InfoType))
  type: InfoType;
}

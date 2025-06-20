import { Controller, Param, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}
  //redirect without api prefix
  @Get('/:shortUrl')
  redirectToUrl(
    @Req() req: Request,
    @Res() res: Response,
    @Param('shortUrl') shortUrl: string,
  ): Promise<void> {
    return this.appService.redirectToUrl(req.ip as string, res, shortUrl);
  }
}

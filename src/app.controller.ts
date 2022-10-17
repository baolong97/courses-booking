import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request, @Res() response: Response): string {
    console.log(request.headers);
    return this.appService.getHello();
  }
}

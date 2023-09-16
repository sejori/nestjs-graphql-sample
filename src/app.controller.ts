import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello() {
    return this.appService.getHello();
  }

  @Get('/seed-db')
  seedDB() {
    return this.appService.seedDB();
  }
}

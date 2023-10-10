import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from 'src/app/services/app.service';
import { UserModule } from 'src/user/user.module'
import { PrismaModule } from 'src/prisma/prisma.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, UserModule],
      providers: [AppService, AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return HTML content', () => {
      expect(appController.getHello()).toMatch(/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(. *?)/g)
    });
  });
});

import { mock, MockProxy } from 'jest-mock-extended';
import { AppController } from './app.controller';
import { AppService } from 'src/app/services/app.service';

describe('AppController', () => {
  let appController: AppController;
  let mockAppService: MockProxy<AppService>;

  beforeEach(async () => {
    mockAppService = mock<AppService>({
      getHello: () => `<!DOCTYPE html>
        <html>
          <head>
            <title>Hola</title>
          </head>
          <body>
            <p>Yo soy bien!</p>
          </body>
        </html>
      `
    });

    appController = new AppController(mockAppService);
  });

  describe('root', () => {
    it('should return a valid HTML document', () => {
      expect(appController.getHello()).toMatch(/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(. *?)/g);
    });
  });
});

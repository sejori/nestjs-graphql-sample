import { mock, MockProxy } from 'jest-mock-extended';
import { AppController } from './app.controller';
import { AppService } from 'src/app/services/app.service';

describe('AppController', () => {
  let appController: AppController;
  let mockAppService: MockProxy<AppService>;

  beforeEach(async () => {
    mockAppService = mock<AppService>({
      getHello: jest.fn(
        () => `<!DOCTYPE html>
        <html>
          <head>
            <title>Hola</title>
          </head>
          <body>
            <p>Yo soy bien!</p>
          </body>
        </html>
      `,
      ),
      seedDB: jest.fn(() => new Promise((res) => res('DB seeded.'))),
    });

    appController = new AppController(mockAppService);
  });

  describe('GET /', () => {
    it('should trigger getHello in service and return valid HTML document', () => {
      expect(appController.getHello()).toMatch(
        /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(. *?)/g,
      );
      expect(mockAppService.getHello.mock.calls).toHaveLength(1);
    });
  });

  describe('GET /seed-db', () => {
    it('should trigger seed logic from service', () => {
      expect(appController.seedDB()).toBeInstanceOf(Promise);
      expect(mockAppService.seedDB.mock.calls).toHaveLength(1);
    });
  });
});

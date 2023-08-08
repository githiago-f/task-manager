import { Test, TestingModule } from '@nestjs/testing';
import { AppController, StatusCodes } from 'src/app/controllers/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Ok"', () => {
      expect(appController.health().status).toBe(StatusCodes.OK);
    });
  });
});

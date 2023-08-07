import { Test, TestingModule } from '@nestjs/testing';
import { Encription } from './encryption';

describe('Encryption', () => {
  let provider: Encription;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Encription],
    }).compile();

    provider = module.get<Encription>(Encription);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

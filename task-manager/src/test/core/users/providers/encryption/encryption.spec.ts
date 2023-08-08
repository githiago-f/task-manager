import { Test, TestingModule } from '@nestjs/testing';
import { Encryption } from '../../../../../core/users/providers/encryption/encryption';

describe('# Encryption', () => {
  let provider: Encryption;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Encryption],
    }).compile();

    provider = module.get<Encryption>(Encryption);
  });

  describe('When create', () => {
    it('should be defined', () => {
      expect(provider).toBeDefined();
    });
  });

  describe('When call .hash', () => {
    it('then should encrypt the text', async () => {
      const hashed = await provider.hash('test');
      expect(hashed).not.toEqual('test');
      expect(await provider.compare('not-true', hashed)).toBeFalsy();
      expect(await provider.compare('test', hashed)).toBeTruthy();
    });
  });
});

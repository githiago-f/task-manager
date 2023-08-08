import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/users/user';
import { Test, TestingModule } from '@nestjs/testing';
import { dataSourceMockFactory } from 'src/test/utils';
import { UserRepository } from 'src/core/users/user.repository';
import { UserService } from 'src/core/users/service/user/user.service';
import { Encryption } from 'src/core/users/providers/encryption/encryption';
import { InvalidCredentialsException } from 'src/core/users/service/erros/invalid-credentials.exception';
import { AlreadyHasAnAccountException } from 'src/core/users/service/erros/already-has-account.exception';

describe('# UserService', () => {
  let service: UserService;
  const jwtServiceMock = { signAsync: jest.fn().mockResolvedValue('jwt_token') };
  const userRepositoryMock = { findByEmail: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, 
        Encryption,
        { provide: DataSource, useFactory: dataSourceMockFactory },
        { provide: JwtService, useValue: jwtServiceMock },
        UserRepository,
      ],
    })
      .overrideProvider(Encryption)
      .useValue({
        hash: async (pass: string) => pass,
        compare: async (pass: string, hash: string) => pass === hash
      })
      .overrideProvider(UserRepository)
      .useValue(userRepositoryMock)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Given the user try to sign-in', () => {
    describe('When valid credentials', () => {
      const validCredentials = { 
        email: 'user@example.com',
        password: '@Password123'
      };

      it('Then should allow the user to login', async () => {
        const validUser = new User();
        await validUser.setPasswordHash('@Password123', async (pass) => pass);
        userRepositoryMock.findByEmail.mockResolvedValueOnce(validUser);
        const token = await service.signIn(validCredentials);
        expect(token).toBe('jwt_token');
        // double check
        expect(await validUser.comparePasswords(
          async hash => hash === validCredentials.password
        )).toBeTruthy();
      });
    });

    describe('When invalid credentials', () => {
      describe('And the email not found', () => {
        it('Then should throw an unauthorized error for user not found', (done) => {
          userRepositoryMock.findByEmail.mockResolvedValue(null);
          expect.assertions(1);
          service.signIn({ email: 'invalid@email.com', password: 'ignored' })
            .then(() => fail('should not return any value'))
            .catch(err => {
              expect(err).toBeInstanceOf(InvalidCredentialsException);
              done();
            });
        });
      });

      describe('And the password don\'t match', () => {
        it('Then should throw an unauthorized error for password unmatch', (done) => {
          const invalidUser = new User();
          invalidUser.setPasswordHash('valid', async (pass) => pass);
          userRepositoryMock.findByEmail.mockResolvedValue(invalidUser);
          expect.assertions(1);
          service.signIn({ email: 'invalid@email.com', password: 'invalid' })
            .then(() => fail('should not return any value'))
            .catch(err => {
              expect(err).toBeInstanceOf(InvalidCredentialsException);
              done();
            });
        });
      });
    });
  });

  describe('Given the user try to sign-up', () => {
    describe('When email already exists', () => {
      it('Then should inform user about the conflict', (done) => {
        expect.assertions(1);
        service.signUp({ email: 'already@exists.com', name: '', password: ''})
          .then(() => fail('should not resolve'))
          .catch(err => {
            expect(err).toBeInstanceOf(AlreadyHasAnAccountException);
            done();
          });
      });
    });
  });
});

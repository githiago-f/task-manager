import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { dataSourceMockFactory } from '../../../../utils';
import { UserRepository } from '../../../../../core/users/user.repository';
import { UserService } from '../../../../../core/users/service/user/user.service';
import { Encryption } from '../../../../../core/users/providers/encryption/encryption';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../../../core/users/user';
import { InvalidCredentialsException } from '../../../../../core/users/service/erros/invalid-credentials.exception';
import { AlreadyHasAnAccountException } from '../../../../../core/users/service/erros/already-has-account.exception';

describe('UserService', () => {
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

  describe('When .signIn', () => {
    describe('Given valid credentials', () => {
      const validCredentials = { 
        email: 'user@example.com',
        password: '@Password123'
      };

      test('then it should allow the user to login', async () => {
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

    describe('Given invalid credentials', () => {
      test('then it should throw an unauthorized error for user not found', (done) => {
        userRepositoryMock.findByEmail.mockResolvedValue(null);
        expect.assertions(1);
        service.signIn({ email: 'invalid@email.com', password: 'ignored' })
          .then(() => fail('should not return any value'))
          .catch(err => {
            expect(err).toBeInstanceOf(InvalidCredentialsException);
            done();
          });
      });

      test('then it should throw an unauthorized error for password unmatch', (done) => {
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

  describe('When .signUp', () => {
    describe('Given email already exists', () => {
      test('then it should inform user about the conflict', (done) => {
        expect.assertions(1);
        service.signUp({ email: 'already@exists.com', name: '', password: ''})
          .then(() => fail('should not resolve'))
          .catch(err => {
            expect(err).toBeInstanceOf(AlreadyHasAnAccountException);
            done();
          });
      });
    });
  })
});

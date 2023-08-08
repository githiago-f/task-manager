import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from 'src/app/controllers/users/users.controller';
import { Encryption } from 'src/core/users/providers/encryption/encryption';
import { UserService } from 'src/core/users/service/user/user.service';
import { UserRepository } from 'src/core/users/user.repository';

describe('UsersController', () => {
  let controller: UsersController;
  const userRepositoryMock = {};
  const jwtServiceMock = { signAsync: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UserService,
        Encryption,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: UserRepository, useValue: userRepositoryMock }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

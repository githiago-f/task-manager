import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/app/guards/jwt/jwt.guard';

describe('JwtGuard', () => {
  let jwtGuard: JwtGuard;
  const jwtService = new JwtService({});
  
  beforeAll(() => {
    jwtGuard = new JwtGuard(jwtService);
  });

  it('should be defined', () => {
    expect(jwtGuard).toBeDefined();
  });

  describe('Given the user try to access the route', () => {
    describe('When the token is not present', () => {
      const noToken = { switchToHttp: () => ({
        getRequest: () => ({ headers: { } })
      }) } as ExecutionContext;
      it('Then informs that the user is unauthorized', (done) => {
        expect.assertions(1);
        jwtGuard.canActivate(noToken)
          .then(() => fail('Should not work'))
          .catch(e => {
            expect(e).toBeInstanceOf(UnauthorizedException);
            done();
          });
      });
    });
    describe('When the token is invalid', () => {
      const invalidToken = { switchToHttp: () => ({
        getRequest: () => ({ headers: {
          authorization: 'Basic INVALIDBASIC'
        } })
      }) } as ExecutionContext;
      it('Then informs that the user is unauthorized', (done) => {
        expect.assertions(1);
        jwtGuard.canActivate(invalidToken)
          .then(() => fail('Should not work'))
          .catch(e => {
            expect(e).toBeInstanceOf(UnauthorizedException);
            done();
          });
      });
    });
    describe('When the token is valid', () => {
      const token = { switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer token_jwt' } })
      }) } as ExecutionContext;
      it('Then will allow the access and inform an user to the route', async () => {
        jwtService.verifyAsync = jest.fn().mockResolvedValue({ sub: 1 });
        await expect(jwtGuard.canActivate(token)).resolves.toBeTruthy();
      });
    });
  });
});

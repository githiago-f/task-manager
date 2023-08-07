import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiConflictResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserService } from 'src/core/users/service/user/user.service';
import { SignInCredentials } from './dto/signin.credentials';
import { SignUpCredentials } from './dto/signup.credentials';
import { Response } from 'express';
import { InvalidCredentialsException } from 'src/core/users/service/erros/invalid-credentials.exception';
import { AlreadyHasAnAccountException } from 'src/core/users/service/erros/already-has-account.exception';

const userResponseSchema = {
    schema: {
        properties: {
            id:{type: 'number'},
            email:{type:'string', format:'email'},
            name:{type:'string'}
        }
    }
};

@ApiTags('auth')
@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}

    @Post('/login')
    @ApiUnauthorizedResponse({ type: InvalidCredentialsException })
    @ApiOkResponse({schema: {properties: {access_token: { type: 'string' }}}})
    async signIn(@Body() credentials: SignInCredentials, @Res() res: Response) {
        const access_token = await this.userService.signIn(credentials);
        res.setHeader('Authorization', `Bearer ${access_token}`);
        return res.json({access_token});
    }

    @Post()
    @ApiOkResponse(userResponseSchema)
    @ApiConflictResponse({type: AlreadyHasAnAccountException})
    signUp(@Body() credentials: SignUpCredentials) {
        return this.userService.signUp(credentials);
    }
}

import { Injectable } from '@nestjs/common';
import { Encryption } from '../../providers/encryption/encryption';
import { SignInCredentials } from 'src/app/controllers/users/dto/signin.credentials';
import { SignUpCredentials } from 'src/app/controllers/users/dto/signup.credentials';
import { UserRepository } from '../../user.repository';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException } from '../erros/invalid-credentials.exception';
import { AlreadyHasAnAccountException } from '../erros/already-has-account.exception';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private encription: Encryption,
        private jwtService: JwtService
    ) {}

    async signIn({ email, password }: SignInCredentials) {
        const user = await this.userRepository.findByEmail(email);
        if(!user) {
            await this.encription.hash('timeout');
            throw new InvalidCredentialsException();
        }
        const valid = await user.comparePasswords(
            (hash) => this.encription.compare(password, hash));
        if(!valid) {
            throw new InvalidCredentialsException();
        }
        return this.jwtService.signAsync({ sub: user.id });
    }

    async signUp(credentials: SignUpCredentials) {
        const exists = await this.userRepository.findByEmail(credentials.email);
        if(exists) {
            throw new AlreadyHasAnAccountException();
        }
        const user = this.userRepository.create(credentials);
        await user.setPasswordHash(
            credentials.password,
            (pass) => this.encription.hash(pass));
        return this.userRepository.save(user);
    }
}

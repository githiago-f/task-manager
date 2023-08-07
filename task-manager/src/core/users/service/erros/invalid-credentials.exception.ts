import { UnauthorizedException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const message = 'Invalid credentials';

export class InvalidCredentialsException extends UnauthorizedException {
    @ApiProperty({ example: message })
    message: string;
    constructor() { super(message); }
}
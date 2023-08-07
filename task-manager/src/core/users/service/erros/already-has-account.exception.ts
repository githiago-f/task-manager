import { ConflictException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const message = 'E-mail already registered. Forgot your password?';

export class AlreadyHasAnAccountException extends ConflictException {
    @ApiProperty({ example: message })
    message: string;

    constructor() {
        super(message);
    }
}

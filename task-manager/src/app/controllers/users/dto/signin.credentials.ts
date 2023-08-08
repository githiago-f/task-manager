import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInCredentials {
    @IsEmail()
    @ApiProperty({ format: 'email' })
    public readonly email: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly password: string;
}

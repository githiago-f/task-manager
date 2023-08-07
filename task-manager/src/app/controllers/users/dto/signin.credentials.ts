import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInCredentials {
    @IsEmail()
    @ApiProperty({ format: 'email' })
    public readonly email: string;
    @IsString() 
    @MinLength(8)
    @ApiProperty()
    public readonly password: string;
}

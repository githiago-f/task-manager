import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignUpCredentials {
    @IsString()
    @ApiProperty()
    public readonly name: string;
    @IsEmail()
    @ApiProperty({ type: 'string', format: 'email' })
    public readonly email: string;
    @ApiProperty()
    @IsStrongPassword({
        minLength: 8, 
        minLowercase: 1, 
        minNumbers: 1, 
        minUppercase: 1,
        minSymbols: 1
    })
    public readonly password: string;
}

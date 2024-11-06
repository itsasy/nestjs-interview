import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsInt()
    roleId: number;
}
import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCustomerDto {
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
}
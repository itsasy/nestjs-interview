import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateCustomerDto {
    @IsString()
    name: string;

    @MinLength(6)
    password: string;

    @IsString()
    @IsEmail()
    email: string;
}
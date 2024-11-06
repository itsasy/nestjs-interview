import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private prisma: PrismaService) { }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDto.email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(loginDto.password, user.password);
        //const isValidPassword = await loginDto.password == user.password;

        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
        };
    }


    async register(RegisterDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash('password', 10);

        const existingUser = await this.prisma.user.findUnique({
            where: { email: RegisterDto.email }
        })


        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }

        const user = await this.prisma.user.create({
            data: {
                email: RegisterDto.email,
                password: hashedPassword,
                name: RegisterDto.name,
                roleId: RegisterDto.roleId
            }
        });

        return {
            message: 'User created successfully', userId: user.id
        }
    }
}   
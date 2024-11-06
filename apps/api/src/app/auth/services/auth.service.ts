import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

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
}   
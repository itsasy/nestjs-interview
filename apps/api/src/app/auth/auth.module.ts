import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'defaultSecret',
            signOptions: { expiresIn: '1h' },
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        PrismaService,
        JwtStrategy,
        JwtAuthGuard
    ],
    exports: [AuthService],
})

export class AuthModule { }

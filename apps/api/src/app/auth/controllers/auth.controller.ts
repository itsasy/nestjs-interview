import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";
import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
 
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const token = await this.authService.login(loginDto);

        if (!token) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return { access_token: token };
    }
}
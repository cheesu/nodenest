import { Body, Post, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //로그인 요청 컨틀롤러 함수
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('first', loginDto);
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    return this.authService.refreshToken(body.refresh_token);
  }
}

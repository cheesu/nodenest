import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/Login.dto';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 사용자 인증 로직 (예시)
  async validateUser(username: string, pass: string): Promise<any> {
    // 여기서는 단순화를 위해 하드코딩된 사용자 정보를 사용
    const user = { id: 1, username: 'test', password: '1234test' };

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    console.log(':Testset');
    // 사용자 인증 로직을 사용하여 유효한 사용자인지 검증
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('로그인 정보가 유효하지 않습니다.');
    }

    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }), // 예시: 15분
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), // 예시: 7일
    };
  }

  // 토큰 리프레시 로직
  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const payload = { username: decoded.username, sub: decoded.sub };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }
}

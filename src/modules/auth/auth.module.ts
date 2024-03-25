import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // 비밀키, 환경 변수에서 가져오는 것이 안전
      signOptions: { expiresIn: '60s' }, // 토큰 유효 시간
    }),
  ],
})
export class AuthModule {}

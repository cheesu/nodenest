import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtServiceMock: { sign: jest.Mock; verify: jest.Mock };

  beforeEach(async () => {
    // jwtServiceMock 객체를 매 테스트마다 새로 정의하여 초기화
    jwtServiceMock = {
      sign: jest.fn(() => 'token'),
      verify: jest.fn(() => ({ username: 'test', sub: 1 })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user', async () => {
    const result = await service.validateUser('test', '1234test');
    expect(result).toEqual({ id: 1, username: 'test' });
  });

  it('should not validate user with wrong password', async () => {
    const result = await service.validateUser('test', 'wrongpassword');
    expect(result).toBeNull();
  });

  it('should login user', async () => {
    const loginDto = { username: 'test', password: '1234test' };
    const result = await service.login(loginDto);
    expect(result).toEqual({
      access_token: 'token',
      refresh_token: 'token',
    });
    expect(jwtServiceMock.sign).toHaveBeenCalledTimes(2);
  });

  it('should not login user with wrong password', async () => {
    const loginDto = { username: 'test', password: 'wrongpassword' };
    await expect(service.login(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should refresh token', async () => {
    const result = await service.refreshToken('token');
    expect(result).toEqual({ access_token: 'token' });
    expect(jwtServiceMock.verify).toHaveBeenCalled();
  });

  it('should not refresh with invalid token', async () => {
    jwtServiceMock.verify = jest.fn(() => {
      throw new Error();
    });
    await expect(service.refreshToken('invalidtoken')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

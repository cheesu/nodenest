import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  // JwtService의 모의 구현을 생성합니다.
  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      // AuthService와 JwtService 모의 객체를 providers 배열에 추가합니다.
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    const loginDto = { username: 'test', password: 'test' };
    jest.spyOn(authService, 'login').mockImplementation(() =>
      Promise.resolve({
        access_token: 'test token',
        refresh_token: 'refresh token',
      }),
    );

    expect(await controller.login(loginDto)).toEqual({
      access_token: 'test token',
      refresh_token: 'refresh token',
    });
  });

  it('should refresh token', async () => {
    const refreshToken = 'refresh token';
    jest
      .spyOn(authService, 'refreshToken')
      .mockImplementation(() => Promise.resolve({ access_token: 'new token' }));

    expect(await controller.refresh({ refresh_token: refreshToken })).toEqual({
      access_token: 'new token',
    });
  });
});

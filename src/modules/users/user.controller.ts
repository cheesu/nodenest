import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getuserdata')
  getUserData(@Query('userid') userId: string): UserDto {
    return this.userService.getUserData(userId);
  }
}

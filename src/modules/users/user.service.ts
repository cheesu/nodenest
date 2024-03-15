import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  // 예제를 위한 사용자 정보 조회 메서드
  getUserData(userId: string): UserDto {
    // 실제 구현에서는 여기서 데이터베이스 조회 등을 수행
    return {
      userId: userId,
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
    };
  }
}

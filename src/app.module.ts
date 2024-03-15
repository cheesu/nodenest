import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ChatAiModule } from './modules/chatAi/chatAi.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      // .forRoot()를 추가하여 전역 모듈로 설정
      isGlobal: true, // 이 옵션을 통해 전역적으로 사용 가능
    }),

    ChatAiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

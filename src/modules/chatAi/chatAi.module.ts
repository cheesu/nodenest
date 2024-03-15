import { Module } from '@nestjs/common';
import { ChatAiController } from './chatAi.controller';
import { ChatAiService } from './chatAi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ChatAiController],
  providers: [ChatAiService],
})
export class ChatAiModule {}

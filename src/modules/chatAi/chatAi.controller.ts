import { Controller, Get, Query } from '@nestjs/common';
import { ChatAiService } from './chatAi.service';
import { ChatAiResDto } from './dto/chatAiRes.dto';
@Controller('chatai')
export class ChatAiController {
  constructor(private userService: ChatAiService) {}

  @Get('ask')
  getUserData(@Query('ask') ask: string): Promise<ChatAiResDto> {
    return this.userService.getChatAiResponse(ask);
  }
}

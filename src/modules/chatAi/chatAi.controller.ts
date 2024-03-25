import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ChatAiService } from './chatAi.service';
import { ChatAiResDto } from './dto/chatAiRes.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('chatai')
export class ChatAiController {
  constructor(private userService: ChatAiService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('ask')
  getUserData(@Query('ask') ask: string): Promise<ChatAiResDto> {
    return this.userService.getChatAiResponse(ask);
  }
}

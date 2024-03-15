import { Injectable } from '@nestjs/common';
import { ChatAiResDto } from './dto/chatAiRes.dto';
import { ConfigService } from '@nestjs/config';

import { OpenAI } from 'openai';

@Injectable()
export class ChatAiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    // OpenAI 인스턴스 초기화
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async getChatAiResponse(ask: string): Promise<ChatAiResDto> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a poetic assistant, skilled in explaining complex programming concepts with creative flair.',
          },
          {
            role: 'user',
            content: ask,
          },
        ],
      });

      return {
        msg: response.choices[0].message.content,
        etc: response.choices[0].message.role, // 필요한 경우 다른 정보와 함께 반환
      };
    } catch (error) {
      console.error(
        'Error calling OpenAI API:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to get response from OpenAI');
    }
  }
}

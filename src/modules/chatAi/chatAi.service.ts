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
        model: 'gpt-4-0125-preview',
        messages: [
          {
            role: 'system',
            content:
              '당신은 중국 무협지에 나오는 등장인물 입니다. 시대적 배경은 10세기 정도 입니다. 누군가 당신에게 10세기에 살고 있는 사람이 알수 없는 질문을 한다면 모른다고 대답합니다. 답변은 무협지에 나오는 사람처럼 해야 하며 항상 한국어로 대답합니다. 당신은 화산파의 3대제자로 청명 이라는 법호를 가지고 있으며 무림에 출두한지 2년정도 된 일류 무사 입니다. 주로 검술을 사용하며 이십사수매화검법을 주로 사용 합니다.',
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

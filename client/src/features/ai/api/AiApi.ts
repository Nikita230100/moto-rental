import { axiosInstance } from '../../../shared/lib/axiosInstance';

export class AiApi {
  static async generateText(prompt: string) {
    const { data } = await axiosInstance.post('/ai/generate', {
      prompt,
    });

    return data;
  }
}
import axios from 'axios';
import { SerpApiResponse, AIOverview } from './types';

export class SerpApiClient {
  private apiKey: string;
  private baseUrl: string = 'https://serpapi.com/search';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Google AIオーバービューを取得します
   * @param pageToken
   * @returns 
   */
  async getAiOverview(pageToken: string): Promise<AIOverview> {
    try {
      const response = await axios.get<SerpApiResponse>(this.baseUrl, {
        params: {
          engine: 'google_ai_overview',
          page_token: pageToken,
          api_key: this.apiKey
        }
      });

      return response.data.ai_overview;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('SerpAPI呼び出しエラー:', error.message);
        if (error.response) {
          console.error('レスポンスデータ:', error.response.data);
          console.error('ステータスコード:', error.response.status);
        }
      } else {
        console.error('予期せぬエラー:', error);
      }
      throw new Error('AIオーバービューの取得に失敗しました');
    }
  }

  /**
   * Google検索の結果からAIオーバービューが含まれているか確認し、含まれている場合は取得します
   * このメソッドは通常の検索APIの結果からpage_tokenを取得して利用します
   * @param query 
   * @returns 
   */
  async searchWithAiOverview(query: string): Promise<AIOverview | null> {
    try {
 
      const searchResponse = await axios.get(this.baseUrl, {
        params: {
          q: query,
          engine: 'google',
          api_key: this.apiKey
        }
      });


      const data = searchResponse.data;
      if (data.ai_overview) {
    
        return data.ai_overview;
      } else if (data.ai_overview_link?.page_token) {
    
        return await this.getAiOverview(data.ai_overview_link.page_token);
      }

      return null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('SerpAPI呼び出しエラー:', error.message);
        if (error.response) {
          console.error('レスポンスデータ:', error.response.data);
          console.error('ステータスコード:', error.response.status);
        }
      } else {
        console.error('予期せぬエラー:', error);
      }
      throw new Error('検索に失敗しました');
    }
  }
} 
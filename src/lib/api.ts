import type { AIOverviewData } from "./types"
import { env } from "./env"

/**
 * SerpAPIを使用してGoogle検索とAI Overviewデータを取得する
 * @param query 検索クエリ
 * @returns 検索結果とAI Overviewデータ
 */
export async function fetchAIOverviewData(query: string): Promise<AIOverviewData> {
  try {
 
    const API_KEY = env.SERPAPI_KEY;
    

    console.log("使用するAPIキー（最初の5文字のみ表示）:", API_KEY.substring(0, 5) + "...");
    console.log("APIキーの長さ:", API_KEY.length);
    
    if (!API_KEY || API_KEY.length < 10) {
      throw new Error("有効なAPIキーが設定されていません。.envファイルを確認してください。");
    }
    
   
    const fetchWithProxy = async (url: string) => {
      try {
   
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
          throw new Error(`Proxy error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return JSON.parse(data.contents);
      } catch (error) {
        console.error("Proxy request failed:", error);
        throw error;
      }
    };
    
    console.log("検索リクエスト実行中...")
    const requestUrl = `https://serpapi.com/search?engine=google&q=${encodeURIComponent(query)}&api_key=${API_KEY}&hl=ja&gl=jp`;
    const searchResults = await fetchWithProxy(requestUrl);
    
    console.log("検索結果取得完了")
 
    console.log("AI Overview存在:", searchResults.ai_overview ? "あり" : "なし");
    if (searchResults.ai_overview) {
      console.log("page_token存在:", searchResults.ai_overview.page_token ? "あり" : "なし");
    }

    if (searchResults.ai_overview && searchResults.ai_overview.page_token) {
      console.log("AI Overview page_token検出: 詳細データを取得中...")
      const pageToken = searchResults.ai_overview.page_token

      const aiOverviewUrl = `https://serpapi.com/search?engine=google_ai_overview&page_token=${pageToken}&api_key=${API_KEY}`;
      const aiOverviewData = await fetchWithProxy(aiOverviewUrl);
      
      console.log("AI Overviewデータ取得完了")


      if (aiOverviewData.ai_overview && aiOverviewData.ai_overview.text_blocks) {
        console.log(`テキストブロック数: ${aiOverviewData.ai_overview.text_blocks.length}`)
      }

      return aiOverviewData
    }


    if (searchResults.ai_overview && searchResults.ai_overview.text_blocks) {
      console.log("AI Overviewデータが検索結果に直接含まれています")
      return {
        search_metadata: searchResults.search_metadata,
        search_parameters: searchResults.search_parameters,
        ai_overview: searchResults.ai_overview,
      }
    }


    console.log("AI Overviewデータが見つかりませんでした。通常の検索結果を返します。")
    return {
      search_metadata: searchResults.search_metadata,
      search_parameters: searchResults.search_parameters,
      no_ai_overview: true,
      search_results: {
        organic_results: searchResults.organic_results || [],
        knowledge_graph: searchResults.knowledge_graph,
        answer_box: searchResults.answer_box,
      },
    }
  } catch (error) {
    console.error("AI Overviewデータの取得中にエラーが発生しました:", error)
    throw error
  }
}


// 環境変数の型定義と取得用のヘルパー関数

/**
 * SerpAPI APIキーを取得する
 * @returns SerpAPI APIキー
 */
export function getSerpApiKey(): string {

  try {

    if (typeof process !== "undefined" && process.env && process.env.REACT_APP_SERPAPI_KEY) {
      console.log("Create React App環境変数からAPIキーを取得しました");
      return process.env.REACT_APP_SERPAPI_KEY;
    }
    
 
    if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SERPAPI_KEY) {
      console.log("Vite環境変数からAPIキーを取得しました");
      return import.meta.env.VITE_SERPAPI_KEY;
    }
  } catch (error) {
    console.warn("環境変数へのアクセスエラー:", error);
  }

  console.error("APIキーが設定されていません。.envファイルにVITE_SERPAPI_KEYまたはREACT_APP_SERPAPI_KEYを設定してください。");
  return "";
}


export const env = {
  SERPAPI_KEY: getSerpApiKey(),
}


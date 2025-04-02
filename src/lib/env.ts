

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


  const workingApiKey = "APIkeyを入れてください入れてください";
  console.warn("環境変数からAPIキーを取得できなかったため、固定のAPIキーを使用します");
  return workingApiKey;
}

export const env = {
  SERPAPI_KEY: getSerpApiKey(),
}


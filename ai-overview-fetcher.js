import fetch from 'node:fetch';

/**
 * Google AI Overview Fetcher
 * This script fetches AI Overview data from Google search results using SerpAPI
 */

// Configuration
const API_KEY = "YOUR_SERPAPI_API_KEY"; // Replace with your actual SerpAPI key

/**
 * Fetches AI Overview data from Google search results
 * @param {string} pageToken - The page token from a previous search
 * @param {string} apiKey - Your SerpAPI API key
 * @returns {Promise<Object>} - The AI Overview data
 */
async function fetchAIOverview(pageToken, apiKey = API_KEY) {
  try {
    const url = new URL("https://serpapi.com/search");
    url.searchParams.append("engine", "google_ai_overview");
    url.searchParams.append("page_token", pageToken);
    url.searchParams.append("api_key", apiKey);
    
    console.log(`🔍 リクエスト送信中... (Sending request...)`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ エラーが発生しました: ${error.message}`);
    throw error;
  }
}

/**
 * Performs a Google search and returns the page token for AI Overview
 * @param {string} query - The search query in Japanese
 * @param {string} apiKey - Your SerpAPI API key
 * @returns {Promise<string>} - The page token for AI Overview
 */
async function getPageTokenFromSearch(query, apiKey = API_KEY) {
  try {
    const url = new URL("https://serpapi.com/search");
    url.searchParams.append("engine", "google");
    url.searchParams.append("q", query);
    url.searchParams.append("hl", "ja"); // Set language to Japanese
    url.searchParams.append("gl", "jp"); // Set location to Japan
    url.searchParams.append("api_key", apiKey);
    
    console.log(`🔍 "${query}" の検索を実行中... (Searching for "${query}"...)`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.ai_overview && data.ai_overview.page_token) {
      return data.ai_overview.page_token;
    } else {
      throw new Error("AI Overview page token not found in search results");
    }
  } catch (error) {
    console.error(`❌ エラーが発生しました: ${error.message}`);
    throw error;
  }
}

/**
 * Formats and displays AI Overview data in Japanese
 * @param {Object} data - The AI Overview data
 */
function displayAIOverview(data) {
  if (!data.ai_overview) {
    console.log("❌ AI Overview データが見つかりませんでした。");
    return;
  }
  
  console.log("\n===== AI Overview 結果 =====\n");
  
  // Display text blocks
  if (data.ai_overview.text_blocks) {
    data.ai_overview.text_blocks.forEach((block, index) => {
      if (block.type === "paragraph") {
        console.log(`📝 段落 ${index + 1}:`);
        console.log(block.snippet);
        console.log();
      } else if (block.type === "list") {
        console.log(`📋 リスト ${index + 1}:`);
        block.list.forEach((item, itemIndex) => {
          console.log(`  ${itemIndex + 1}. ${item.title || ''}`);
          if (item.snippet) {
            console.log(`     ${item.snippet}`);
          }
        });
        console.log();
      }
    });
  }
  
  // Display references
  if (data.ai_overview.references) {
    console.log("📚 参考文献:");
    data.ai_overview.references.forEach((ref, index) => {
      console.log(`  ${index + 1}. ${ref.title}`);
      console.log(`     出典: ${ref.source}`);
      console.log(`     リンク: ${ref.link}`);
      console.log();
    });
  }
}

/**
 * Main function to search and fetch AI Overview
 * @param {string} query - The search query in Japanese
 */
async function getAIOverviewForQuery(query) {
  try {
    // First get the page token from a regular search
    const pageToken = await getPageTokenFromSearch(query);
    console.log(`✅ ページトークンを取得しました (Page token acquired)`);
    
    // Then use the page token to fetch AI Overview
    const aiOverviewData = await fetchAIOverview(pageToken);
    console.log(`✅ AI Overview データを取得しました (AI Overview data acquired)`);
    
    // Display the results
    displayAIOverview(aiOverviewData);
    
    return aiOverviewData;
  } catch (error) {
    console.error(`❌ 処理中にエラーが発生しました: ${error.message}`);
  }
}

// Example usage
const searchQuery = "人工知能とは何ですか"; // "What is artificial intelligence?" in Japanese
console.log(`🤖 Google AI Overview 取得ツール`);
console.log(`検索クエリ: "${searchQuery}"`);

getAIOverviewForQuery(searchQuery);


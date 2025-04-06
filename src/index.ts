import dotenv from 'dotenv';
import { SerpApiClient } from './serpApiClient';
import { AIOverview } from './types';


dotenv.config();


const apiKey = process.env.SERPAPI_KEY;

if (!apiKey) {
  console.error('環境変数SERPAPI_KEYが設定されていません');
  process.exit(1);
}


const serpApiClient = new SerpApiClient(apiKey);


function displayAiOverview(aiOverview: AIOverview): void {
  console.log('==== AIオーバービューの内容 ====');
  

  aiOverview.text_blocks.forEach((block, index) => {
    console.log(`\n[ブロック ${index + 1}]`);
    
    if (block.type === 'paragraph') {
      console.log(block.snippet);
      console.log(`参照インデックス: ${block.reference_indexes.join(', ')}`);
    } else if (block.type === 'list' && 'list' in block) {
      console.log('リスト:');
      block.list.forEach((item, itemIndex) => {
        console.log(`  ${itemIndex + 1}. ${item.title ? `【${item.title}】` : ''} ${item.snippet}`);
        console.log(`     参照インデックス: ${item.reference_indexes.join(', ')}`);
      });
    }
  });
  
  if (aiOverview.thumbnail) {
    console.log('\n[サムネイル]');
    console.log(aiOverview.thumbnail);
  }

  console.log('\n[参照]');
  aiOverview.references.forEach((ref) => {
    console.log(`${ref.index}. ${ref.title} (${ref.source})`);
    console.log(`   リンク: ${ref.link}`);
    if (ref.snippet) {
      console.log(`   スニペット: ${ref.snippet}`);
    }
    console.log('');
  });
}

async function main(): Promise<void> {
  try {

    const args = process.argv.slice(2);
    let query = '';
    let pageToken = '';
    
    if (args.length === 0) {
      console.log('使用方法:');
      console.log('  検索: node dist/index.js --search "検索キーワード"');
      console.log('  ページトークンで取得: node dist/index.js --token "ページトークン"');
      process.exit(0);
    }
    

    for (let i = 0; i < args.length; i += 2) {
      const arg = args[i];
      const value = args[i + 1] || '';
      
      if (arg === '--search' || arg === '-s') {
        query = value;
      } else if (arg === '--token' || arg === '-t') {
        pageToken = value;
      }
    }
    
    let aiOverview: AIOverview | null = null;
    

    if (pageToken) {
      console.log(`ページトークンを使用してAIオーバービューを取得します: ${pageToken.substring(0, 20)}...`);
      aiOverview = await serpApiClient.getAiOverview(pageToken);
    } else if (query) {
      console.log(`"${query}" の検索結果からAIオーバービューを取得します...`);
      aiOverview = await serpApiClient.searchWithAiOverview(query);
    } else {
      console.error('検索キーワードまたはページトークンを指定してください');
      process.exit(1);
    }
    

    if (aiOverview) {
      displayAiOverview(aiOverview);
    } else {
      console.log('AIオーバービューが見つかりませんでした');
    }
  } catch (error) {
    console.error('エラーが発生しました:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('予期せぬエラーが発生しました:', error instanceof Error ? error.message : String(error));
  process.exit(1);
}); 
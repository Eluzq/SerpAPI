import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { SerpApiClient } from './serpApiClient';
import { AIOverview } from './types';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.SERPAPI_KEY;

if (!apiKey) {
  console.error('環境変数 SERPAPI_KEY が設定されていません。');
  process.exit(1);
}


const serpApiClient = new SerpApiClient(apiKey);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
  const query = req.query.query as string;
  let aiOverview: AIOverview | null = null;
  let error: string | null = null;

  if (query) {
    try {
      console.log(`"${query}" の検索結果からAIオーバービューを取得します...`);
      aiOverview = await serpApiClient.searchWithAiOverview(query);
      
      if (!aiOverview) {
        console.log(`"${query}" のAIオーバービューは見つかりませんでした。`);
      }
    } catch (err) {
      console.error('エラーが発生しました:', err);
      error = 'AIオーバービューの取得中にエラーが発生しました。しばらく経ってからもう一度お試しください。';
    }
  }

  res.render('index', {
    query,
    aiOverview,
    error
  });
});


app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
}); 
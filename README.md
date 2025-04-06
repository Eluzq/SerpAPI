# SerpAPI AIオーバービュー抽出ツール

このツールは、SerpAPIを使用してGoogle検索結果からAIオーバービューブロックを抽出するTypeScriptアプリケーションです。コマンドラインインターフェースとウェブインターフェースの両方を提供しています。

## 機能

- Google検索結果からAIオーバービューを抽出
- ページトークンを使用してAIオーバービューを直接取得
- 取得したAIオーバービューの整形表示
- GoogleライクなウェブUIでAIオーバービューを表示

## 前提条件

- Node.js (v14以上)
- npm または yarn

## インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/serpapi-ai-overview.git
cd serpapi-ai-overview

# 依存関係のインストール
npm install

# TypeScriptのコンパイル
npm run build
```

## 環境設定

`.env`ファイルにSerpAPIのAPIキーを設定します。

```
SERPAPI_KEY=あなたのSerpAPIキー
```

## 使用方法

### コマンドラインインターフェース

#### 検索キーワードを使用してAIオーバービューを取得

```bash
node dist/index.js --search "検索キーワード"
```

または簡略形:

```bash
node dist/index.js -s "検索キーワード"
```

#### ページトークンを使用してAIオーバービューを取得

```bash
node dist/index.js --token "ページトークン"
```

または簡略形:

```bash
node dist/index.js -t "ページトークン"
```

### ウェブインターフェース

ウェブインターフェースでは、ブラウザから検索とAIオーバービューの表示ができます。

```bash
# ウェブサーバーを起動
npm run start:web
```

ブラウザで http://localhost:3000 にアクセスして使用します。


## プロジェクト構造

```
.
├── dist/             # コンパイル済みのJavaScriptファイル
├── src/              # ソースコード
│   ├── public/       # 静的ファイル
│   │   └── css/      # CSSファイル
│   ├── views/        # EJSテンプレート
│   ├── index.ts      # CLIアプリケーション
│   ├── webServer.ts  # ウェブサーバー
│   ├── serpApiClient.ts # SerpAPIクライアント
│   └── types.ts      # 型定義
├── .env              # 環境変数
├── package.json      # 依存関係と設定
├── tsconfig.json     # TypeScript設定
└── README.md         # このファイル
```

## カスタマイズ

- `src/public/css/style.css` : UIスタイルのカスタマイズ
- `src/views/index.ejs` : ビューテンプレートのカスタマイズ
- `src/webServer.ts` : サーバーロジックのカスタマイズ


## 注意事項

- SerpAPIの利用には有効なAPIキーが必要です。
- 一部の検索結果にはAIオーバービューが含まれていない場合があります。 
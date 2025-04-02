# Google AI Overview Fetcher

Google検索のAI Overviewデータを取得・表示するReactアプリケーションです。

## プロジェクト概要

このアプリケーションは、Google検索で表示されるAI Overview（AIによる概要）情報を取得し、ユーザーフレンドリーなインターフェースで表示します。SerpAPIを使用してGoogle検索結果を取得し、その中からAI Overviewデータを抽出します。

## 機能

- 検索クエリの入力と送信
- Google検索結果の取得
- AI Overviewデータの表示
- コンテンツとリファレンスをタブで切り替え表示
- レスポンシブデザイン対応

## ファイル構成

```
src/
├── components/            # UIコンポーネント
│   ├── loading-spinner.tsx  # ローディングスピナー
│   ├── search-form.tsx      # 検索フォーム
│   ├── search-results.tsx   # 検索結果表示
│   └── theme-provider.tsx   # テーマプロバイダー
├── hooks/                 # カスタムフック
│   ├── use-mobile.tsx       # モバイル検出フック
│   └── use-toast.ts         # トースト通知フック
├── lib/                   # ユーティリティ
│   ├── api.ts              # API通信関連
│   ├── env.ts              # 環境変数
│   ├── types.ts            # 型定義
│   └── utils.ts            # ユーティリティ関数
├── App.tsx                # メインアプリケーション
├── index.tsx              # エントリーポイント
├── index.css              # グローバルスタイル
└── styles.css             # 追加スタイル
```

## 技術スタック

- React (Create React App)
- TypeScript
- TailwindCSS
- SerpAPI（Google検索API）

## セットアップと実行方法

1. リポジトリをクローン

```bash
git clone https://github.com/your-username/google-ai-overview-fetcher.git
cd google-ai-overview-fetcher
```

2. 依存関係をインストール

```bash
npm install
```

3. 環境変数の設定

`.env`ファイルを作成し、以下の内容を設定：

```
REACT_APP_SERPAPI_KEY=your_serpapi_key_here
```

※SerpAPIキーは[SerpAPI公式サイト](https://serpapi.com/)から取得できます

4. アプリケーションの起動

```bash
npm start
```

ブラウザで `http://localhost:3000` を開くとアプリケーションが表示されます。

## 使用方法

1. 検索フォームに検索クエリを入力します（例：「風邪薬の副作用」）
2. 検索ボタンをクリックします
3. 検索結果が表示され、「コンテンツ」タブでAI Overviewの内容、「参考文献」タブで引用元を確認できます

## 注意事項

- このアプリケーションはSerpAPIの無料利用枠を超えると料金が発生します
- 日本語検索のためには検索クエリに`hl=ja`パラメータを追加しています
- AI Overviewデータが含まれない検索結果の場合は、一部のクエリでモックデータを表示します 
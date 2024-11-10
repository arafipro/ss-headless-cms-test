# 脱 WordPress 超簡単ヘッドレス CMS を作成する

## プロジェクト名

Super Simple Headless CMS

## ディレクトリ名

ss-headless-cms

## 技術スタック

- Bun
- TypeScript
- Hono
- Next.js
- TailwindCSS
- Prisma
- NextAuth
- Cloudflare D1
- Cloudflare Pages

## データベーステーブル

### 投稿テーブル

| カラム名         | 型     | 説明       | キー        |
| ---------------- | ------ | ---------- | ----------- |
| id               | string | ID         | PRIMARY KEY |
| title            | string | タイトル   |             |
| content          | string | 内容       |             |
| created_at       | string | 作成日時   |             |
| updated_at       | string | 更新日時   |             |
| （以下追加予定） |
| categories       | string | カテゴリー |             |
| tags             | string | タグ       |             |

### カテゴリーテーブル（追加予定）

| カラム名             | 型     | 説明         | キー        |
| -------------------- | ------ | ------------ | ----------- |
| category_id          | string | ID           | PRIMARY KEY |
| category_slug        | string | スラッグ     |             |
| category_name        | string | カテゴリー名 |             |
| category_description | string | 説明         |             |

### タグテーブル（追加予定）

| カラム名        | 型     | 説明     | キー        |
| --------------- | ------ | -------- | ----------- |
| tag_id          | string | ID       | PRIMARY KEY |
| tag_slug        | string | スラッグ |             |
| tag_name        | string | タグ名   |             |
| tag_description | string | 説明     |             |

## 今後、追加したい機能

- AI記事自動作成機能

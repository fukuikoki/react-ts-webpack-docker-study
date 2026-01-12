FROM node:20-alpine

WORKDIR /app

# 依存関係を先にコピーしてインストール
COPY app/package*.json ./
RUN npm install

# アプリケーションのコードをコピー
COPY app .

EXPOSE 3000

CMD ["npm", "start"]
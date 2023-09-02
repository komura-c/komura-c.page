---
title: "CloudFunctionsからYouTubeAPIで特定チャンネル動画を取得する"
description: "CloudFunctionsからYouTubeAPIで特定チャンネル動画を取得する"
tags: "CloudFunctions"
pubDate: "2020-09-28 00:00:00 +0900"
heroImage: ""
draft: false
createdDate: "2020-09-28 00:00:00 +0900"
updatedDate: "2020-09-28 00:00:00 +0900"
---

先日9/27に行われた[CAMPのハッカソン](https://to.camp/lesson?v=vtriUBb2KPcOpCUAtljK)にてCloudFunctionsでYouTubeAPIを使った実装をしたので、知見を共有します。

## Cloud Funtions for Firebaseとは
[Cloud Functions](https://to.camp/lesson?v=AgNXUteAmULRSrOT7WwP)を見れば大体の内容は分かります。
大胆に言えば、Node.jsというJavaScript環境をサーバーレス（事前にサーバーを購入するのではなくGoogleの実行環境を利用する）で運用するものです。
[Firebase Cloud Functionを作る](https://to.camp/lesson?v=3A8yYWWRMOrn62aLJQR1)
[Webhookで受け取ったデータでFirestoreを更新する](https://to.camp/lesson?v=NsxvY9KjS5gaKfDjzVIB)を見ればどういう風に実装していけばいいかが大体掴めます。

## YouTubeAPI
[YouTube](https://to.camp/lesson?v=31A9llLVUeVNqKWMJfR9)ここでフロント側での実装方法が分かります。HTTPリクエストというものを送るとJSONという形式でデータが返ってきます。

## 実装
まず、FunctionsからHTTPリクエストを送ろうとして詰まりました。Ninoさんのアドバイスで[node-fetch](https://www.npmjs.com/package/node-fetch)を使えばできると言われましたが、[googleapis](https://www.npmjs.com/package/googleapis)というGoogleAPIを使用するためのライブラリがあったのでそれを使うことにしました。
functionsディレクトリのコンソールでnpm i googleapisをしてインストールします。
その後最初に以下を記述します。
```ts
const { google } = require('googleapis');
google.options({
  headers: {
    "Referer": "https://xxxxx" // YouTubeAPIで制限をかけているリファラー
  },
});
const apiKey = functions.config().youtube.api_key;
const youtube = google.youtube({ version: 'v3', auth: apiKey });
```
googleapisのオプションで[リファラー](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referer)に記述された場所からリクエストを送っているよと指示しています。Cloud Functionsからはデフォルトでリファラーが送られないので、リファラーの記述がないとAPIの認証エラーになります。（ここも詰まりました）その後あらかじめ環境変数に入れたAPIキーを呼び出して、youtubeAPIで使うように引数に入れています。[Firebase Cloud Functionsの環境設定](https://to.camp/lesson?v=vfJwfKMpHpY0gt4BVCcK#Firebase%20Cloud%20Functions%E3%81%AE%E7%92%B0%E5%A2%83%E8%A8%AD%E5%AE%9A)を見ると分かります。
取得処理は以下になります。
```ts
async function getMoviesByChannelId(channelId: string, nextPageToken?: string) {
  youtube.search.list({ // ここの引数でAPIのオプションを指定している
    part: 'snippet',
    channelId,
    maxResults: 50, // 一回のリクエストでは最大50件しか返ってこない
    order: `viewCount`,
    type: `video`,
    videoEmbeddable: true,
    videoSyndicated: true,
    pageToken: nextPageToken ? nextPageToken : '',
  })
    .then(async (response: any) => {
      const resData: {
        "nextPageToken": string,
        "items": [] // ここに動画データの配列が入る
      } = response.data;
      const videos: [] = resData.items;
      await createVideos(videos, channelId);
      const nextToken = response.data?.nextPageToken; // 次リクエストのトークンがあれば入れる
      if (nextToken) {
        await getMoviesByChannelId(channelId, nextToken); // 次リクエストのトークンがあればもう一度実行する
      }
      return;
    })
    .catch((error: any) => {
      functions.logger.warn(error);
      return;
    });
}
```
今回の設計ではフロント側でAPIを使って保存したChannelIdを利用してチャンネル動画を保存する処理をしています。特に、nextTokenを用いて再帰（その関数自体を実行する）処理をするところがポイントです。createVideosという関数内でFirestoreに保存しています。

## コード
[youtube-room/functions/src/room-videos.function.ts](https://github.com/camp-team/youtube-room/blob/master/functions/src/room-videos.function.ts)
こうリファクタリングした方がよいなどご指摘をお待ちしております。
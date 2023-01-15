---
layout: "../../layouts/BlogPost.astro"
title: "CloudFunctionsから上限までツイート保存"
description: "CloudFunctionsから上限までツイート保存"
tags: "CloudFunctions"
pubDate: "2020-09-29 00:00:00 +0900"
heroImage: ""
draft: false
createdDate: "2020-09-29 00:00:00 +0900"
updatedDate: "2020-09-29 00:00:00 +0900"
---

[CloudFunctionsからYouTubeAPIで特定チャンネル動画を取得する](https://to.camp/lesson?v=wwWte5geeyIB0VHMuWx3)のハッカソンでTwitterAPIの実装も行ったので共有します。
[Twitter APIを使う](https://to.camp/lesson?v=idvdkzDRzEzlcnlz8VoE)で大体分かります。

## ツイートの保存
サンプルコードは以下です。
```ts
async function saveUserTweet(uid: string) { // Firestoreのuidを渡す
  const twitterData = (await db
    .doc(`private/${uid}`)
    .get()).data(); // Firestoreからあらかじめ保存したTwitterのユーザートークンを取得
  if (twitterData) {
    const twitterClient = new Twitter({
      consumer_key: config.twitter.consumer_key, // TwitterAPIのAPPにあるものを環境変数に入れておき、ここで入れる
      consumer_secret: config.twitter.secret_key,
      access_token_key: twitterData.access_token_key, // ユーザートークンを入れる
      access_token_secret: twitterData.access_token_secret
    });
    const twitterUid = twitterData.twitterUid; // あらかじめ保存したTwitterのuidを取得
    return getTweetAndSave(twitterClient, twitterUid, uid);
  } else {
    throw new Error('認証に失敗しました');
  }
};
async function getTweetAndSave(twitterUid: string, uid: string, next_id?: number) {
  let params;
  if (next_id) {
    params = {
      user_id: twitterUid,
      max_id: next_id, // ここが空だと何も返ってこないため、冗長的な記述
      count: 200, // 一回のリクエストで最大200件まで取得できます
      exclude_replies: true,
      include_rts: false,
    }
  } else {
    params = {
      user_id: twitterUid,
      count: 200,
      exclude_replies: true,
      include_rts: false,
    }
  }
  await twitterClient.get('statuses/user_timeline', params)
    .then(async (tweets) => {
      const nextTweetId = +tweets[tweets.length - 1]?.id_str - 1; //　最後のTweetIdの一つ前のIdにする
      const batch = db.batch();
      tweets.forEach((tweetContent: {
        id_str: string,
        favorite_count: number,
        retweeted: boolean,
      }) => {
        const tweetId = tweetContent.id_str; // ツイートのIdは.idでも取れるが、JavaScriptによって数値が勝手にまるめられてしまうため、stringの方を取得
        const likeCount = tweetContent.favorite_count;
        const tweetRef = db.doc(`private/${uid}/tweets/${tweetId}`);
        batch.set(tweetRef, {
          tweetId,
          likeCount,
        });
      });
      await batch.commit(); // バッチ処理で書き込む
      if (tweets.length) { // 返ってきたツイートの配列が空でなければ次を取得
        await getTweetAndSave(twitterClient, twitterUid, uid, nextTweetId);
      }
      return;
    }).catch((error) => {
      throw error;
    });
}
```
特に、max_idの記述が詰まりました。max_idは指定されたツイートIdより過去のツイートを取得できるのですが、APIの仕様？によってmax_idを指定しているのに空だと空の配列が返ってきます。そのため、次のnextTweetIdがあればmax_idを指定する形にしています。また、APIの仕様で次のリクエストではmax_idで指定したツイートから取得するため、最後のツイートIdを指定するとそのツイートを重複して取得することになります。そのため、数値に-1することで、次に取得するべきツイートIdを指定しています。

## コード
[twitter-project/functions/src/user.function.ts](https://github.com/camp-team/twitter-project/blob/master/functions/src/user.function.ts)
こうリファクタリングした方がよいなどご指摘をお待ちしております。

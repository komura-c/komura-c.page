<template>
  <div id="posts">
    <div class="container">
      <div class="heading">
        <h2 class="heading__title">Posts</h2>
      </div>
      <div class="posts">
        <a
          v-for="post in postList"
          :key="post.title"
          :href="post.URL"
          target="_blank"
          rel="noopener noreferrer"
          class="post-card"
        >
          <h3 class="post-card__title">{{ post.title }}</h3>
          <p class="post-card__date">{{ post.updatedAt }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const postList = [
  {
    title: "AngularのメタフレームワークAnalogを試す",
    URL: "https://zenn.dev/komura_c/articles/455b4a79c6d534",
    updatedAt: "2022-12-12",
  },
  {
    title: "オーディオ波形動画を生成するWebぺージの作り方",
    URL: "https://tech-blog.voicy.jp/entry/2022/12/11/235929",
    updatedAt: "2022-12-11",
  },
  {
    title: "Angular 無限スクロール実装 3選",
    URL: "https://tech-blog.voicy.jp/entry/2022/11/24/103519",
    updatedAt: "2022-11-24",
  },
  {
    title: "AngularでWebWorkerを使ったバックグラウンドで生きるSetInterval",
    URL: "https://komura-c.hatenablog.com/entry/2022/08/01/103853",
    updatedAt: "2022-08-01",
  },
  {
    title: "ffmpeg.wasmをブラウザ上で動かしてみた",
    URL: "https://tech-blog.voicy.jp/entry/2022/07/19/101954",
    updatedAt: "2022-07-19",
  },
  {
    title: "Web Speech APIの音声認識を使ってWebページを作ってみる",
    URL: "https://tech-blog.voicy.jp/entry/2021/12/13/053054",
    updatedAt: "2021-12-13",
  },
  {
    title: "AngularでブラウザURLを扱う",
    URL: "https://qiita.com/komura_c/items/28ffc5ba38cba5fbe9c9",
    updatedAt: "2020-08-14",
  },
  {
    title: "Angularで特定のルートにデータを持たせる",
    URL: "https://qiita.com/komura_c/items/3540474f29c53429f8d1",
    updatedAt: "2020-08-08",
  },
];
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.post-card {
  color: #333;
  background-color: #fff;
  box-shadow: 0 18px 45px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  width: 48%;
  margin-bottom: 24px;
  padding: 24px;
  transition: 0.3s;
  @include tab {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 18px 45px 0 rgba(0, 0, 0, 0.24);
  }
  &__title {
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 1.2px;
    margin-bottom: 12px;
  }
  &__date {
    font-size: 14px;
    letter-spacing: 1.2px;
  }
}
</style>

<template>
  <div id="musics">
    <div class="container">
      <div class="heading">
        <h2 class="heading__title">Musics</h2>
      </div>
      <div class="musics">
        <div v-for="music in musicList" :key="music.title" class="music-card">
          <iframe
            :title="music.title"
            width="100%"
            height="200"
            scrolling="no"
            frameborder="no"
            :src="
              'https://w.soundcloud.com/player/?url=' +
              music.URL +
              '&color=%23ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true'
            "
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const musicList = [
  {
    title: "StarTrip",
    URL: "https%3A//api.soundcloud.com/tracks/524995878",
  },
  {
    title: "CarryMe",
    URL: "https%3A//api.soundcloud.com/tracks/524995476",
  },
];
</script>

<style lang="scss" scoped>
.music-card {
  color: #333;
  background-color: #fff;
  box-shadow: 0 18px 45px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  width: 100%;
  margin-bottom: 24px;
  padding: 8px;
}
</style>

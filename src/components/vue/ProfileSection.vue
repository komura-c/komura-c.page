<template>
  <div id="top" class="bg-top">
    <div class="profile-card fade">
      <div class="profile-card__img-wrapper">
        <img
          src="~assets/images/self.jpg"
          alt="komura-c"
          class="profile-card__img"
          loading="lazy"
        />
      </div>
      <div class="profile-card__info">
        <h1 class="profile-card__name">komura-c (Yuki Ishii)</h1>
        <div class="profile-card__description">
          <p>Work: Web Engineer</p>
          <p>Interests: Web Frontend Dev / 音楽 / 音声</p>
          <p>
            Contacts:
            <a
              href="https://twitter.com/komura_c"
              target="_blank"
              rel="noopener noreferrer"
              >Twitter</a
            >
            /
            <a
              href="mailto:komura_334@yahoo.co.jp"
              target="_blank"
              rel="noopener noreferrer"
              >メール</a
            >
          </p>
        </div>
        <div class="social-buttons">
          <a
            v-for="socialButton in socialButtons"
            :key="socialButton.name"
            :href="socialButton.URL"
            target="_blank"
            rel="noopener noreferrer"
            class="social-buttons__link"
            ><img
              :src="require(`~/assets/images/${socialButton.img}`)"
              :alt="socialButton.name"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const socialButtons = [
  {
    name: "twitter",
    URL: "https://twitter.com/komura_c",
    img: "twitter-icon.svg",
  },
  {
    name: "github",
    URL: "https://github.com/komura-c",
    img: "github-icon.svg",
  },
  {
    name: "hatena",
    URL: "https://komura-c.hatenablog.com/",
    img: "hatena-icon.svg",
  },
  {
    name: "qiita",
    URL: "https://qiita.com/komura_c",
    img: "qiita-icon.png",
  },
  {
    name: "soundcloud",
    URL: "https://soundcloud.com/komura_c",
    img: "soundcloud-icon.png",
  },
];
</script>

<style lang="scss" scoped>
.bg-top {
  position: relative;
  background-color: #fbbf5d;
  height: 450px;
  padding-top: 8em;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 80%;
    height: 50%;
    background-color: #f4f4f7;
    transform: skewY(-6deg);
    z-index: -1;
  }
}

.profile-card {
  max-width: 600px;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  &__img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
  }
  &__img-wrapper {
    width: 150px;
    height: 150px;
    margin-top: -70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      -45deg,
      rgb(255, 166, 73),
      rgb(247, 100, 91),
      rgb(128, 94, 212)
    );
    box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.08);
  }
  &__info {
    padding: 16px;
  }
  &__name {
    text-align: center;
    font-size: 28px;
    margin-bottom: 16px;
  }
  &__description {
    padding: 16px 24px;
    background-color: #339af0;
    color: #fff;
    border-radius: 10px;
    letter-spacing: 1.2px;
    margin-bottom: 16px;
    a {
      color: #fff;
      font-weight: bold;
      text-decoration: underline;
      transition-duration: 0.3s;
      &:hover {
        opacity: 0.5;
      }
    }
  }
}

.social-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  &__link {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    transition-duration: 0.3s;
    &:hover {
      opacity: 0.5;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>

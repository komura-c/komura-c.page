<template>
  <header class="header">
    <div class="nav-bar fade">
      <ul class="nav-list">
        <li
          v-for="navItem in navList"
          :key="navItem.anchor"
          class="nav-list__item"
        >
          <nuxt-link
            v-scroll-to="'#' + navItem.anchor"
            to
            class="nav-list__link"
          >
            {{ navItem.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
const navList = [
  {
    name: "Top",
    anchor: "top",
  },
  {
    name: "Products",
    anchor: "products",
  },
  {
    name: "Posts",
    anchor: "posts",
  },
  {
    name: "Musics",
    anchor: "musics",
  },
];
</script>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 3;
}

.nav-bar {
  max-width: 800px;
  background-color: #fff;
  margin: 24px auto;
  padding: 12px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.08);
  border-radius: 40px;
}

.nav-list {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  &__link {
    color: #333;
    text-decoration: none;
    transition-duration: 0.3s;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>

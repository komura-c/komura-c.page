<template>
  <div class="scroll-guide">
    <p class="scroll-guide__text">Scroll</p>
    <nuxt-link
      v-scroll-to="'#products'"
      to
      class="scroll-guide__anchor"
      aria-label="スクロールする"
    >
      <span class="scroll-guide__icon"></span
    ></nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.scroll-guide {
  margin: 24px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__text {
    font-size: 20px;
    letter-spacing: 1.2px;
    z-index: 2;
  }
  &__anchor {
    position: relative;
    margin-top: 4px;
    z-index: 2;
  }
  &__icon {
    position: absolute;
    width: 40px;
    height: 40px;
    margin-left: -21px;
    border: 1px solid #333;
    border-radius: 100%;
    transform: rotate(-45deg);
    transition-duration: 0.3s;
    animation: scroll-guide-anim 3s infinite;
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      content: "";
      width: 16px;
      height: 16px;
      margin: -10px 0 0 -6px;
      border-left: 1px solid #333;
      border-bottom: 1px solid #333;
    }
    &:hover {
      opacity: 0.5;
    }
  }
}

@keyframes scroll-guide-anim {
  0% {
    transform: rotate(-45deg) translate(0, 0);
  }
  20% {
    transform: rotate(-45deg) translate(-8px, 8px);
  }
  40% {
    transform: rotate(-45deg) translate(0, 0);
  }
}
</style>

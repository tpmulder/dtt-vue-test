<template>
  <div class="character-card">
    <div class="fs-game-card">
      <router-link :to="`/character/${character.id}`">
        <div class="fs-game-card__cover" :style="contentStyling">
          <div class="text-area head-text">
            <!-- TODO: Find a better solution! -->
            {{ character.name.split("(")[0] }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const contentStyling = {
      backgroundImage: `url(${props.character.img_url})`
    };

    return {
      contentStyling
    };
  }
});
</script>

<style lang="scss" scoped>
// Colours

$c_0: #000000;
$c_1: #353540;

.character-card {
  width: 300px;
  margin: 10px;
  font-size: 1.3rem;
}

@media (max-width: 760px) {
  .character-card {
    width: 150px;
    font-size: 0.65rem;

    .fs-game-card {
      .text-area {
        left: 5px;
        bottom: 5px;
      }
    }
  }
}

.fs-game-card {
  position: relative;
  z-index: 1;
  width: 100%;
  padding-bottom: 100%;
  perspective: 1000px;
  cursor: pointer;

  &__cover {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    background-size: cover;
    perspective-origin: 50% 50%;
    transform-style: preserve-3d;
    transform-origin: top center;
    will-change: transform;
    transform: skewX(0.001deg);
    transition: transform 0.35s ease-in-out;

    .text-area {
      position: absolute;
      left: 10px;
      bottom: 10px;
      color: whitesmoke;
    }

    &::before {
      display: block;
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 77%;
      height: 20%;
      background: rgba(153, 133, 207, 1);
      border-top-right-radius: 100%;
    }

    // Gloss

    &::after {
      display: block;
      content: "";
      position: absolute;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 120%;
      background: linear-gradient(
        226deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0.4) 35%,
        rgba(255, 255, 255, 0.2) 42%,
        rgba(255, 255, 255, 0) 60%
      );
      transform: translateY(-20%);
      will-change: transform;
      transition: transform 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);
    }
  }

  &:hover &__cover {
    transform: rotateX(7deg) translateY(-6px);

    &::after {
      transform: translateY(0%);
    }
  }

  // Shadows

  &::before {
    display: block;
    content: "";
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    background: rgba($c_0, 0.5);
    box-shadow: 0 6px 12px 12px rgba($c_0, 0.4);
    will-change: opacity;
    transform-origin: top center;
    transform: skewX(0.001deg);
    transition: transform 0.35s ease-in-out, opacity 0.5s ease-in-out;
  }

  &:hover::before {
    opacity: 0.6;
    transform: rotateX(7deg) translateY(-6px) scale(1.05);
  }
}
</style>

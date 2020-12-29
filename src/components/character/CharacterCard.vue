<template>
  <div class="character-card">
    <div class="card">
      <router-link :to="`/character/${character.id}`">
        <div
          class="card-cover"
          :style="{ backgroundImage: `url(${character.img_url})` }"
        >
          <div class="text-area head-text">
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
  name: "CharacterCard",
  props: {
    character: {
      type: Object,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.character-card {
  width: 300px;
  margin: 10px;
  transition: width 0.2s ease-in-out;
}

@media (max-width: $tablet) {
  .character-card {
    width: 150px;

    .card {
      .text-area {
        left: 5px;
        bottom: 5px;
        font-size: 0.65rem;
      }
    }
  }
}

@media (max-width: $mobile) {
  .character-card {
    width: 120px;

    .card {
      .text-area {
        font-size: 0.5rem;
      }
    }
  }
}
</style>

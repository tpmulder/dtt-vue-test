<template>
  <div class="container passport">
    <div class="passport-img block">
      <img class="fluid" :alt="character.name" :src="character.img_url" />
    </div>
    <div class="passport-info block">
      <div class="container info-group">
        <label>Name: </label>
        <label>{{ character.name }}</label>
      </div>
      <div class="container info-group">
        <label>Status: </label>
        <label>{{ character.status }}</label>
      </div>
      <div class="container info-group">
        <label>Species: </label>
        <label>
          {{ character.species !== undefined ? character.species : "mistery" }}
        </label>
      </div>
      <div class="container info-group">
        <label>Gender: </label>
        <label>{{ character.gender }}</label>
      </div>
      <div class="container info-group">
        <label>Origin: </label>
        <label>{{ character.origin }}</label>
      </div>
      <div class="container info-group">
        <label>Hair colour: </label>
        <label>{{ character.hair }}</label>
      </div>
    </div>
    <div class="passport-details block">
      <div class="container info-group">
        <label>Aliases: </label>
        <label v-if="character.alias < 1">None</label>
        <label
          v-else
          class="array-label"
          v-for="alias in character.alias"
          :key="alias"
        >
          - {{ alias }}
        </label>
      </div>
      <div class="container info-group">
        <label>Abilities: </label>
        <label v-if="character.abilities < 1">None</label>
        <label
          v-else
          class="array-label"
          v-for="ability in character.abilities"
          :key="ability"
        >
          - {{ ability }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CharacterPassport",
  props: {
    character: {
      type: Object,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.passport {
  color: $text-light;
  background: $color-2;
  padding: 20px;
  border: 2px solid $primary-color;
  border-radius: 50px;
  max-width: 800px;
  justify-content: left;

  label {
    margin: 0 10px;
  }

  .info-group {
    justify-content: left;
    margin: 10px 0;
    border-bottom: 1px solid $color-4;
  }

  .passport-img {
    margin: 20px;
    border-radius: 50px;
    flex-basis: 33%;

    img {
      border-radius: 50px;
    }
  }

  .passport-info {
    flex-basis: 61%;
  }

  .passport-details {
    flex-basis: 100%;

    .array-label {
      text-align: left;
      flex-basis: 100%;
    }
  }

  @media (min-width: $tablet) {
    font-size: 1.3rem;
  }

  @media (max-width: $tablet) {
    .passport-img {
      flex-basis: 100%;
    }

    .passport-info {
      flex-basis: 100%;
    }
  }
}
</style>

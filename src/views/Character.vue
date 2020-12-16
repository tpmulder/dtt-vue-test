<template>
  <div id="character">
    <CharacterInfo :id="id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharacterInfo from "@/components/character/CharacterInfo.vue";

export default defineComponent({
  name: "Character",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    CharacterInfo
  }
});
</script>

<style lang="scss" scoped>
#character {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>

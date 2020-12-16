<template>
  <div id="characters">
    <CharacterList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CharacterList from "@/components/character/CharacterList.vue";

export default defineComponent({
  name: "Characters",
  components: {
    CharacterList
  }
});
</script>

<style lang="scss" scoped>
#characters {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
</style>

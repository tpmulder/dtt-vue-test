<template>
  <div id="app">
    <component :is="layout">
      <router-view :layout="layout" />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "@/layouts/AppLayout.vue";

export default defineComponent({
  name: "App",
  components: AppLayout,
  setup() {
    return {
      layout: AppLayout
    };
  }
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap");
@import "@/assets/_globalStyles.scss";
</style>

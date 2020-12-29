<template>
  <div id="sitemap" class="container page">
    <ul>
      <h1 class="spacing head-text">Sitemap</h1>
      <li v-for="route in routes" :key="route.path">
        <router-link class="link" :to="route.path">{{
          route.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import VueRouterSitemap from "vue-router-sitemap";
import router from "@/router";

export default defineComponent({
  name: "SiteMap",
  setup() {
    onMounted(() => {
      document.getElementById("main-content")?.scrollIntoView();
    });

    // generates a sitemap for the application
    const sitemap = new VueRouterSitemap(router).build("");

    return {
      routes: sitemap.paths
    };
  }
});
</script>

<style lang="scss" scoped>
#sitemap {
  text-align: left;
  align-items: flex-start;
}
</style>

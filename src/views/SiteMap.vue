<template>
    <div id="sitemap">
        <ul class="sitemap-list">
            <h1 class="sitemap-header head-text">Sitemap</h1>
            <li v-for="route in routes" :key="route.path">
                <router-link :to="route.path">{{ route.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueRouterSitemap from "vue-router-sitemap";
import router from "@/router"

export default defineComponent({
    setup() {
        const sitemap = new VueRouterSitemap(router).build('http://example.com');

        return {
            routes: sitemap.paths
        }
    }
})
</script>

<style lang="scss" scoped>
#sitemap {
    display: flex;
    width: 100%;
    min-height: calc(100vh - 75px);
    justify-content: center;
    text-align: left;
    flex-wrap: wrap;

    .sitemap-header {
        width: 100%;
        margin: 20px 0 20px 0;
        text-align: center;
    }

    a {
        &:hover {
            color: rgba(131, 77 ,156);
        }
    }
}
</style>
<template>
  <div id="nav-bar" :style="navBarStyles">
    <router-link path="Home" to="/">
      <img class="logo" alt="logo" src="@/assets/Final_Space_Logo.png" />
    </router-link>
    <div class="container toolbar">
      <router-link
        v-for="route in routes"
        :key="route"
        :class="[{ important: route.name === 'Feedback' }, 'btn route-button']"
        :to="route.path"
      >
        {{ route.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  name: "NavBar",
  props: {
    height: {
      type: String
    }
  },
  setup(props) {
    const navBarStyles = {
      height: props.height
    };

    return {
      navBarStyles,
      routes: router
        .getRoutes()
        // don't include dynamic routes & sitemap
        .filter(e => !e.path.includes(":") && !e.path.includes("sitemap"))
    };
  }
});
</script>

<style lang="scss" scoped>
$important-color: #ff4500;

#nav-bar {
  display: flex;
  align-items: center;
  z-index: 50;
  width: 100vw;
  background: $primary-color;
  padding: 10px 20px 10px 20px;
  box-shadow: 0 0 10px 0 $primary-color;

  .route-button {
    padding: 5px 10px 5px 10px;
    text-decoration: none;
    margin: 0 10px 0 10px;
    border-radius: 50px;
    background: $primary-color;
    color: $secondary-color;
    border: 2px solid $secondary-color;

    &.important {
      animation: pulse 2s ease-in-out infinite;

      &:hover,
      &.router-link-active {
        animation: none;
        background: $important-color;
        box-shadow: 0 0 20px $important-color;
        border-color: $primary-color;
      }
    }

    &:hover,
    &.router-link-active {
      background: $secondary-color;
      color: $primary-color;
    }
  }

  .logo {
    height: 70px;
    width: 110px;
    margin-left: 20px;
    margin-right: 20px;
  }

  @media (max-width: $tablet) {
    justify-content: center;

    .toolbar {
      display: none;
    }
  }
}

@keyframes pulse {
  50% {
    background: $important-color;
    color: $primary-color;
    box-shadow: 0 0 20px $important-color;
    border-color: $primary-color;
  }
}
</style>

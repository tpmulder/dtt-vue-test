<template>
  <div id="nav-bar" :style="navBarStyles">
    <router-link to="/">
      <img class="logo" src="@/assets/Final_Space_Logo.png" />
    </router-link>
    <div class="toolbar">
      <div class="routes">
        <router-link
          v-for="route in routes"
          :key="route"
          class="fs-route"
          :to="route.path"
          ><button>{{ route.name }}</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
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
      routes: router.getRoutes().filter(e => {
        if (!e.path.includes(":")) return e;
      })
    };
  }
});
</script>

<style lang="scss" scoped>
#nav-bar {
  display: flex;
  align-items: center;
  z-index: 50;
  position: fixed;
  width: 100vw;
  background: rgba(38, 32, 84);
  padding: 10px 20px 10px 20px;
  box-shadow: 0 0 10px 0 black;

  .logo {
    height: 70px;
    width: 110px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .toolbar {
    display: flex;
    justify-content: center;
    width: 100%;

    .routes {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  }
}

@media (max-width: 760px) {
  #nav-bar {
    justify-content: center;

    .toolbar {
      display: none;
    }
  }
}
</style>

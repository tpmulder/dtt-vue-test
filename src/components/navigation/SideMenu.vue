<template>
  <div id="side-menu" :class="isOpen ? 'is-open' : ''" :style="sideMenuStyles">
    <div class="side-menu-content">
      <router-link
        v-for="route in routes"
        :key="route.name"
        class="head-text"
        :to="route.path"
      >
        <div>
          {{ route.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean
    },
    navBarHeight: {
      type: String
    },
    width: {
      type: String
    }
  },
  setup(props) {
    const sideMenuStyles = {
      top: props.navBarHeight,
      height: `calc(100vh - ${props.navBarHeight})`
    };

    const openedStyles = {
      width: props.width
    };

    return {
      sideMenuStyles,
      openedStyles,
      routes: router.getRoutes().filter(e => {
        if (!e.path.includes(":")) return e;
      })
    };
  }
});
</script>

<style lang="scss" scoped>
#side-menu {
  position: fixed;
  padding: 20px 0 20px 0;
  background: linear-gradient(rgb(40, 46, 134), rgb(38, 31, 83));
  color: whitesmoke;
  box-shadow: 0 0 5px 0 black;
  z-index: 25;
  width: 0;
  transition: all 0.4s ease-in-out 0.2s;

  .side-menu-content {
    margin-top: 100px;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid rgba(38, 31, 83);

    a {
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: whitesmoke;

      &.router-link-active {
        div {
          background: rgba(38, 31, 83);
        }
      }
    }

    div {
      border-bottom: 1px solid rgba(38, 31, 83);
      padding: 20px;
      width: 100%;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: rgba(38, 31, 83);
        transition: all 0.2s ease-in-out;
      }
    }
  }

  &.is-open {
    width: 200px;
    transition: all 0.4s ease-in-out;

    .side-menu-content {
      opacity: 1;
      transition: all 0.2s ease-in-out 0.4s;
    }
  }
}
</style>

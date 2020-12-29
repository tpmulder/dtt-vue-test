<template>
  <div id="app-layout">
    <nav-bar :height="navBarHeight" />
    <side-menu
      :navBarHeight="navBarHeight"
      :width="sideMenuWidth"
      :isOpen="sideMenuIsOpen"
    />
    <button
      @click="toggleMenu"
      :class="[{ 'is-open': sideMenuIsOpen }, 'btn menu-button']"
    >
      <fa-icon icon="arrow-right" />
    </button>
    <div
      :class="[{ 'push-content': sideMenuIsOpen }, 'main-container']"
      :style="mainStyles"
    >
      <main id="main-content">
        <slot />
      </main>
      <footer id="footer" class="container" :style="footerStyles">
        <div class="footer-content block">at least a</div>
        <router-link
          class="btn sitemap-button head-text"
          path="Sitemap"
          to="/sitemap"
        >
          Generated sitemap
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import NavBar from "@/components/navigation/NavBar.vue";
import SideMenu from "@/components/navigation/SideMenu.vue";
import { StoreActionTypes, useTypedStore } from "@/store";

export default defineComponent({
  name: "AppLayout",
  components: {
    NavBar,
    SideMenu
  },
  setup() {
    const store = useTypedStore();
    const sideMenuIsOpen = computed(() => store.getters.getSideMenuState);

    const toggleMenu = () => {
      store.dispatch(StoreActionTypes.SET_SIDE_MENU, !sideMenuIsOpen.value);
    };

    // layout styles
    const navBarHeight = `${75}px`;
    const sideMenuWidth = `${200}px`;
    const footerHeight = `${200}px`;

    const mainStyles = {
      height: `calc(100vh - ${navBarHeight})`,
      overflowY: "scroll",
      overflowX: "hidden"
    };

    const footerStyles = {
      height: footerHeight
    };

    return {
      navBarHeight,
      mainStyles,
      sideMenuWidth,
      sideMenuIsOpen,
      toggleMenu,
      footerStyles
    };
  }
});
</script>

<style lang="scss" scoped>
#app-layout {
  position: relative;

  .main-container {
    background: linear-gradient(
        217deg,
        rgba($color-2, 0.8),
        rgba(255, 0, 0, 0) 70.71%
      ),
      linear-gradient(127deg, rgba($color-1, 0.8), rgba(0, 255, 0, 0) 70.71%),
      linear-gradient(336deg, rgba($color-2, 0.8), rgba(0, 0, 255, 0) 70.71%);
    transition: all 0.4s ease-in-out 0.2s;

    &.push-content {
      padding-left: 200px;
      transition: all 0.4s ease-in-out;
    }
  }

  #footer {
    width: 100%;
    background: $primary-color;
    color: $text-light;
    align-items: center;

    .footer-content {
      margin-bottom: -60px;
    }

    .sitemap-button {
      text-decoration: none;
      padding: 20px;
      background: $color-1;
      border: none;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
      color: $text-light;

      &:focus {
        outline: none;
      }

      &:hover {
        background: rgb(221, 146, 255);
        box-shadow: 0 0 10px rgb(221, 146, 255);
      }
    }
  }

  .menu-button {
    position: absolute;
    left: 20px;
    top: 100px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: none;
    padding: 5px;
    background: $secondary-color;
    color: $color-4;
    transition: all 0.4s ease-in-out 0.2s;
    font-size: 1.3rem;
    z-index: 50;

    &:focus {
      outline: none;
    }

    &:hover {
      top: 95px;
      box-shadow: 0 5px 5px 0 rgba($color-4, 0.5);
      transition: all 0.4s ease-in-out 0.2s, box-shadow 0.2s ease-in-out,
        top 0.2s ease-in-out;
    }

    &.is-open {
      left: 175px;
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
      transition: all 0.4s ease-in-out, box-shadow 0.2s ease-in-out,
        top 0.2s ease-in-out;
    }
  }
}
</style>

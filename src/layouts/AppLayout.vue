<template>
  <div id="app-layout">
    <NavBar :height="navBarHeight" />
    <SideMenu
      :navBarHeight="navBarHeight"
      :width="sideMenuWidth"
      :isOpen="sideMenuIsOpen"
    />
    <button
      @click="toggleMenu"
      :class="[{ 'is-open': sideMenuIsOpen }, 'menu-button']"
    >
      <fa-icon icon="arrow-right" />
    </button>
    <!-- TODO: Find a better solution! -->
    <div :style="{ height: navBarHeight }"></div>
    <div></div>
    <div
      :class="[{ 'push-content': sideMenuIsOpen }, 'main-container']"
      :style="mainStyles"
    >
      <main class="main-content" :style="mainContentStyles">
        <slot />
      </main>
      <footer id="footer" :style="footerStyles">
        <div class="footer-content">
          <div>at least a</div>
          <router-link to="/sitemap"><button class="sitemap-button head-text">Generated sitemap</button></router-link>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import NavBar from "@/components/navigation/NavBar.vue";
import SideMenu from "@/components/navigation/SideMenu.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    NavBar,
    SideMenu
  },
  setup() {
    const store = useStore();
    const sideMenuIsOpen = computed(() => store.state.menuIsOpen);

    const toggleMenu = () => {
      store.commit(!sideMenuIsOpen.value ? "openMenu" : "closeMenu");
    };

    const navBarHeight = `${75}px`;
    const sideMenuWidth = `${200}px`;
    const footerHeight = `${200}px`;

    const mainStyles = {
      height: `calc(100vh - ${navBarHeight})`,
      overflowY: "scroll",
      overflowX: "hidden"
    };

    const mainContentStyles = {
      minHeight: `calc(100vh - ${navBarHeight} - ${footerHeight})`
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
      mainContentStyles,
      footerStyles
    };
  }
});
</script>

<style lang="scss" scoped>
.main-container {
  margin-right: 0;
  padding-right: -5px;
  background: linear-gradient(
      217deg,
      rgba(40, 46, 134, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(131, 77, 156, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(39, 46, 133, 0.8), rgba(0, 0, 255, 0) 70.71%);
  transition: all 0.4s ease-in-out 0.2s;

  &.push-content {
    padding-left: 200px;
    transition: all 0.4s ease-in-out;
  }
}

#footer {
  width: 100%;
  background: rgba(38, 31, 83);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .sitemap-button {
    margin: 20px;
    padding: 20px;
    background: rgba(221, 146, 255, 1);
    border-radius: 50%;
    border: 2px solid rgba(221, 146, 255, 1);
    transition: all 0.2s ease-in-out;
    font-size: 1.3rem;
    color: whitesmoke;
    opacity: 0.9;

    &:focus {
      outline: none;
    }

    &:hover {
      box-shadow: 0 0 10px rgba(221, 146, 255, 1);
      transition: all 0.2s ease-in-out;
      transform: scale(1.2);
      opacity: 1;
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
  background: #9a84d1;
  color: rgba(39, 31, 86);
  transition: all 0.4s ease-in-out 0.2s;
  font-size: 1.3rem;
  z-index: 50;

  &:focus {
    outline: none;
  }

  &:hover {
    top: 95px;
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.5);
    transition: all 0.4s ease-in-out 0.2s, box-shadow 0.2s ease-in-out,
      top 0.2s ease-in-out;
  }

  &.is-open {
    left: 175px;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    transition: all 0.4s ease-in-out, box-shadow 0.2s ease-in-out,
      top 0.2s ease-in-out;

    &:hover {
      color: black;
    }
  }
}
</style>

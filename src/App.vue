<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "@/layouts/AppLayout.vue";

export default defineComponent({
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

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.fs-route {
  margin: 0 20px 0 20px;

  &.router-link-exact-active {
    button {
      background: #9a84d1;
      color: rgba(39, 31, 86);
      transition: all 0.2s ease-in-out;
    }
  }

  button {
    padding: 5px 10px 5px 10px;
    border: 2px solid #9a84d1;
    background: rgba(0, 0, 0, 0);
    transition: all 0.2s ease-in-out;
    border-radius: 20px;
    font-size: 1.3rem;
    color: #9a84d1;
    text-decoration: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  &:hover {
    button {
      background: #9a84d1;
      transition: all 0.2s ease-in-out;
      color: rgba(39, 31, 86);
      transition: all 0.2s ease-in-out;
    }
  }
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: inset 0 0 5px 0 rgba(38, 31, 83);
}

::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(40, 46, 134);
  border-radius: 10px;
}

#app {
  font-family: "Courier Prime", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.head-text {
  font-family: "Montserrat", sans-serif;
}
</style>

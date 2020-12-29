<template>
  <div id="home" class="container">
    <div class="container view introduction">
      <section class="text-field justify block">
        <p>Dear DTT,</p>
        <p>
          Before we get started, I want to thank you for your interest in me. It
          means a lot to me and I am grateful for this opportunity.
        </p>
        <p>
          Although I did not have a lot of experience with Vue, I managed to get
          used to it quickly. The simplicity of this framework truly fascinates
          me, especially if you compare it to other client-side frameworks like
          react or angular.
        </p>
        <p>
          Most of the features and designs in this application were made up
          on-the-go while I was implementing the requirements for the test and
          getting familiar with Vue. I purposely changed between stylings a bit
          to show you my ability to handle different situations.
        </p>
        <p>
          I tried to avoid using external (styling) libraries to give you the
          most accurate representation of my own skills. I also used Vue 3 (I
          really dig the new composition api) and implemented more advanced
          features such as a dynamic layout and a store with Vuex 4 to show you
          that I really dived into it.
        </p>
      </section>
      <div class="container spacing">
        <button
          @click="() => (devSectionIsOpen = !devSectionIsOpen)"
          class="btn primary-button"
        >
          Let's talk tech!
        </button>
      </div>
      <section
        v-if="devSectionIsOpen"
        class="dev-section container text-field center block"
      >
        <div class="block">
          <h1 class="head-text">Development choices</h1>
          <h4 class="spacing">fonts:</h4>
          <p><span class="head-text">Montserrat</span> & Courier Prime</p>
        </div>
        <div class="devider"></div>
        <div class="block">
          <p>colour palette:</p>
          <img class="fluid" src="../assets/color_palette.png" />
        </div>
        <div class="devider"></div>
        <div class="block">
          <h4 class="spacing">API:</h4>
          <h2 class="head-text link" @click="() => goToApi()">
            https://finalspaceapi.com
          </h2>
          <div class="text-field justify block">
            <p>
              Final space is an animated series on Netflix. I chose this api
              because it did not require any authorization. This way I was able
              to make things like publishing the application to heroku easier.
            </p>
            <p>
              At first, I wanted to use the Leage of Legends api. This api had
              superior documentation and functionality, but the api needed a key
              which had an expiration date of 24 hours. I tried searching for
              another api with better documentation and pagination capabilities,
              but I wanted the api data to include images as well.
            </p>
            <p>
              After quite some time I convinced myself to just stick with it and
              just get all the characters at once and paginate and sort them
              myself. I know that this is a bad practice and not scalable at
              all, but it does show how I would implement pagination and sorting
              myself.
            </p>
          </div>
        </div>
      </section>
      <section class="walkthrough text-field block">
        <h3 class="head-text">Walkthrough: (click on topics)</h3>
        <div class="sum-up">
          <span @click="openMenu" class="link">Menu</span>
          <p>
            - The menu contains a Home button,
            <span class="old">categories</span>
            (characters) button and a random button.
          </p>
          <p>- Menu is fixed while scrolling.</p>
        </div>
        <div class="sum-up">
          <router-link to="/characters" class="link">
            <span class="old">Homepage</span>(characterspage)
          </router-link>
          <p>
            - The <span class="old">homepage</span>(characterspage) shows 10
            records from a public API of choice.
          </p>
          <p>
            - All items should be clickable to link to their detailpage.
          </p>
          <p>- There must be a sorting option.</p>
        </div>
        <div class="sum-up">
          <router-link to="/character/1" class="link">Detailpage</router-link>
          <p>
            - Shows all the details retrieved from the public API regarding the
            selected record.
          </p>
          <p>
            - Detail page shows 3 relevant other items on this page based on
            provided data from the chosen public API.
          </p>
        </div>
        <div class="sum-up">
          <span @click="scrollToFooter" class="link">Footer</span>
          <p>
            - Footer contains at least a generated sitemap. (I had to laugh when
            I read this requirement for the first time. I created the footer for
            my application accordingly)
          </p>
        </div>
        <div class="sum-up">
          <router-link to="/randomize" class="link"
            >Randomizer page</router-link
          >
          <p>
            - Randomizer page shows a random item.
          </p>
          <p>
            - Randomizer page contains a button to show another random item.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { StoreActionTypes, useTypedStore } from "@/store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useTypedStore();

    const devSectionIsOpen = ref(false);

    const scrollToFooter = () =>
      document.getElementById("footer")?.scrollIntoView();

    const goToApi = () => window.open("https://finalspaceapi.com/", "_blank");

    const openMenu = () => store.dispatch(StoreActionTypes.SET_SIDE_MENU, true);

    return {
      scrollToFooter,
      devSectionIsOpen,
      goToApi,
      openMenu
    };
  }
});
</script>

<style lang="scss" scoped>
#home {
  .dev-section {
    animation: fadeIn 0.5s ease-in-out;
  }

  .walkthrough {
    .old {
      text-decoration: line-through;
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<template>
  <div id="home">
    <div class="introduction">
      <section class="intro-section">
        <p>Dear DTT,</p>
        <p>
          Before we get started, I want to thank you for your interest in me. It
          really means a lot to me and I am truly grateful for the opportunity
          you gave me to prove myself.
        </p>
        <p>
          I did not have a lot of experience with Vue before, but I liked
          working with it a lot. The simplicity of this framework truly
          fascinates me, especially if you compare it to other client-side
          frameworks like react or angular.
        </p>
        <p>
          Most of the features and designs in this application were made up
          on-the-go while I was trying to learn about Vue and implement all the
          requirements for the test. I purposely changed between stylings a bit
          to show you my ability to handle different situations. I really hope
          that the application I made is sufficient and that it shows that I am
          capable of working for such an inspiring company like DTT.
        </p>
        <p>
          I tried to avoid using external (styling) libraries to give you the
          most accurate representation of my own skills. I also used Vue 3 (I
          really love the new composition api) and implemented more advanced
          features like a dynamic layout and a store with Vuex 4 to show you
          that I really dived into it.
        </p>
      </section>
      <section class="walkthrough">
        <p class="head-text">Walkthrough: (click on topics)</p>
        <p><span @click="openMenu" class="walkthrough-link">Menu</span></p>
        <p class="sub-item">
          - The menu contains a Home button, <span class="old">categories</span
          ><span class="replacement">(characters)</span> button and a random
          button.
        </p>
        <p class="sub-item">- Menu is fixed while scrolling.</p>
        <p>
          <router-link to="/characters" class="walkthrough-link"
            ><span class="old">Homepage</span>
            <span class="replacement">(characterspage)</span></router-link
          >
        </p>
        <p class="sub-item">
          - The <span class="old">homepage</span>
          <span class="replacement">(characterspage)</span> shows 10 records
          from a public API of choice.
        </p>
        <p class="sub-item">
          - All items should be clickable to link to their detailpage.
        </p>
        <p class="sub-item">- There must be a sorting option.</p>
        <p>
          <router-link to="/character/1" class="walkthrough-link"
            >Detailpage</router-link
          >
        </p>
        <p class="sub-item">
          - Shows all the details retrieved from the public API regarding the
          selected record.
        </p>
        <p class="sub-item">
          - Detail page shows 3 relevant other items on this page based on
          provided data from the chosen public API.
        </p>
        <p>
          <span @click="scrollToFooter" class="walkthrough-link">Footer</span>
        </p>
        <p class="sub-item">
          - Footer contains at least a generated sitemap. (I had to laugh when I
          read this requirement for the first time. I created the footer for my
          application accordingly)
        </p>
        <p>
          <router-link to="/randomize" class="walkthrough-link"
            >Randomizer page</router-link
          >
        </p>
        <p class="sub-item">- Randomizer page shows a random item.</p>
        <p class="sub-item">
          - Randomizer page contains a button to show another random item.
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    const openMenu = () => store.commit("openMenu");

    const scrollToFooter = () =>
      document.getElementById("footer")?.scrollIntoView();

    return {
      openMenu,
      scrollToFooter
    };
  }
});
</script>

<style lang="scss" scoped>
$textColor: rgba(39, 31, 86);
$linkColor: rgba(131, 77, 156);

#home {
  width: 100%;
  min-height: calc(100vh - 75px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: $textColor;
  font-size: 1.1rem;
  text-align: justify;

  .introduction {
    width: 40%;

    @media (max-width: 1500px) {
      width: 60%;
    }

    @media (max-width: 760px) {
      width: 90%;
      font-size: 0.9rem;
    }
  }

  .intro-section {
    p {
      margin: 30px 0 30px 0;
    }

    @media (max-width: 440px) {
      margin-top: 100px;
    }
  }

  .walkthrough {
    // .replacement {
    //   color: rgb(0, 207, 45);
    // }

    .walkthrough-link {
      text-decoration: none;
      color: $linkColor;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        text-shadow: 0 0 5px $linkColor;
        transition: all 0.2s ease-in-out;
      }
    }

    .old {
      // color: rgb(207, 0, 0);
      text-decoration: line-through;
    }

    p {
      &.head-text {
        margin-bottom: 10px;
      }

      &.sub-item {
        margin-left: 20px;
      }
    }
  }
}
</style>

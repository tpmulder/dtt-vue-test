<template>
  <div id="home">
    <div class="introduction">
      <section class="intro-section">
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
      <button
        @click="() => (devSectIsOpen = !devSectIsOpen)"
        class="developer-button head-text"
      >
        Let's talk tech!
      </button>
      <section v-if="devSectIsOpen" :class="['developer-section']">
        <h1 class="developer-header head-text">Development choices</h1>
        <div class="developer-choice fonts">
          <p>fonts:</p>
          <span class="head-text">Montserrat</span>
          <span>Courier Prime</span>
        </div>
        <div class="devider"></div>
        <div class="developer-choice colours">
          <p>colour palette:</p>
          <img class="palette-img" src="../assets/color_palette.png" />
        </div>
        <div class="devider"></div>
        <div class="developer-choice api">
          <p>API:</p>
          <a
            class="head-text api-link"
            alt="final space api"
            href="url(https://finalspaceapi.com/)"
            >https://finalspaceapi.com</a
          >
          <div class="api-description">
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
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    const openMenu = () => store.commit("openMenu");
    const devSectIsOpen = ref(false);

    const scrollToFooter = () =>
      document.getElementById("footer")?.scrollIntoView();

    return {
      openMenu,
      scrollToFooter,
      devSectIsOpen
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

  .text-center {
    text-align: center;
  }

  .palette-img {
    max-width: 100%;
    max-height: 100%;
  }

  .developer-section {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    animation: fadeIn 1s ease-in-out;

    &.hidden {
      transform: scale(0);
      max-height: 600px;
    }

    .devider {
      width: 60%;
      border-bottom: 1px solid $textColor;
    }

    .developer-choice {
      display: flex;
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      margin: 15px 0 15px 0;

      p {
        flex-basis: 100%;
        margin-bottom: 10px;
      }

      .api-link {
        text-decoration: none;
        margin-bottom: 10px;
        color: $linkColor;
      }

      .api-description {
        width: 80%;
        font-size: 0.9rem;

        @media (max-width: 760px) {
          font-size: 0.7rem;
        }
      }
    }

    .fonts {
      span {
        flex-basis: 100%;
      }
    }
  }

  .introduction {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    section {
      flex-basis: 100%;
    }

    .developer-button {
      background: #261f53;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 20px;
      border: 2px solid #834d9c;
      box-shadow: invert 0 0 10px #834d9c;
      color: whitesmoke;
      font-size: 1rem;
      transition: all 0.2s ease-in-out;

      &.active {
        background: #834d9c;
        box-shadow: 0 0 10px #834d9c;
      }

      &:focus {
        outline: none;
      }

      &:hover {
        background: #834d9c;
        transition: all 0.2s ease-in-out;
      }
    }

    @media (max-width: 1500px) {
      width: 60%;
    }

    @media (max-width: 760px) {
      width: 90%;
      font-size: 0.7rem;
    }
  }

  .intro-section {
    p {
      margin: 30px 0 30px 0;
    }

    @media (max-width: 760px) {
      margin-top: 100px;
    }
  }

  .developer-section {
    text-align: center;
    margin-bottom: 40px;
  }

  .walkthrough {
    margin-bottom: 50px;

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

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

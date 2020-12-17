<template>
  <div id="randomize">
    <div class="fs-container">
      <div class="fs-container-header head-text">
        Random character
      </div>
      <div class="fs-container-content">
        <div class="lds-ring" v-if="randomizer.isLoading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="error" v-else-if="randomizer.error != undefined">
          Congrats! You ruined it!<br />(Choose an id between 0 and 41)
        </div>
        <div class="random-content" v-else>
          <div class="flip-card">
            <div class="flip-card-inner"></div>
            <CharacterCard :character="randomizer.character" />
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button @click="() => setCharacter()" class="randomize-button head-text">
        <span>Randomize</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Character from "@/models/character";
import CharacterService from "@/services/CharacterService";
import CharacterCard from "@/components/character/CharacterCard.vue";
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  reactive,
  ref
} from "vue";

type CharacterList = {
  character: Character | null;
  total: number;
  randomIndex: number;
  isLoading: boolean;
  error: Error | null;
};

export default defineComponent({
  name: "Randomize",
  components: {
    CharacterCard
  },
  setup() {
    const randomizer: CharacterList = reactive<CharacterList>({
      character: null,
      total: 0,
      randomIndex: computed<number>(() =>
        Math.round(Math.random() * randomizer.total)
      ) as any,
      isLoading: true,
      error: null
    });

    const setCharacter = async () => {
      try {
        randomizer.isLoading = true;

        const r = Math.round(Math.random() * randomizer.total);
        randomizer.character = await CharacterService.getById(r === 0 ? 1 : r);
      } catch (err) {
        randomizer.error = err;
      } finally {
        randomizer.isLoading = false;
      }
    };

    onMounted(async () => {
      // nasty.. don't try this at home!!
      randomizer.total = (await CharacterService.getAll()).length;
      await setCharacter();
    });

    return {
      randomizer,
      setCharacter
    };
  }
});
</script>

<style lang="scss" scoped>
$radius: 100px;
$c1: rgba(8, 9, 39);
$c2: rgba(153, 133, 207);

#randomize {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .button-container {
    flex-basis: 100%;
  }

  .random-content {
    animation: turn 1s ease-in-out;
  }

  .randomize-button {
    position: relative;
    padding: $radius;
    border-radius: 50%;
    background: linear-gradient(25deg, $c2, $c1);
    animation: pulse 2s linear infinite;
    transition: all 2s ease-in-out;
    border: 1px solid $c2;
    cursor: pointer;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      color: whitesmoke;
      text-shadow: 0 0 10px $c1;
    }

    &:hover {
      span {
        color: $c2;
      }
    }

    &:focus {
      outline: none;
    }
  }

  .fs-container {
    display: flex;
    width: 800px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    background: rgba(38, 30, 85);
    border: 3px solid rgba(133, 77, 156);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

    .fs-container-header {
      width: 100%;
      color: whitesmoke;
      border-bottom: 3px solid rgba(133, 77, 156);
      border-radius: 50%;
      box-shadow: 0 5px 5px 0 #080927;
      padding: 10px;
      z-index: 5;
    }

    .fs-container-content {
      min-height: 325px;
      margin: 20px;
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      background: rgba(8, 9, 39);
      box-shadow: inset 0 0 500px rgba(38, 30, 85);
      border: 1px solid rgba(133, 77, 156);
      border-radius: 20px;
      align-content: center;

      @media (max-width: 760px) {
        min-height: 175px;
      }
    }
  }
}

@keyframes turn {
  0% {
    transform: scale(0) rotate(360deg);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 $c1;
  }
  25% {
    box-shadow: 0 0 300px ($radius / 2) rgba($c1, 0);
  }
  26% {
    box-shadow: 0 0 0 0 $c1;
  }
  46% {
    box-shadow: 0 0 300px ($radius / 2) rgba($c1, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba($c1, 0);
  }
}
</style>

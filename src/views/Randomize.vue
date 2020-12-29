<template>
  <div id="randomize" class="container page">
    <div class="container box">
      <div class="box-header">
        Random character
      </div>
      <div class="box-content">
        <loading-wrapper
          :isLoading="loadingState.isLoading.GET_RANDOM"
          :error="loadingState.error"
        >
          <div>
            <character-card
              v-if="random != null"
              class="random-content"
              :character="random"
            />
          </div>
        </loading-wrapper>
      </div>
    </div>
    <div class="container">
      <button @click="randomize" class="btn randomize-button">
        <span>Randomize</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Character from "@/models/character";
import CharacterCard from "@/components/character/CharacterCard.vue";
import { computed, defineComponent, onMounted, ref } from "vue";
import { StoreActionTypes, useTypedStore } from "@/store";
import LoadingWrapper from "@/components/common/LoadingWrapper.vue";

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
    CharacterCard,
    LoadingWrapper
  },
  setup() {
    // Get store & needed values
    const store = useTypedStore();
    const loadingState = computed(() => store.getters.getLoadingState);
    const random = ref<Character | null>(null);

    const randomize = async () => {
      random.value = await store.dispatch(StoreActionTypes.GET_RANDOM);
    };

    onMounted(async () => {
      await randomize();
    });

    return {
      random,
      loadingState,
      randomize
    };
  }
});
</script>

<style lang="scss" scoped>
$radius: 100px;

#randomize {
  .container {
    &.box {
      max-width: 800px;
    }
  }

  .random-content {
    animation: turn 1s ease-in-out;
  }

  .randomize-button {
    position: relative;
    padding: $radius;
    border-radius: 50%;
    background: linear-gradient(25deg, $secondary-color, $color-4);
    animation: pulse 2s linear infinite;
    border: 1px solid $secondary-color;
    cursor: pointer;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      font-family: $head-font;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      color: $text-light;
      text-shadow: 0 0 10px $color-4;
    }

    &:hover {
      span {
        color: $secondary-color;
      }
    }

    &:focus {
      outline: none;
    }

    @media (max-width: $tablet) {
      padding: $radius / 1.5;

      span {
        font-size: 1rem;
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
    box-shadow: 0 0 0 0 $color-4;
  }
  25% {
    box-shadow: 0 0 300px ($radius / 2) rgba($color-4, 0);
  }
  26% {
    box-shadow: 0 0 0 0 $color-4;
  }
  46% {
    box-shadow: 0 0 300px ($radius / 2) rgba($color-4, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba($color-4, 0);
  }
}
</style>

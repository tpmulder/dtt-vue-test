<template>
  <div class="character-info">
    <div class="lds-ring" v-if="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="error" v-else-if="error != null">
      Congrats! You ruined it!<br />(Choose an id between 0 and 41)
    </div>
    <div class="information" v-else>
      <div class="info-container">
        <div class="avatar-container">
          <img class="avatar" :src="currentCharacter.img_url" />
        </div>
        <div class="personal-info">
          <div class="info-block">
            <div class="info-label">Name:</div>
            <div class="info-label">{{ currentCharacter.name }}</div>
          </div>
          <div class="info-block">
            <div class="info-label">Status:</div>
            <div class="info-label">{{ currentCharacter.status }}</div>
          </div>
          <div class="info-block">
            <div class="info-label">Species:</div>
            <div class="info-label">
              {{
                currentCharacter.species !== undefined
                  ? currentCharacter.species
                  : "mistery"
              }}
            </div>
          </div>
          <div class="info-block">
            <div class="info-label">Gender:</div>
            <div class="info-label">{{ currentCharacter.gender }}</div>
          </div>
          <div class="info-block">
            <div class="info-label">Origin:</div>
            <div class="info-label">{{ currentCharacter.origin }}</div>
          </div>
          <div class="info-block">
            <div class="info-label">Hair colour:</div>
            <div class="info">{{ currentCharacter.hair }}</div>
          </div>
        </div>
        <div class="devider"></div>
        <div class="details">
          <div class="details-block">
            <div class="info-label">Aliases:</div>
            <div class="info-text" v-if="currentCharacter.alias.length < 1">
              None
            </div>
            <div class="info-array" v-else>
              <div
                class="info-text"
                v-for="alias in currentCharacter.alias"
                :key="alias"
              >
                - {{ alias }}
              </div>
            </div>
          </div>
          <div class="details-block">
            <div class="info-label">Abilities:</div>
            <div class="info-text" v-if="currentCharacter.abilities.length < 1">
              None
            </div>
            <div class="info-array" v-else>
              <div
                class="info-text"
                v-for="ability in currentCharacter.abilities"
                :key="ability"
              >
                - {{ ability }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="related-section">
        <div class="related-head">
          {{
            relatedCharacters.length > 0
              ? "Related Characters:"
              : "No related characters"
          }}
        </div>
        <div class="relation-options">
          <button
            v-for="val in availableRelations"
            @click="
              () => {
                relation = val;
                setRelatedCharacters(currentCharacter);
              }
            "
            :class="[
              relation === val ? 'active' : '',
              'sorting-button',
              'head-text'
            ]"
            :key="val"
          >
            {{ val }}
          </button>
        </div>
        <CharacterCard
          v-for="character in relatedCharacters"
          :key="character.id"
          :character="character"
          @click="() => setInfo(character.id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, onMounted, ref } from "vue";
import CharacterService from "@/services/CharacterService";
import Character from "@/models/character";
import CharacterCard from "@/components/character/CharacterCard.vue";
import { CharacterFilterCategories } from "@/common/enums";

export default defineComponent({
  components: { CharacterCard },
  props: {
    id: {
      required: true,
      type: Number
    }
  },
  setup(props) {
    const currentCharacter = ref<Character | null>(null);
    const relatedCharacters = ref<Character[] | null>(null);
    const loading = ref(true);
    const error = ref<Error | null>(null);
    const relation = ref<CharacterFilterCategories>(
      CharacterFilterCategories.species
    );

    const availableRelations = Object.values(CharacterFilterCategories);

    const setRelatedCharacters = async (character: Character) => {
      let key: (item: Character) => string;

      switch (relation.value) {
        case CharacterFilterCategories.gender:
          key = e => e.gender;
          break;
        case CharacterFilterCategories.status:
          key = e => e.status;
          break;
        case CharacterFilterCategories.origin:
          key = e => e.origin;
          break;
        default:
          key = e => e.species;
          break;
      }

      relatedCharacters.value = await CharacterService.getRandomRelatedCharacters(
        character,
        key,
        3
      );
    };

    const setInfo = async (id: number) => {
      loading.value = true;

      try {
        currentCharacter.value = await CharacterService.getById(id);
        if (currentCharacter.value)
          await setRelatedCharacters(currentCharacter.value);
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      setInfo(props.id);
    });

    return {
      currentCharacter,
      relatedCharacters,
      loading,
      error,
      setInfo,
      relation,
      availableRelations,
      setRelatedCharacters
    };
  }
});
</script>

<style lang="scss" scoped>
.character-info {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 75px);
  text-align: left;
  flex-wrap: wrap;
  font-size: 1.5rem;
  color: whitesmoke;

  .sorting-button {
    background: #261f53;
    padding: 20px;
    margin: 10px;
    border-radius: 100%;
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

  .information {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .related-section {
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px 0 20px 0;

    .relation-options {
      flex-basis: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 10px 0 10px 0;
    }

    .related-head {
      text-align: center;
      flex-basis: 100%;
    }
  }

  .error {
    text-align: center;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid #282e86;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #282e86 transparent transparent transparent;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }

      &:nth-child(2) {
        animation-delay: -0.3s;
      }

      &:nth-child(3) {
        animation-delay: -0.15s;
      }

      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }

  .devider {
    width: 100%;
    border-bottom: 1px solid #271f56;
    margin: 10px 0 10px 0;
  }

  .details {
    flex-basis: 100%;
  }

  .details-block {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0 5px 0;

    .info-label {
      margin-right: 20px;
    }
  }

  .info-array {
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;

    div {
      margin-bottom: 5px;
      margin-left: 10px;
      flex-basis: 100%;
    }
  }

  .personal-info {
    flex: 1;
    color: whitesmoke;

    .info-block {
      margin: 5px 0 5px 0;
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      border-bottom: 1px solid #271f56;

      .info-label {
        flex-basis: 50%;

        @media (max-width: 500px) {
          flex-basis: 100%;
        }
      }
    }
  }

  .avatar {
    border-radius: 50px;
    width: 200px;
  }

  .avatar-container {
    text-align: center;
    margin: 0 20px 20px 0;
  }

  @media (max-width: 760px) {
    .avatar-container {
      width: 100%;
    }

    .personal-info {
      margin-bottom: 20px;
    }

    .devider {
      display: none;
    }

    .details-block {
      border-bottom: 1px solid #271f56;
    }

    font-size: 1rem;
  }

  .info-container {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    padding: 30px;
    background: #272e85;
    border: 2px solid #271f56;
    border-radius: 50px;
    max-width: 800px;
  }
}
</style>

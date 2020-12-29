<template>
  <div id="character" class="container page">
    <section class="info spacing">
      <loading-wrapper
        :isLoading="loadingState.isLoading.GET_BY_ID"
        :error="loadingState.error"
      >
        <div>
          <character-passport
            v-if="pageState.currentCharacter"
            :character="pageState.currentCharacter"
          />
        </div>
      </loading-wrapper>
    </section>
    <section class="related container block spacing">
      <div class="container block btn-group">
        <button
          v-for="category in pageState.sortingCategories"
          @click="
            () => {
              pageState.relatedCategory = category;
              getRelatedItems(pageState.currentCharacter, category);
            }
          "
          :class="[
            pageState.relatedCategory === category ? 'active' : '',
            'btn'
          ]"
          :key="category"
        >
          {{ category }}
        </button>
      </div>
      <div class="container block">
        Related characters:
      </div>
      <div class="devider" />
      <div class="block">
        <loading-wrapper
          :isLoading="loadingState.isLoading.GET_RELATED"
          :error="loadingState.error"
        >
          <div class="container block">
            <character-card
              v-for="character in pageState.relatedItems"
              :key="character.id"
              :character="character"
              @click="
                () => {
                  getCharacter(character.id);
                  getRelatedItems(character, pageState.relatedCategory);
                }
              "
            />
          </div>
        </loading-wrapper>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import CharacterPassport from "@/components/character/CharacterPassport.vue";
import CharacterCard from "@/components/character/CharacterCard.vue";
import LoadingWrapper from "@/components/common/LoadingWrapper.vue";
import Character from "@/models/character";
import { StoreActionTypes, useTypedStore } from "@/store";
import { computed, defineComponent, onMounted, reactive } from "vue";

type PageState = {
  relatedCategory: keyof Character;
  sortingCategories: (keyof Character)[];
  currentCharacter: Character | null;
  relatedItems: Character[] | null;
};

export default defineComponent({
  components: {
    CharacterPassport,
    CharacterCard,
    LoadingWrapper
  },
  name: "Character",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useTypedStore();

    // create pagestate
    const pageState = reactive<PageState>({
      relatedCategory: "species",
      sortingCategories: store.getters.getSortingCategories.filter(
        e => e !== "name"
      ) as (keyof Character)[],
      currentCharacter: null,
      relatedItems: []
    });

    // get store loadingstate from store
    const loadingState = computed(() => store.getters.getLoadingState);

    const getCharacter = async (id: number) =>
      (pageState.currentCharacter = await store.dispatch(
        StoreActionTypes.GET_BY_ID,
        id
      ));

    const getRelatedItems = async (
      currentCharacter: Character | null,
      category: keyof Character
    ) => {
      if (currentCharacter != null)
        pageState.relatedItems = await store.dispatch(
          StoreActionTypes.GET_RELATED,
          {
            currentCharacter: currentCharacter,
            category: category,
            relatedItemCount: 3
          }
        );

      return [];
    };

    onMounted(async () => {
      await getCharacter(props.id);
      await getRelatedItems(
        pageState.currentCharacter,
        pageState.relatedCategory
      );
    });

    return {
      loadingState,
      pageState,
      getCharacter,
      getRelatedItems
    };
  }
});
</script>

<style lang="scss" scoped>
#character {
  margin-bottom: 20px;

  .info {
    margin: 0 10px;
  }
}
</style>

<template>
  <div id="characterspage" class="container">
    <div class="container page character-list">
      <loading-wrapper
        :isLoading="loadingState.isLoading.SET_CHARACTERS"
        :error="loadingState.error"
      >
        <div class="container list-content">
          <div class="container btn-group">
            <button
              v-for="category in sortingCategories"
              @click="() => onChangeSorting(category)"
              :class="[pageState.sortBy === category ? 'active' : '', 'btn']"
              :key="category"
            >
              {{ category }}
              <fa-icon
                icon="sort-up"
                :class="[
                  pageState.sortOrder === '' ? '' : 'desc',
                  'sorting-icon'
                ]"
              ></fa-icon>
            </button>
          </div>
          <character-card
            v-for="character in characterList.items"
            :key="character.id"
            :character="character"
          />
          <div class="pagination">
            <fa-icon
              icon="chevron-left"
              @click="() => (pageState.pageNumber -= 1)"
              :class="[
                characterList.hasPrevious ? '' : 'disabled',
                'btn pagination-button'
              ]"
            />
            {{ characterList.pageNumber }}/{{ characterList.totalPages }}
            <fa-icon
              icon="chevron-right"
              @click="() => (pageState.pageNumber += 1)"
              :class="[
                characterList.hasNext ? '' : 'disabled',
                'btn pagination-button'
              ]"
            />
          </div>
        </div>
      </loading-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
import { StoreActionTypes, useTypedStore } from "@/store";
import CharacterCard from "@/components/character/CharacterCard.vue";
import Character from "@/models/character";
import LoadingWrapper from "@/components/common/LoadingWrapper.vue";

// define state of page
type PageState = {
  pageNumber: number;
  pageSize: number;
  sortBy: keyof Character;
  sortOrder: string;
};

export default defineComponent({
  name: "Characters",
  components: {
    CharacterCard,
    LoadingWrapper
  },
  setup() {
    // Get store
    const store = useTypedStore();
    const sortingCategories = store.getters.getSortingCategories;

    // Init state of page
    const pageState = reactive<PageState>({
      pageNumber: 1,
      pageSize: 10,
      sortBy: sortingCategories[0],
      sortOrder: ""
    });

    // Computed = life
    const characterList = computed(() => store.getters.getPaged(pageState));
    const loadingState = computed(() => store.getters.getLoadingState);

    onMounted(async () => {
      // Load all characters in store -> returns void
      await store.dispatch(StoreActionTypes.SET_CHARACTERS);
    });

    // Change sorting
    const onChangeSorting = (category: keyof Character) => {
      if (category === pageState.sortBy)
        pageState.sortOrder = pageState.sortOrder === "" ? "desc" : "";
      else pageState.sortOrder = "";

      pageState.sortBy = category;
    };

    return {
      pageState,
      onChangeSorting,
      characterList,
      sortingCategories,
      loadingState
    };
  }
});
</script>

<style lang="scss" scoped>
#characterspage {
  .character-list {
    max-width: 1300px;
  }
}
</style>

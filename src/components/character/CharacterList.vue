<template>
  <div id="character-list">
    <div class="sorting">
      <div class="button-group">
        <button
          @click="isPaged = true"
          :class="[isPaged ? 'active' : '', 'sort-button']"
        >
          Paged
        </button>
        <button
          @click="isPaged = false"
          :class="[isPaged ? '' : 'active', 'sort-button']"
        >
          Sorted
        </button>
      </div>
    </div>
    <div class="list-content">
      <div class="paged-list" v-if="isPaged">
        <CharacterCard
          v-for="character in items"
          :key="character.id"
          :character="character"
        />
        <div class="pagination">
          <fa-icon
            icon="chevron-left"
            @click="() => changeData(false)"
            :class="[currentPage <= 1 ? 'disabled' : '', 'pagination-icon']"
          />
          <div class="page-counter">{{ currentPage }}/{{ maxPage }}</div>
          <fa-icon
            icon="chevron-right"
            @click="() => changeData(true)"
            :class="[currentPage >= 4 ? 'disabled' : '', 'pagination-icon']"
          />
        </div>
      </div>
      <div class="sorted-list" v-else>
        <div class="sorting-options">
          <button
            v-for="val in availableFilters"
            :class="[
              filterCategory === val ? 'active' : '',
              'sorting-button',
              'head-text'
            ]"
            :key="val"
            @click="
              () => {
                getSortedList(val);
                filterCategory = val;
              }
            "
          >
            {{ val }}
          </button>
        </div>
        <div class="category" v-for="entry in categories" :key="entry[0]">
          <div class="category-header head-text">
            {{ entry[0] ? entry[0] : "Mistery" }}
          </div>
          <div class="category-items">
            <CharacterCard
              v-for="character in entry[1]"
              :key="character.id"
              :character="character"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import CharacterService from "@/services/CharacterService";
import Character from "@/models/character";
import CharacterCard from "@/components/character/CharacterCard.vue";
import { CharacterFilterCategories } from "@/common/enums";

export default defineComponent({
  components: {
    CharacterCard
  },
  setup() {
    const items = ref<Character[] | null>(null);
    const loading = ref(true);
    const error = ref<Error | null>(null);
    const isPaged = ref(true);
    const categories = ref<[string, Character[]][] | null>(null);
    const filterCategory = ref<string>(CharacterFilterCategories.species);
    const maxPage = ref<number>(1);
    const currentPage = ref<number>(1);
    const pageSize = ref<number>(10);

    const availableFilters = Object.values(CharacterFilterCategories);

    const getPaged = async (pageNum: number, pageSize: number) => {
      loading.value = true;

      try {
        items.value = await CharacterService.get(pageNum, pageSize);
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    const getSortedList = async (prop: string) => {
      const characters = await CharacterService.getAll();

      if (items.value) {
        let key: (item: Character) => string;

        switch (prop) {
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

        categories.value = CharacterService.groupBy(characters, key);
      }
    };

    const changeData = async (isPlus: boolean) => {
      if (isPlus) currentPage.value = currentPage.value + 1;
      else currentPage.value = currentPage.value - 1;

      await getPaged(currentPage.value, 10);
    };

    onMounted(async () => {
      await getPaged(currentPage.value, 10);

      // nasty.. don't try this at home!!
      maxPage.value = (await CharacterService.getAll()).length / pageSize.value;

      getSortedList(filterCategory.value);
    });

    return {
      items,
      loading,
      error,
      currentPage,
      maxPage,
      changeData,
      isPaged,
      categories,
      filterCategory,
      availableFilters,
      getSortedList
    };
  }
});
</script>

<style lang="scss">
#character-list {
  max-width: 1300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .list-content {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;

    .paged-list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
    }

    .sorted-list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      font-size: 1.3rem;

      .sorting-options {
        margin-bottom: 20px;

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
      }

      .category {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        margin: 10px;
        padding: 10px;
        background: rgba(38, 30, 85);
        border: 3px solid rgba(133, 77, 156);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

        .category-header {
          width: 100%;
          color: whitesmoke;
          border-bottom: 3px solid rgba(133, 77, 156);
          border-radius: 50%;
          box-shadow: 0 5px 5px 0 #080927;
          padding: 10px;
          z-index: 5;
        }

        .category-items {
          margin: 20px;
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          background: rgba(8, 9, 39);
          box-shadow: inset 0 0 500px rgba(38, 30, 85);
          border: 1px solid rgba(133, 77, 156);
          border-radius: 20px;
        }
      }
    }
  }

  .pagination {
    width: 100%;
    margin: 50px;
    display: flex;
    justify-content: center;
    font-size: 2rem;

    .pagination-icon {
      margin: 0 15px 0 15px;
      cursor: pointer;

      &.disabled {
        opacity: 0.6;
        pointer-events: none;
        cursor: initial;
      }
    }
  }
}

.sorting {
  width: 100%;

  .button-group {
    margin: 30px;
    padding: 10px;

    .sort-button {
      padding: 10px 40px 10px 40px;
      font-size: 1.3rem;
      font-family: "Montserrat", sans-serif;
      color: rgba(39, 31, 86);
      background-color: #9a84d1;
      border: 2px solid rgba(39, 31, 86);
      cursor: pointer;

      &:hover {
        color: #9a84d1;
        background-color: rgba(39, 31, 86);
        border: 2px solid rgba(39, 31, 86);
        transition: all 0.2s ease-in-out;
      }

      &:focus {
        outline: none;
      }

      &.active {
        color: #9a84d1;
        background-color: rgba(39, 31, 86);
        border: 2px solid rgba(39, 31, 86);
        pointer-events: none;
        transition: all 0.2s ease-in-out;
      }
    }
  }
}

@media (max-width: 760px) {
  #character-list {
    .list-content {
      .sorted-list {
        font-size: 1rem;
      }
    }
  }
}
</style>

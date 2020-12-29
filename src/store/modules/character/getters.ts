import { GetterTree } from "vuex";
import Character from "@/models/character";
import { RootState } from "../root/state";
import { CharacterLoadingState, CharacterState } from "./state";
import { PagedList, PagedListParameters } from "@/utils/pagination";

export interface CharacterGetters {
  /**
   * Returns a paged character list.
   */
  getPaged(
    state: CharacterState
  ): (params?: PagedListParameters) => PagedList<Character>;
  /**
   * Returns the current loading and error state.
   */
  getLoadingState(
    state: CharacterState
  ): { isLoading: CharacterLoadingState; error: Error | null };
  /**
   * Returns all available sorting categories.
   */
  getSortingCategories(state: CharacterState): (keyof Character)[];
}

const getters: GetterTree<CharacterState, RootState> & CharacterGetters = {
  getLoadingState: (state: CharacterState) => {
    return { isLoading: state.isLoading, error: state.error };
  },
  getPaged: (state: CharacterState) => (params?: PagedListParameters) => {
    return new PagedList<Character>(
      state.characters ? state.characters : [],
      params
    );
  },
  getSortingCategories: (state: CharacterState): (keyof Character)[] => {
    return ["name", "species", "origin", "gender", "status"];
  }
};

export default getters;

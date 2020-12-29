import { MutationTree } from "vuex";
import Character from "@/models/character";
import { CharacterState } from "./state";
import { CharacterActionTypes } from "./actions";

export enum CharacterMutationTypes {
  SET_CHARACTERS = "SET_CHARACTERS",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR"
}

export type CharacterLoadingUpdate = {
  loadingAction: CharacterActionTypes;
  loadingState: boolean;
};

export type CharacterMutations<S = CharacterState> = {
  [CharacterMutationTypes.SET_CHARACTERS](state: S, payload: Character[]): void;
  [CharacterMutationTypes.SET_LOADING](
    state: S,
    payload: CharacterLoadingUpdate
  ): void;
  [CharacterMutationTypes.SET_ERROR](state: S, payload: Error): void;
};

const mutations: MutationTree<CharacterState> & CharacterMutations = {
  [CharacterMutationTypes.SET_CHARACTERS](
    state: CharacterState,
    payload: Character[]
  ) {
    state.characters = payload;
  },
  [CharacterMutationTypes.SET_LOADING](
    state: CharacterState,
    payload: CharacterLoadingUpdate
  ) {
    state.isLoading[payload.loadingAction] = payload.loadingState;
  },
  [CharacterMutationTypes.SET_ERROR](state: CharacterState, payload: Error) {
    state.error = payload;
  }
};

export default mutations;

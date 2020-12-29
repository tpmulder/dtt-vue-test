import { MutationTree } from "vuex";
import { RootState } from "./state";

export enum RootMutationTypes {
  SET_VERSION = "SET_VERSION",
  SET_SIDE_MENU = "SET_SIDE_MENU"
}

export type RootMutations<S = RootState> = {
  [RootMutationTypes.SET_VERSION](state: S, payload: string): void;
  [RootMutationTypes.SET_SIDE_MENU](state: RootState, payload: boolean): void;
};

const mutations: MutationTree<RootState> & RootMutations = {
  [RootMutationTypes.SET_VERSION](state: RootState, payload: string) {
    state.version = payload;
  },
  [RootMutationTypes.SET_SIDE_MENU](state: RootState, payload: boolean) {
    state.sideMenuIsOpen = payload;
  }
};

export default mutations;

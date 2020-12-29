import { ActionContext, ActionTree } from "vuex";
import { RootMutationTypes, RootMutations } from "./mutations";
import { RootState } from "./state";

export enum RootActionTypes {
  SET_VERSION = "SET_VERSION",
  SET_SIDE_MENU = "SET_SIDE_MENU"
}

type AugmentedActionContextRoot = {
  commit<K extends keyof RootMutations>(
    key: K,
    payload: Parameters<RootMutations[K]>[1]
  ): ReturnType<RootMutations[K]>;
} & Omit<ActionContext<RootState, RootState>, "commit">;

export interface RootActions {
  [RootActionTypes.SET_VERSION](
    { commit }: AugmentedActionContextRoot,
    payload: string
  ): void;
  [RootActionTypes.SET_SIDE_MENU](
    { commit }: AugmentedActionContextRoot,
    payload: boolean
  ): void;
}

const actions: ActionTree<RootState, RootState> & RootActions = {
  [RootActionTypes.SET_VERSION]({ commit }, payload: string) {
    commit(RootMutationTypes.SET_VERSION, payload);
  },
  [RootActionTypes.SET_SIDE_MENU]({ commit }, payload: boolean) {
    commit(RootMutationTypes.SET_SIDE_MENU, payload);
  }
};

export default actions;

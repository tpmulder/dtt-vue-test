import { RootState } from "../root/state";
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module
} from "vuex";
import actions, { CharacterActions } from "./actions";
import getters, { CharacterGetters } from "./getters";
import mutations, { CharacterMutations } from "./mutations";
import state, { CharacterState } from "./state";

const characterModule: Module<CharacterState, RootState> = {
  state,
  getters,
  mutations,
  actions
};

export default characterModule;

/**
 * All character related actions, getters & mutations
 */
export type CharacterStoreModule<S = CharacterState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof CharacterMutations,
    P extends Parameters<CharacterMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<CharacterMutations[K]>;
} & {
  getters: {
    [K in keyof CharacterGetters]: ReturnType<CharacterGetters[K]>;
  };
} & {
  dispatch<K extends keyof CharacterActions>(
    key: K,
    payload?: Parameters<CharacterActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<CharacterActions[K]>;
};

import { Module, ModuleTree } from "vuex";
import getters, { RootGetters } from "./getters";
import actions, { RootActions } from "./actions";
import mutations, { RootMutations } from "./mutations";
import state, { RootState } from "./state";
import characterModule from "../character";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

const modules: ModuleTree<RootState> = {
  characterModule
};

const root: Module<RootState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  modules
};

export default root;

// Some boilerplate code needed to pass the correct types to our typed store.
export type RootStoreModule<S = RootState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof RootMutations,
    P extends Parameters<RootMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<RootMutations[K]>;
} & {
  getters: {
    [K in keyof RootGetters]: ReturnType<RootGetters[K]>;
  };
} & {
  dispatch<K extends keyof RootActions>(
    key: K,
    payload?: Parameters<RootActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<RootActions[K]>;
};

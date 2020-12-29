import { useStore as VuexStore, createStore } from "vuex";
import { CharacterStoreModule } from "./modules/character";
import {
  CharacterActions,
  CharacterActionTypes
} from "./modules/character/actions";
import { CharacterGetters } from "./modules/character/getters";
import { CharacterMutationTypes } from "./modules/character/mutations";
import root, { RootStoreModule } from "./modules/root";
import { RootActions, RootActionTypes } from "./modules/root/actions";
import { RootGetters } from "./modules/root/getters";
import { RootMutationTypes } from "./modules/root/mutations";
import { RootState } from "./modules/root/state";

export const StoreMutationTypes = {
  ...RootMutationTypes,
  ...CharacterMutationTypes
};

export const StoreActionTypes = {
  ...RootActionTypes,
  ...CharacterActionTypes
};

export interface StoreActions extends RootActions, CharacterActions {}
export interface StoreGetters extends RootGetters, CharacterGetters {}

type StoreModules = {
  root: RootStoreModule;
  character: CharacterStoreModule;
};

export type Store = RootStoreModule<Pick<StoreModules, "root">> &
  CharacterStoreModule<Pick<StoreModules, "character">>;

const store = createStore<RootState>(root);

export default store;

/**
 * Returns a typed store
 */
export function useTypedStore(): Store {
  return VuexStore() as Store;
}

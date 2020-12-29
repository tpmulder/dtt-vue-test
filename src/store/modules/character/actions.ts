import characterClient from "@/clients/characterClient";
import Character from "@/models/character";
import { ProductionError } from "@/utils/errors/productionError";
import { ActionContext, ActionTree } from "vuex";
import { RootState } from "../root/state";
import { CharacterMutations, CharacterMutationTypes } from "./mutations";
import { CharacterState } from "./state";

export enum CharacterActionTypes {
  SET_CHARACTERS = "SET_CHARACTERS",
  GET_RANDOM = "GET_RANDOM",
  GET_BY_ID = "GET_BY_ID",
  GET_RELATED = "GET_RELATED"
}

// Some boilerplate code needed to pass the correct types to our typed store.
type AugmentedActionContext = {
  commit<K extends keyof CharacterMutations>(
    key: K,
    payload?: Parameters<CharacterMutations[K]>[1]
  ): ReturnType<CharacterMutations[K]>;
} & Omit<ActionContext<CharacterState, RootState>, "commit">;

type RelatedSettings = {
  currentCharacter: Character;
  category: keyof Character;
  relatedItemCount: number;
};

export interface CharacterActions {
  [CharacterActionTypes.SET_CHARACTERS]({
    commit,
    state
  }: AugmentedActionContext): Promise<void>;
  [CharacterActionTypes.GET_BY_ID](
    { commit, state }: AugmentedActionContext,
    payload: number
  ): Promise<Character | null>;
  [CharacterActionTypes.GET_RANDOM]({
    commit,
    state
  }: AugmentedActionContext): Promise<Character | null>;
  [CharacterActionTypes.GET_RELATED](
    { commit, state }: AugmentedActionContext,
    payload: RelatedSettings
  ): Promise<Character[] | null>;
}

/**
 * Wrapper function to apply loading and errors for every action
 */
const operate = async <T>(
  commit: any,
  actionType: CharacterActionTypes,
  fn: (currentCharacters: Character[]) => Promise<T>,
  state: CharacterState,
  mutationType?: CharacterMutationTypes
) => {
  // Loading...
  commit(CharacterMutationTypes.SET_LOADING, {
    loadingAction: [actionType],
    loadingState: true
  });

  // Remove previous errors
  commit(CharacterMutationTypes.SET_ERROR, null);
  try {
    let characters = state.characters;

    // A bit hacky, but this makes sure no redundant api calls were made.
    if (!characters) {
      characters = await characterClient.getAll();

      if (mutationType !== CharacterMutationTypes.SET_CHARACTERS)
        commit(CharacterMutationTypes.SET_CHARACTERS, characters);
    }

    // Excecute whatever function
    const result = await fn(characters);

    // Commit mutation to store
    if (mutationType) commit(mutationType, result);

    return result;
  } catch (err) {
    // Add error on fail
    commit(CharacterMutationTypes.SET_ERROR, err);
    return null;
  } finally {
    // All set and done B-)
    commit(CharacterMutationTypes.SET_LOADING, {
      loadingAction: [actionType],
      loadingState: false
    });
  }
};

const actions: ActionTree<CharacterState, RootState> & CharacterActions = {
  async [CharacterActionTypes.SET_CHARACTERS]({ commit, state }) {
    await operate<Character[]>(
      commit,
      CharacterActionTypes.SET_CHARACTERS,
      async currentCharacters => currentCharacters,
      state,
      CharacterMutationTypes.SET_CHARACTERS
    );
  },
  async [CharacterActionTypes.GET_RANDOM]({ commit, state }) {
    return await operate<Character>(
      commit,
      CharacterActionTypes.GET_RANDOM,
      async currentCharacters =>
        currentCharacters[Math.floor(Math.random() * currentCharacters.length)],
      state
    );
  },
  async [CharacterActionTypes.GET_RELATED]({ commit, state }, payload) {
    return await operate<Character[]>(
      commit,
      CharacterActionTypes.GET_RELATED,
      async currentCharacters => {
        // Get array of related characters
        const arr: number[] = [];
        const filteredResult = currentCharacters.filter(
          e =>
            e[payload.category] ===
              payload.currentCharacter[payload.category] &&
            e.id != payload.currentCharacter.id
        );

        // Get array of distinct randoms
        if (filteredResult.length >= payload.relatedItemCount) {
          while (arr.length < payload.relatedItemCount) {
            const r = Math.floor(Math.random() * filteredResult.length);
            if (arr.indexOf(r) === -1) arr.push(r);
          }
        } else return filteredResult;

        return arr.map(e => filteredResult[e]);
      },
      state
    );
  },
  async [CharacterActionTypes.GET_BY_ID]({ commit, state }, payload) {
    return await operate<Character>(
      commit,
      CharacterActionTypes.GET_BY_ID,
      async currentCharacters => {
        const character = currentCharacters.find(e => e.id === payload);

        if (!character) throw new ProductionError();
        else return character;
      },
      state
    );
  }
};

export default actions;

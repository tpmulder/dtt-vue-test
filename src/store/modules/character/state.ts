import Character from "@/models/character";
import { CharacterActionTypes } from "./actions";

export type CharacterLoadingState = { [K in CharacterActionTypes]: boolean };

export interface CharacterState {
  characters: Character[] | null;
  isLoading: CharacterLoadingState;
  error: Error | null;
}

const state: CharacterState = {
  characters: null,
  isLoading: {
    SET_CHARACTERS: true,
    GET_RANDOM: true,
    GET_BY_ID: true,
    GET_RELATED: true
  },
  error: null
};

export default state;

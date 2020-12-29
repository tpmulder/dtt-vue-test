import { GetterTree } from "vuex";
import { RootState } from "./state";

export interface RootGetters {
  getVersion(state: RootState): string;
  getSideMenuState(state: RootState): boolean;
}

const getters: GetterTree<RootState, RootState> & RootGetters = {
  /**
   * Get current application version
   */
  getVersion: (state: RootState): string => {
    return state.version;
  },
  /**
   * Get current sidemenu state
   */
  getSideMenuState: (state: RootState) => {
    return state.sideMenuIsOpen;
  }
};

export default getters;

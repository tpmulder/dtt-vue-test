import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    menuIsOpen: false
  },
  mutations: {
    openMenu(state) {
      state.menuIsOpen = true;
    },
    closeMenu(state) {
      state.menuIsOpen = false;
    }
  }
});

export default store;

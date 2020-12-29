export interface RootState {
  version: string;
  sideMenuIsOpen: boolean;
}

const state: RootState = {
  version: "v2",
  sideMenuIsOpen: false
};

export default state;

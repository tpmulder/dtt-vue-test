import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faSortUp,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowRight);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faSortUp);
library.add(faSortDown);

createApp(App)
  .use(store)
  .use(router)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#app");

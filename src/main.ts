import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueScrollTo from "vue-scrollto";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowRight);
library.add(faChevronLeft);
library.add(faChevronRight);

createApp(App)
  .use(store)
  .use(router)
  .use(vueScrollTo)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#app");

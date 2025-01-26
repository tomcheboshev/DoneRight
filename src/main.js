import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from './App.vue'
import router from './router'
import { 
  faGooglePlay,
  faApple
} from '@fortawesome/free-brands-svg-icons';

import {
  faUserPlus,
  faPlug,
  faWrench,
  faPaintRoller,
  faTools,
  faHammer,
  faBolt,
  faCogs,
  faDoorOpen,
  faWater,
  faSearch,
  faBars,
  faUser,
  faBriefcase,
  faArrowRight,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

library.add(
  faUserPlus, 
  faPlug, 
  faWrench, 
  faPaintRoller, 
  faTools, 
  faHammer, 
  faBolt, 
  faCogs, 
  faDoorOpen, 
  faWater,   
  faSearch,
  faBars,
  faUser,
  faBriefcase,
  faArrowRight,
  faCheckCircle,
  faGooglePlay,
  faApple,
);


app.use(createPinia())
app.use(router)
app.mount('#app')

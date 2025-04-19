import './assets/main.css'
import 'vuetify/styles' // 💡 Vuetify core styles
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import App from './App.vue'
import router from './router'

import { 
  faGooglePlay,
  faApple,
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons'

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
  faFan,
  faLayerGroup,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons'

// Set up Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

// Set up app
const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

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
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedin,
  faFan,
  faLayerGroup,
  faShieldAlt
)

app.use(createPinia())
app.use(router)
app.use(vuetify) // 🔥 Inject Vuetify here
app.mount('#app')

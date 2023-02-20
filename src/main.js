// Importing vue functions
import { createApp } from 'vue'
import App from './App.vue'

// Importing tailwind
import './assets/compiled.css'

// Import fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRotateLeft,
  faBars,
  faCheck,
  faDolly,
  faHammer,
  faMagnifyingGlass,
  faMoneyBill,
  faPercent,
  faShoppingBag,
  faXmark,
  faXmarksLines,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Adding fontawesome icons to library
library.add(
  faMagnifyingGlass,
  faCheck,
  faXmark,
  faXmarksLines,
  faShoppingBag,
  faDolly,
  faBars,
  faPercent,
  faMoneyBill,
  faHammer,
  faArrowRotateLeft
)

// Creating the app and mounting the div id app from App.vue
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

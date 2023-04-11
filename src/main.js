// Importing vue functions
import { createApp } from 'vue'
import App from './App.vue'

// Importing tailwind
import './assets/tailwind.css'

// Import fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRotateLeft,
  faBars,
  faCheck,
  faDolly,
  faHammer,
  faHourglass,
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
  faArrowRotateLeft,
  faHourglass
)

// Creating the app and mounting the div id app from App.vue
// Allowing fontawesome and socket.io to be used in the app

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

<script setup>
// Import the components
import { ref, watch } from 'vue'
import CurrentTable from './components/currentTable.vue'
import SearchBox from './components/search.vue'
import SearchButton from './components/searchButton.vue'
import Total from './components/total.vue'
import QuickActions from './components/quickActions.vue'
import Keypad from './components/keypad.vue'
import Modal from './components/modal.vue'

// Socket testing

import io from 'socket.io-client'

const socket = io('http://localhost:5200') // replace with your server URL

socket.on('connect', () => {
  console.log('Connected to server')
})

// Search results - defined at top to prevent UI errors
const searchBody = ref('')

// Prop for qty numpad
const qty = ref('')

// Prop for search input
const search = ref('')

// Prop for currently selected
const currentSelected = ref('')

// Current till
const currentTill = ref([])

// Error message
const errorMessage = ref('')

// Ref to determine if the search modal is shown
const showSearchModal = ref(false)

// Ref to determine if the error modal is shown
const showErrorModal = ref(false)

// Watches the currentTill value, if it changes, sends value via websocket.
watch(
  () => currentTill.value,
  (data) => {
    socket.emit('currentTill', data)
  },
  { deep: true }
)

// Watches the currentSelected value, if it changes, sends value via websocket.
watch(
  () => currentSelected.value,
  (data) => {
    socket.emit('currentSelected', data)
  },
  { deep: true }
)
socket.on('currentSelected', (data) => {
  currentSelected.value = data
})

// Runs the search
async function runSearch() {
  // If no search value, don't bother returning all the data (useless + waste of resource)
  if (search.value === '') {
    return
  }

  // Fetches the search results from the backend
  const searchResults = await fetch('http://localhost:5200/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      search: search.value,
    }),
  })

  // Converts the search results to JSON, sets the searchBody prop to the results
  searchBody.value = await searchResults.json()

  // Shows the search modal
  showSearchModal.value = true
}

// Select item after search results
async function addItem(ean) {
  // Fetches the EAN info from the till (price etc)
  const eanQuery = await fetch('http://localhost:5200/getEanInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      EAN: ean,
    }),
  })

  // Closes search modal
  showSearchModal.value = false

  // Converts the search results to JSON
  const eanQueryJSON = await eanQuery.json()

  // If the priceHistory record does not exist, cannot be added to the till (none of the returned information is correct)
  if (eanQueryJSON[0].Price == null) {
    errorMessage.value =
      'The Item you have selected does not have an entry within the Price table. Please contact Retail Systems.'
    showErrorModal.value = true
  } else {
    // If quantity is not set, set it to 1
    const currentQty = qty.value === '' ? 1 : parseInt(qty.value)

    // If item already in the till (same EAN), add the quantity to the existing item
    if (
      // Tests whether at least one element in the item passes the test implemented by the provided function
      currentTill.value.some(
        // Tests whether the item description is the same as the description of the item being added and the item is not a refund
        (item) => item[1] === eanQueryJSON[0].Description && item[6] === false
      )
    ) {
      // Gets the index of the item in the till
      const index = currentTill.value.findIndex(
        (item) => item[1] === eanQueryJSON[0].Description
      )

      // Adds the quantity to the existing item
      currentTill.value[index][2] += currentQty
    } else {
      // If the item is not in the till, push it to the till
      currentTill.value.push([
        // ean
        ean,
        // description
        eanQueryJSON[0].Description,
        // quantity
        currentQty,
        // price
        parseFloat(eanQueryJSON[0].Price),
        // discount
        0,
        // price overrided
        false,
        // refund
        false,
      ])
    }
  }

  // Resets the search
  search.value = ''

  // Resets the quantity
  qty.value = ''
}
</script>

<template>
  <!-- mounts to main.js, makes the size the size of the screen -->
  <div id="app" class="w-screen h-screen">
    <!-- Error modal -->
    <modal v-if="showErrorModal" @close="showErrorModal = !showErrorModal">
      <template #header>
        <h1 class="mt-0 mb-6 text-5xl font-bold">Error</h1>
      </template>
      <template #body>
        <p class="text-2xl">
          {{ errorMessage }}
        </p>
      </template>
    </modal>

    <!-- creates the search modal, defaults to -->
    <modal v-if="showSearchModal" @close="showSearchModal = !showSearchModal">
      <!-- Replaces the header of the search modal -->
      <template #header>
        <h1 class="mx-6 my-6 text-[3vw] font-bold">Search Results</h1>
      </template>
      <!-- Replaces the body of the search modal -->
      <template #body>
        <table class="w-[calc(100%_-_2rem)] my-6 mx-6">
          <thead>
            <tr>
              <th class="px-5 py-3 text-[1.75vw]">Description</th>
              <th class="px-5 py-3 text-[1.75vw]">EAN</th>
              <th class="px-5 py-3 text-[1.75vw]">Select</th>
            </tr>
          </thead>
          <tr v-for="i in searchBody">
            <td class="px-5 py-3 text-[1.75vw] border-t-2 border-gray-200">
              {{ i.Description }}
            </td>
            <td
              class="px-5 py-3 text-[1.75vw] border-t-2 border-l-2 border-gray-200"
            >
              {{ i.EAN }}
            </td>
            <td
              class="justify-center px-5 py-3 border-t-2 border-l-2 border-gray-200"
            >
              <div class="flex justify-center">
                <button
                  class="flex w-[3.5vw] h-[5vh] self-center justify-center px-5 py-4 mt-3 font-bold text-white bg-green-500 rounded hover:bg-green-600"
                  @click="addItem(i.EAN)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-check"
                    class="w-[3vw] h-[3vh] self-center"
                  />
                </button>
              </div>
            </td>
          </tr>
        </table>
      </template>
    </modal>

    <!-- creates the 1st row -->
    <div class="flex flex-row w-full h-1/2">
      <!-- creates the 1st column of the first row -->
      <div class="flex-col w-full h-full">
        <current-table
          :current-till="currentTill"
          v-model:currentSelected="currentSelected"
        />
      </div>
      <!-- creates the 2nd column of the first row -->
      <div class="flex flex-col w-full h-full">
        <!-- creates the area for the search box (first row, second column -> first row) -->
        <div class="flex flex-row justify-center w-full h-1/2">
          <search-box v-model="search" @addItem="addItem($event)" />
        </div>
        <!-- creates a second row (first row, second column -> second row) -->
        <div class="flex flex-row w-full h-1/2">
          <!-- creates the first column ^ -->
          <div class="flex flex-col justify-center w-1/2 h-full">
            <search-button @goSearch="runSearch" />
          </div>
          <!-- creates the second column ^ -->
          <div class="flex flex-col justify-center w-1/2 h-full">
            <total
              v-model:currentTill="currentTill"
              @payment-update="(n) => socket.emit('paymentURL', n)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- creates the second row -->
    <div class="flex flex-row w-full h-1/2">
      <!-- creates the first column of the second row -->
      <div class="flex flex-col justify-center w-full h-full">
        <quick-actions
          v-model:currentSelected="currentSelected"
          v-model:currentTill="currentTill"
          @addItem="addItem($event)"
        />
      </div>
      <!-- creates the second column of the second row -->
      <div class="flex-col w-full h-full">
        <keypad v-model="qty" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

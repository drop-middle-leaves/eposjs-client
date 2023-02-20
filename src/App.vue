<script setup>
// Import the components
import { ref } from 'vue'
import CurrentTable from './components/currentTable.vue'
import SearchBox from './components/search.vue'
import SearchButton from './components/searchButton.vue'
import Total from './components/total.vue'
import QuickActions from './components/quickActions.vue'
import Keypad from './components/keypad.vue'
import Modal from './components/modal.vue'

// Import required vue modules

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

// Changes the value of modal
function changeModal(open, type) {
  switch (type) {
    // If the type is search, change the value of showSearchModal
    case 'search': {
      switch (open) {
        case true:
          showSearchModal.value = true
          break
        case false:
          showSearchModal.value = false
          search.value = ''
          break
      }
      break
    }
    // If the type is error, change the value of showErrorModal
    case 'error': {
      switch (open) {
        case true:
          showErrorModal.value = true
          break
        case false:
          showErrorModal.value = false
          search.value = ''
          break
      }
      break
    }
    default: {
      break
    }
  }
}

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
  changeModal(true, 'search')
}

// Select item after search results
async function selectAfterSearch(ean) {
  console.log(ean)

  // Fetches the EAN info from the till (price etc)
  const searchResults = await fetch('http://localhost:5200/getEanInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      EAN: ean,
    }),
  })

  // Closes search modal
  changeModal(false, 'search')

  const searchResultsJSON = await searchResults.json()

  // If the priceHistory record does not exist, cannot be added to the till (none of the returned information is correct)
  if (searchResultsJSON[0].Price == null) {
    errorMessage.value =
      'The Item you have selected does not have an entry within the Price table. Please contact Retail Systems.'
    changeModal(true, 'error')
  } else {
    // If quantity is not set, set it to 1
    const currentQty = qty.value === '' ? 1 : parseInt(qty.value)

    console.log(currentTill.value.length)

    // Pushes the item to the till
    currentTill.value.push([
      // ID for Vue Key
      currentTill.value.length,
      searchResultsJSON[0].Description,
      currentQty,
      parseFloat(searchResultsJSON[0].Price),
    ])

    console.log(currentTill.value)
  }

  // Resets the quantity
  qty.value = ''
}
</script>

<template>
  <!-- mounts to main.js, makes the size the size of the screen -->
  <div id="app" class="w-screen h-screen">
    <!-- Error modal -->
    <modal v-if="showErrorModal" @close="changeModal(false, 'error')">
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
    <modal v-if="showSearchModal" @close="changeModal(false, 'search')">
      <!-- Replaces the header of the search modal -->
      <template #header>
        <h1 class="mx-6 my-6 text-5xl font-bold">Search Results</h1>
      </template>
      <!-- Replaces the body of the search modal -->
      <template #body>
        <table class="w-[calc(100%_-_2rem)] my-6 mx-6">
          <thead>
            <tr>
              <th class="px-5 py-3 text-4xl">Description</th>
              <th class="px-5 py-3 text-4xl">EAN</th>
              <th class="px-5 py-3 text-4xl">Select</th>
            </tr>
          </thead>
          <tr v-for="i in searchBody">
            <td class="px-5 py-3 text-4xl border-t-2 border-gray-200">
              {{ i.Description }}
            </td>
            <td
              class="px-5 py-3 text-4xl border-t-2 border-l-2 border-gray-200"
            >
              {{ i.EAN }}
            </td>
            <td
              class="justify-center px-5 py-3 border-t-2 border-l-2 border-gray-200"
            >
              <div class="flex justify-center">
                <button
                  class="flex self-center justify-center px-5 py-4 mt-3 font-bold text-white bg-green-500 rounded hover:bg-green-600"
                  @click="selectAfterSearch(i.EAN)"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-check"
                    class="h-[3rem] w-[3rem] self-center"
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
          <search-box v-model="search" />
        </div>
        <!-- creates a second row (first row, second column -> second row) -->
        <div class="flex flex-row w-full h-1/2">
          <!-- creates the first column ^ -->
          <div class="flex flex-col justify-center w-1/2 h-full">
            <search-button @goSearch="runSearch" />
          </div>
          <!-- creates the second column ^ -->
          <div class="flex flex-col justify-center w-1/2 h-full">
            <total />
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

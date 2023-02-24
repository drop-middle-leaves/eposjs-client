<script setup>
import { computed, ref } from 'vue'
import Modal from './modal.vue'

const props = defineProps(['currentTill', 'currentSelected'])
const emit = defineEmits([
  'update:currentTill',
  'update:currentSelected',
  'addItem',
])

// Makes currentSelected a computed value to allow for two-way binding
const currentSelected = computed({
  get() {
    return props.currentSelected
  },
  set(value) {
    emit('update:currentSelected', value)
  },
})

// Makes currentTill a computed value to allow for two-way binding
const currentTill = computed({
  get() {
    return props.currentTill
  },
  set(value) {
    emit('update:currentTill', value)
  },
})

// Computed value to get the description of the currently selected item
const currentSelectedDescription = computed(() => {
  if (currentSelected.value !== '') {
    return currentTill.value[currentSelected.value][1]
  } else {
    return ''
  }
})

// Function to void an item
function voidItem() {
  if (currentSelected.value !== '') {
    currentTill.value.splice(currentSelected.value, 1)
    currentSelected.value = ''
  }
}

// Function to fix an item
function fixNow() {
  if (currentSelected.value !== '') {
    // If an item is selected, remove the price
    currentTill.value[currentSelected.value][3] = 0
  } else {
    // If no item is selected, remove the price from all items
    for (let i = 0; i < currentTill.value.length; i++) {
      currentTill.value[i][3] = 0
    }
  }
  // Reset the selected item
  currentSelected.value = ''
}

/* Price Override */
// Price Override Modal Toggle
const showPriceOverrideModal = ref(false)
let newPrice = ''

// Function to toggle the price override modal
function flipPriceOverrideModal() {
  newPrice = ''
  if (currentSelected.value !== '') {
    showPriceOverrideModal.value = !showPriceOverrideModal.value
  }
}

// Function to override the price
function overridePrice() {
  if (currentSelected.value !== '') {
    currentTill.value[currentSelected.value][3] = newPrice
    showPriceOverrideModal.value = false
  }
  // Reset the selected item
  currentSelected.value = ''
}

/* Stock Check */
// Stock Check Modal Toggle
const showStockCheckModal = ref(false)
const stockCheckResults = ref([])

// Function to check the stock
async function checkStock() {
  if (currentSelected.value !== '') {
    // Fetches the stock check results from the backend
    const stockCheckResultsQuery = await fetch(
      'http://localhost:5200/getEanInfo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EAN: currentTill.value[currentSelected.value][0],
        }),
      }
    )

    // Converts the stock check results to JSON
    const stockCheckResultsJSON = await stockCheckResultsQuery.json()

    // console.log
    console.log(stockCheckResultsJSON[0])
  }
  // Reset the selected item
  currentSelected.value = ''
}
</script>

<template>
  <div class="flex justify-center w-full h-full">
    <!-- Price Override Modal! -->
    <modal v-if="showPriceOverrideModal">
      <template #header>
        <h1 class="text-[4vw] font-bold">Price Override</h1>
      </template>
      <template #body>
        <div class="justify-center w-full h-full">
          <div class="flex justify-center">
            <h1 class="text-[3vw] mb-2 text-center">
              Changing price for: {{ currentSelectedDescription }}
            </h1>
          </div>
          <input
            type="number"
            class="w-full h-[8vw] text-[3vw] rounded-lg border-2 border-gray-200"
            v-model.number="newPrice"
            placeholder="Price"
          />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-center w-full h-full">
          <button
            type="button"
            @click="flipPriceOverrideModal"
            class="w-[calc(100%_-_0.5rem)] h-[8vw] mx-1 mt-3 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            <font-awesome-icon
              icon="fa-solid fa-times"
              class="h-[6vw] w-[6vw]"
            />
          </button>
          <button
            type="button"
            @click="overridePrice"
            class="w-[calc(100%_-_0.5rem)] mx-1 mt-3 h-[8vw] text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            <font-awesome-icon
              icon="fa-solid fa-check"
              class="h-[6vw] w-[6vw]"
            />
          </button>
        </div>
      </template>
    </modal>

    <!-- Creates outer border -->
    <div
      class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] rounded-lg self-center"
    >
      <!-- Creates grid -->
      <div class="grid w-full h-full grid-flow-col grid-rows-3 gap-2">
        <!-- col 1 -->

        <!-- Fix it now-->
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
          @click="fixNow"
        >
          <font-awesome-icon icon="fa-solid fa-hammer" class="buttonIcon" />
        </button>

        <!-- Add bag -->
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
          @click="$emit('addItem', 1)"
        >
          <font-awesome-icon
            icon="fa-solid fa-shopping-bag"
            class="buttonIcon"
          />
        </button>

        <!-- Refund -->
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
        >
          <font-awesome-icon
            icon="fa-solid fa-arrow-rotate-left"
            class="buttonIcon"
          />
        </button>

        <!-- col 2 -->
        <!-- Void -->
        <button
          type="button"
          class="bg-red-500 hover:bg-red-600 buttonWrapper"
          @click="voidItem"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" class="buttonIcon" />
        </button>

        <!-- Quick Menu -->
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
        >
          <font-awesome-icon icon="fa-solid fa-bars" class="buttonIcon" />
        </button>

        <!-- Clear till -->
        <button
          type="button"
          class="bg-red-500 hover:bg-red-600 buttonWrapper"
          @click="currentTill = ''"
        >
          <font-awesome-icon
            icon="fa-solid fa-xmarks-lines"
            class="buttonIcon"
          />
        </button>

        <!-- col 3 -->
        <!-- Price Override -->
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
          @click="flipPriceOverrideModal"
        >
          <font-awesome-icon icon="fa-solid fa-money-bill" class="buttonIcon" />
        </button>

        <!-- Stock Check -->
        <button
          type="button"
          class="bg-yellow-500 hover:bg-yellow-600 buttonWrapper"
          @click="checkStock"
        >
          <font-awesome-icon icon="fa-solid fa-dolly" class="buttonIcon" />
        </button>

        <!-- Discount -->
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
        >
          <font-awesome-icon icon="fa-solid fa-percent" class="buttonIcon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.buttonIcon {
  @apply h-[5.5vw] w-[5.5vw] aspect-square self-center;
}
.buttonWrapper {
  @apply h-full w-full rounded-lg text-white text-6xl flex justify-center;
}
</style>

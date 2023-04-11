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
    // Sets the new price
    currentTill.value[currentSelected.value][3] = newPrice

    // Sets the price overrided flag to true
    currentTill.value[currentSelected.value][5] = true

    // Closes the price override modal
    showPriceOverrideModal.value = false
  }
  // Reset the selected item
  currentSelected.value = ''
}

/* Stock Check */
// Stock Check Modal Toggle
const showStockCheckModal = ref(false)
const stockCheckResults = ref()

// Function to check the stock
async function checkStock() {
  if (currentSelected.value !== '') {
    // Fetches the stock check results from the backend
    const stockCheckQuery = await fetch('http://localhost:5200/getEanInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        EAN: currentTill.value[currentSelected.value][0],
      }),
    })

    // Converts the stock check results to JSON
    const stockCheckJSON = await stockCheckQuery.json()

    // If the stock check results are not empty
    if (stockCheckJSON[0] != '' || stockCheckJSON[0] != null) {
      // If the stock check results are in stock
      stockCheckResults.value = stockCheckJSON[0].Stock
    } else {
      stockCheckResults.value = 'No Stock Check Results'
    }

    showStockCheckModal.value = true
  }
}

/* Discount */
// Discount Modal Toggle
const showDiscountOverrideModal = ref(false)
let newDiscount = ''

// Function to toggle the discount modal
function flipDiscountOverrideModal() {
  newDiscount = ''
  if (currentSelected.value !== '') {
    showDiscountOverrideModal.value = !showDiscountOverrideModal.value
  }
}

// Function to discount the price
function applyDiscount() {
  if (currentSelected.value !== '') {
    // commits discount to array
    currentTill.value[currentSelected.value][4] = newDiscount

    // Hides modal
    showDiscountOverrideModal.value = false

    // Reset the selected item & discount
    currentSelected.value = ''
    newDiscount = ''
  }
}

/* Quick Items */
const showQuickItems = ref(false)

// Function to toggle the quick items modal
function flipQuickItemsModal() {
  showQuickItems.value = !showQuickItems.value
}

/* Refund */
// Refund Modal Toggle
const showRefundModal = ref(false)
const paymentID = ref('')

// Function to toggle the refund modal
function flipRefundModal(reset) {
  showRefundModal.value = !showRefundModal.value
  if (reset) {
    paymentID.value = ''
  }
}

// Function to refund items
async function refund() {
  // Array of EANs to refund
  let data = {
    EANs: [],
    paymentID: paymentID.value,
  }

  for (const i of currentTill.value) {
    let tmp = {}
    tmp.EAN = i[0]
    tmp.Quantity = i[2]
    data.EANs.push(tmp)
  }

  // Requests a refund from the backend
  const refundQuery = await fetch('http://localhost:5200/refund', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  // Converts results to JSON
  const refundJSON = await refundQuery.json()

  console.log(refundJSON)

  // If the refund was successful
  if (refundJSON == 'Refund successful') {
    // Clears the till
    currentTill.value = []
    // Closes the refund modal
    showRefundModal.value = false
    // Resets the payment ID
    paymentID.value = ''
  } else {
    // If the refund was not successful
    alert('Refund Failed. Error message: ' + refundJSON)
    paymentID.value = ''
  }
}
</script>

<template>
  <div class="flex justify-center w-full h-full">
    <!-- Price Override Modal -->
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

    <!-- Stock Check Modal -->
    <modal
      v-if="showStockCheckModal"
      @close=";(showStockCheckModal = false), (currentSelected = '')"
    >
      <template #header>
        <h1 class="text-[4vw] font-bold">Stock Check</h1>
      </template>
      <template #body>
        <div class="justify-center w-full h-full">
          <div class="flex justify-center">
            <h1 class="text-[3vw] mb-2">
              Checking stock for {{ currentSelectedDescription }}:
            </h1>
          </div>
          <div class="flex justify-center">
            <h1 class="text-[3vw] mb-2 text-center">
              {{ stockCheckResults }} Items in Stock
            </h1>
          </div>
        </div>
      </template>
    </modal>

    <!-- Discount Modal -->
    <modal v-if="showDiscountOverrideModal">
      <template #header>
        <h1 class="text-[4vw] font-bold">Discount</h1>
      </template>
      <template #body>
        <div class="justify-center w-full h-full">
          <div class="flex justify-center">
            <h1 class="text-[3vw] mb-2 text-center">
              Adding discount for: {{ currentSelectedDescription }}
            </h1>
          </div>
          <input
            type="number"
            class="w-full h-[8vw] text-[3vw] rounded-lg border-2 border-gray-200"
            v-model.number="newDiscount"
            placeholder="Discount (%)"
          />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-center w-full h-full">
          <button
            type="button"
            @click="flipDiscountOverrideModal"
            class="w-[calc(100%_-_0.5rem)] h-[8vw] mx-1 mt-3 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            <font-awesome-icon
              icon="fa-solid fa-times"
              class="h-[6vw] w-[6vw]"
            />
          </button>
          <button
            type="button"
            @click="applyDiscount"
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

    <!-- Refund Modal -->
    <modal v-if="showRefundModal">
      <template #header>
        <h1 class="text-[4vw] font-bold">Refund</h1>
      </template>
      <template #body>
        <div class="justify-center w-full h-full">
          <div class="flex justify-center">
            <h1 class="text-[3vw] mb-2 text-center">
              Enter payment ID to refund
            </h1>
          </div>
          <input
            type="text"
            class="w-full h-[8vw] text-[3vw] rounded-lg border-2 border-gray-200"
            v-model="paymentID"
            placeholder="Case Sensitive"
          />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-center w-full h-full">
          <button
            type="button"
            @click="flipRefundModal(true)"
            class="w-[calc(100%_-_0.5rem)] h-[8vw] mx-1 mt-3 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            <font-awesome-icon
              icon="fa-solid fa-times"
              class="h-[6vw] w-[6vw]"
            />
          </button>
          <button
            type="button"
            @click="refund"
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
          v-if="!showQuickItems"
          @click="fixNow"
        >
          <font-awesome-icon icon="fa-solid fa-hammer" class="buttonIcon" />
        </button>

        <!-- Samosa -->
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
          v-if="showQuickItems"
          @click="$emit('addItem', 2)"
        >
          <img src="../assets/img/samosa.png" class="buttonIcon" />
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
          v-if="!showQuickItems"
          @click="flipRefundModal(true)"
        >
          <font-awesome-icon
            icon="fa-solid fa-arrow-rotate-left"
            class="buttonIcon"
          />
        </button>

        <!-- Coffee -->
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
          v-if="showQuickItems"
          @click="$emit('addItem', 3)"
        >
          <img src="../assets/img/coffee.png" class="buttonIcon" />
        </button>

        <!-- col 2 -->
        <!-- Void -->
        <button
          type="button"
          class="bg-red-500 hover:bg-red-600 buttonWrapper"
          @click="voidItem"
          v-if="!showQuickItems"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" class="buttonIcon" />
        </button>

        <!-- Lottery -->
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
          v-if="showQuickItems"
          @click="$emit('addItem', 4)"
        >
          <img src="../assets/img/lottery.png" class="buttonIcon" />
        </button>

        <!-- Quick Menu -->
        <button
          type="button"
          @click="flipQuickItemsModal"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
        >
          <font-awesome-icon icon="fa-solid fa-bars" class="buttonIcon" />
        </button>

        <!-- Clear till -->
        <button
          type="button"
          class="bg-red-500 hover:bg-red-600 buttonWrapper"
          @click="currentTill = []"
          v-if="!showQuickItems"
        >
          <font-awesome-icon
            icon="fa-solid fa-xmarks-lines"
            class="buttonIcon"
          />
        </button>

        <!-- Pop -->
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
          v-if="showQuickItems"
          @click="$emit('addItem', 5)"
        >
          <img src="../assets/img/pop.png" class="buttonIcon" />
        </button>

        <!-- col 3 -->
        <!-- Price Override -->
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
          @click="flipPriceOverrideModal"
          v-if="!showQuickItems"
        >
          <font-awesome-icon icon="fa-solid fa-money-bill" class="buttonIcon" />
        </button>

        <!-- Can -->
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
          v-if="showQuickItems"
          @click="$emit('addItem', 6)"
        >
          <img src="../assets/img/can.png" class="buttonIcon" />
        </button>

        <!-- Stock Check -->
        <button
          type="button"
          class="bg-yellow-500 hover:bg-yellow-600 buttonWrapper"
          @click="checkStock"
          v-if="!showQuickItems"
        >
          <font-awesome-icon icon="fa-solid fa-dolly" class="buttonIcon" />
        </button>

        <!-- Sausage -->
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
          v-if="showQuickItems"
          @click="$emit('addItem', 7)"
        >
          <img src="../assets/img/sausage.png" class="buttonIcon" />
        </button>

        <!-- Discount -->
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
          @click="flipDiscountOverrideModal"
          v-if="!showQuickItems"
        >
          <font-awesome-icon icon="fa-solid fa-percent" class="buttonIcon" />
        </button>

        <!-- Straw -->
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
          v-if="showQuickItems"
          @click="$emit('addItem', 8)"
        >
          <img src="../assets/img/straw.png" class="buttonIcon" />
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
  @apply h-full w-full rounded-lg text-white text-6xl flex justify-center flex-grow-0;
}
</style>

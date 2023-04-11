<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['currentTill'])
const emit = defineEmits(['update:currentTill'])

// Makes currentTill a computed value to allow for two-way binding
const currentTill = computed({
  get() {
    return props.currentTill
  },
  set(value) {
    emit('update:currentTill', value)
  },
})

let currentWaiting = ref(false)
let paid = false
let orderCreateQueryJSON = {}

async function total() {
  // If till is not empty, run the total
  if (props.currentTill !== [] && currentWaiting.value !== true) {
    // Create the items array
    let items = []

    // Loop through the current till, to create the items array
    for (const i of props.currentTill) {
      let tmp = {}

      tmp['EAN'] = i[0]

      tmp['Quantity'] = i[2]

      // If discount is greater than 0, add it to the item
      if (i[4] > 0) {
        tmp['Discount'] = i[4]
      }

      // Add custom price if custom price flag is true
      if (i[5] == true) {
        tmp['customPrice'] = i[3]
      }

      // Mark as refund if refund flag is true
      if (i[6] == true) {
        tmp['isSale'] = false
      }

      // Push the item to the items array
      items.push(tmp)
    }

    // Creates the order via the backend
    const orderCreateQuery = await fetch('http://localhost:5200/orderCreate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderItems: items,
      }),
    })

    // Converts the results to JSON
    orderCreateQueryJSON = await orderCreateQuery.json()

    // Logs the payment link
    console.log(orderCreateQueryJSON.paymentLink)

    console.log(orderCreateQueryJSON.order_id)

    if (orderCreateQueryJSON.paymentLink !== undefined) {
      awaitPayment()
    }
  } else if (currentWaiting.value == true) {
    console.log('Already waiting for payment')
  } else {
    console.log('Till is empty')
  }
}

async function awaitPayment() {
  currentWaiting.value = true

  // Check if payment is done
  while ((await checkPayment()) == false && currentWaiting.value == true) {
    await new Promise((r) => setTimeout(r, 100))
  }

  // Payment is done, reset the till
  currentWaiting.value = false
  console.log('Payment done, resetting till')
  if (paid == true) {
    currentTill.value = []
    paid = false
  }
}

async function checkPayment() {
  const paymentCheckQuery = await fetch('http://localhost:5200/paymentCheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderID: orderCreateQueryJSON.order_id,
    }),
  })
  const paymentCheckQueryJSON = await paymentCheckQuery.json()

  if (paymentCheckQueryJSON == true) {
    paid = true
    return true
  } else {
    return false
  }
}

async function cancelPayment() {
  const cancelOrderQuery = await fetch('http://localhost:5200/cancelOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderID: orderCreateQueryJSON.order_id,
    }),
  })

  const cancelOrderQueryJSON = await cancelOrderQuery.json()

  if (cancelOrderQueryJSON == 'Order cancelled') {
    console.log('Payment cancelled')
    currentWaiting.value = false
    paid = false
  } else {
    console.log(cancelOrderQueryJSON)
  }
}
</script>

<template>
  <div
    class="h-[calc(100%_-_0.5rem)] w-[calc(100%_-_0.75rem)] ml-1 mr-2 mb-1 flex"
  >
    <button
      type="button"
      class="w-full h-full text-white bg-green-500 rounded-lg hover:bg-green-600"
      @click="total"
      v-if="currentWaiting == false"
    >
      <font-awesome-icon icon="fa-solid fa-check" class="h-[6vw] w-[6vw]" />
    </button>
    <button
      type="button"
      class="w-full h-full text-white bg-red-500 rounded-lg hover:bg-red-600"
      @click="cancelPayment"
      v-if="currentWaiting == true"
    >
      <font-awesome-icon
        icon="fa-solid fa-hourglass"
        class="h-[6vw] w-[6vw]"
        shake
      />
    </button>
  </div>
</template>

<style scoped></style>

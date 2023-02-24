<script setup>
const props = defineProps(['currentTill'])

async function total() {
  // If till is not empty, run the total
  if (props.currentTill !== []) {
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
    const orderCreateQueryJSON = await orderCreateQuery.json()

    console.log(orderCreateQueryJSON)

    // Logs the payment link
    console.log(orderCreateQueryJSON.paymentLink)

    // Logs the order ID
    console.log(orderCreateQueryJSON.order_id)
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
    >
      <font-awesome-icon icon="fa-solid fa-check" class="h-[6vw] w-[6vw]" />
    </button>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref, watch } from 'vue'
import io from 'socket.io-client'
import CurrentTable from '../components/currentTable.vue'
import VueQrcode from 'vue-qrcode'

const socket = io('http://localhost:5200') // replace with your server URL

// Create ref for currentTill, currentSelected and paymentURL
const currentTill = ref([])
const currentSelected = ref('')
const paymentURL = ref(false)

function vw(percent) {
  return screen.availWidth * (percent / 100)
}

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('currentTill', (data) => {
  currentTill.value = data
})

socket.on('currentSelected', (data) => {
  currentSelected.value = data
})

socket.on('paymentURL', (data) => {
  if (data == 'Payment cancelled' || data == 'Payment complete') {
    paymentURL.value = false
  } else {
    paymentURL.value = data
  }
})

watch(
  () => currentSelected.value,
  (data) => {
    socket.emit('currentSelected', data)
  },
  { deep: true }
)
</script>

<template>
  <div class="w-screen h-screen">
    <div class="w-full h-full" v-if="!paymentURL">
      <current-table
        :current-till="currentTill"
        v-model:currentSelected="currentSelected"
      />
    </div>
    <div class="flex items-center justify-center w-full h-full" v-else>
      <div class="flex flex-col items-center">
        <!-- Display the total amount to pay from currentTill -->
        <p class="text-[6vw]">
          Total: €{{
            currentTill
              .reduce((a, b) => a + (b[3] - b[3] * (b[4] / 100)) * b[2], 0)
              .toFixed(2)
          }}
        </p>
        <vue-qrcode
          :value="paymentURL"
          :width="vw(20)"
          margin="1"
          color="00"
          type="image/png"
        ></vue-qrcode>
        <p class="text-[6vw]">Scan the QR code to pay</p>
      </div>
    </div>
  </div>
</template>

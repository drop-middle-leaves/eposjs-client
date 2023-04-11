<script setup>
import { ref } from 'vue'
import io from 'socket.io-client'

const message = ref('')

const socket = io('http://localhost:5200') // replace with your server URL

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('data', (data) => {
  message.value = data
  console.log(data)
})

const sendMessage = () => {
  socket.emit('data', 'Hello from Vue.js 3')
}
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

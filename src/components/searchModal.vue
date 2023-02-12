<script setup>
</script>

<template>
  <Transition name="modal">
    <div class="fixed top-0 left-0 h-full w-full bg-black/50 shadow-gray-300 transition-all flex">
      <div class="w-1/3 m-auto shadow-gray-300 border-2 bg-white py-3 px-2 rounded-lg">
        <div class="mt-0 w-full">
          <slot name="header">
            <h1 class="text-5xl font-bold mt-0 mb-6">Search Results</h1>
          </slot>
        </div>

        <div class="my-3">
          <slot name="body">default body</slot>
        </div>

        <button class="bg-red-500 mt-3 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="$emit('close')">
          Close
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
</style>
<script setup>
</script>

<template>
  <div class="h-[calc(100%_-_0.5rem)] w-[calc(100%_-_0.75rem)] ml-2 mr-1 mb-1 flex">
    <button type="button" @click="$emit('goSearch')" class="text-white bg-yellow-500 hover:bg-yellow-600 text-6xl rounded-lg h-full w-full">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="h-[4rem] w-[4rem]" />
    </button>
  </div>
</template>

<style scoped>
</style>

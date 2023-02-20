<script setup></script>

<template>
  <div
    class="h-[calc(100%_-_0.5rem)] w-[calc(100%_-_0.75rem)] ml-2 mr-1 mb-1 flex"
  >
    <button
      type="button"
      @click="$emit('goSearch')"
      class="w-full h-full text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
    >
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        class="h-[6vw] w-[6vw]"
      />
    </button>
  </div>
</template>

<style scoped></style>

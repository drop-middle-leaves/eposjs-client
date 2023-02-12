<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="h-full w-full flex justify-center">
    <div class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] border-2 border-gray-200 rounded-lg self-center">
      <input class="h-full w-full rounded-lg text-6xl" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" placeholder="Enter EAN or Search Term"/>
    </div>
  </div>
</template>

<style scoped>
</style>

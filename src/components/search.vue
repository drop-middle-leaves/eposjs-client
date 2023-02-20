<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex justify-center w-full h-full">
    <div
      class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] border-2 border-gray-200 rounded-lg self-center"
    >
      <input
        class="w-full h-full text-6xl rounded-lg"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Enter EAN or Search Term"
      />
    </div>
  </div>
</template>

<style scoped></style>

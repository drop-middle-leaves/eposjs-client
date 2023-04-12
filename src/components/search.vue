<script setup>
import { computed } from 'vue'

// Defines props and emits
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'addItem'])

// Defines value as the computed value of qty
const search = computed({
  get() {
    return props.modelValue
  },
})

// Function to emit contents of text input
const addItem = () => {
  console.log(search.value)
  emit('addItem', search.value)
}
</script>

<template>
  <div class="flex justify-center w-full h-full">
    <div
      class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] border-2 border-gray-200 rounded-lg self-center"
    >
      <input
        class="w-full h-full text-[4vw] rounded-lg"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keypress.enter="addItem()"
        placeholder="Enter EAN or Search Term"
      />
    </div>
  </div>
</template>

<style scoped></style>
§

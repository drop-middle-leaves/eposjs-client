<script setup>
import { computed } from 'vue'

// Defines props and emits
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

// Defines value as the computed value of qty
const qty = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

// Updates current val by adding the number passed in
function updateValBy(num) {
  // Max length of 3 to prevent GUI overflow (also not a good idea to accidentally buy 3000 Irn Brus)
  if (qty.value.length === 3) {
    // If the current value is 3 digits, replace it with the number
    qty.value = '' + num
  } else if (qty.value === '0') {
    // If the current value is 0, replace it with the number
    qty.value = '' + num
  } else {
    qty.value = qty.value + num
  }
}

// Clears current val
function clearVal() {
  qty.value = ''
}
</script>

<template>
  <div
    class="w-full h-full max-w-full max-h-full min-w-0 min-h-0 overflow-auto"
  >
    <!-- Creates outer border -->
    <div
      class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] self-center flex justify-center"
    >
      <div class="flex-col flex h-full aspect-[4/3] gap-2 shrink">
        <div class="flex flex-row w-full gap-2 h-1/3 shrink">
          <div class="buttonWrapper border-4 border-purple-600 text-[5.375rem]">
            <p class="self-center">{{ qty }}</p>
          </div>
          <div class="buttonWrapper" @click="updateValBy(1)">
            <button class="button">1</button>
          </div>
          <div class="buttonWrapper" @click="updateValBy(2)">
            <button class="button">2</button>
          </div>
          <div class="buttonWrapper" @click="updateValBy(3)">
            <button class="button">3</button>
          </div>
        </div>

        <div class="flex flex-row w-full gap-2 h-1/3 shrink">
          <div class="buttonWrapper">
            <button class="button" @click="updateValBy(0)">0</button>
          </div>
          <div class="buttonWrapper">
            <button class="button" @click="updateValBy(4)">4</button>
          </div>
          <div class="buttonWrapper">
            <button class="button" @click="updateValBy(5)">5</button>
          </div>
          <div class="buttonWrapper">
            <button class="button" @click="updateValBy(6)">6</button>
          </div>
        </div>

        <div class="flex flex-row w-full gap-2 h-1/3 shrink">
          <div class="buttonWrapper">
            <button
              class="h-full w-full rounded-full bg-red-500 hover:bg-red-600 text-white text-[4rem]"
              @click="clearVal"
            >
              Clear
            </button>
          </div>
          <div class="buttonWrapper">
            <button class="button" @click="updateValBy(7)">7</button>
          </div>
          <div class="buttonWrapper">
            <button class="button" @click="updateValBy(8)">8</button>
          </div>
          <div class="buttonWrapper">
            <button class="button" @click="updateValBy(9)">9</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.button {
  @apply rounded-full bg-purple-500 hover:bg-purple-600 text-[5.5rem] h-full w-full text-white shrink;
}

.buttonWrapper {
  @apply flex-col h-full aspect-square flex justify-center rounded-full place-items-center;
}
</style>

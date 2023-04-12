<script setup>
import { computed } from 'vue'

const props = defineProps(['currentTill', 'currentSelected'])
const emit = defineEmits(['update:currentSelected'])

// Defines value as the computed value of qty
const currentSelected = computed({
  get() {
    return props.currentSelected
  },
  set(value) {
    emit('update:currentSelected', value)
  },
})

function selectItem(item) {
  if (currentSelected.value === item) {
    currentSelected.value = ''
  } else {
    currentSelected.value = item
  }
}
</script>

<template>
  <div class="flex justify-center w-full h-full">
    <div
      class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] border-2 border-gray-200 overflow-y-auto scrollbar scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300 rounded-lg self-center"
    >
      <slot name="table">
        <table class="w-full text-[2.5vw] text-left table-auto">
          <thead class="bg-gray-300 border-collapse">
            <tr>
              <th class="px-4 py-2">Item</th>
              <th class="px-4 py-2">Qty</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="i in props.currentTill"
              :class="{
                'select-color':
                  props.currentTill.indexOf(i) === currentSelected,
              }"
              @click="selectItem(props.currentTill.indexOf(i))"
            >
              <th class="px-4 py-2 border-t-2 border-gray-200">{{ i[1] }}</th>
              <td class="px-4 py-2 border-t-2 border-l-2 border-gray-200">
                {{ i[2] }}
              </td>
              <td class="px-4 py-2 border-t-2 border-l-2 border-gray-200">
                €{{ (i[3] - i[3] * (i[4] / 100)).toFixed(2) }}
              </td>
              <td class="px-4 py-2 border-t-2 border-l-2 border-gray-200">
                €{{ ((i[3] - i[3] * (i[4] / 100)) * i[2]).toFixed(2) }}
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-gray-300 border-collapse">
            <!-- Total -->
            <tr>
              <th class="px-4 py-2">Total</th>
              <td class="px-4 py-2">
                {{ props.currentTill.reduce((a, b) => a + b[2], 0) }}
              </td>
              <td class="px-4 py-2"></td>
              <td class="px-4 py-2">
                €{{
                  props.currentTill
                    .reduce(
                      (a, b) => a + (b[3] - b[3] * (b[4] / 100)) * b[2],
                      0
                    )
                    .toFixed(2)
                }}
              </td>
            </tr>
          </tfoot>
        </table>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.select-color {
  background-color: #d4edda;
}
</style>

<script setup>
const props = defineProps(['currentTill'])
</script>

<template>
  <div class="flex justify-center w-full h-full">
    <div
      class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] border-2 border-gray-200 overflow-y-auto scrollbar scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300 rounded-lg self-center"
    >
      <slot name="table">
        <table class="w-full text-5xl text-left table-auto">
          <thead class="bg-gray-300 border-collapse">
            <tr>
              <th class="px-4 py-2">Item</th>
              <th class="px-4 py-2">Qty</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in props.currentTill">
              <th class="px-4 py-2 border-t-2 border-gray-200">{{ i[0] }}</th>
              <td class="px-4 py-2 border-t-2 border-l-2 border-gray-200">
                {{ i[1] }}
              </td>
              <td class="px-4 py-2 border-t-2 border-l-2 border-gray-200">
                €{{ i[2].toFixed(2) }}
              </td>
              <td class="px-4 py-2 border-t-2 border-l-2 border-gray-200">
                €{{ (i[2] * i[1]).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </slot>
    </div>
  </div>
</template>

<style scoped></style>

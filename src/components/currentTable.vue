<script setup>
const props = defineProps(['currentTill'])

</script>

<template>
  <div class="h-full w-full flex justify-center">
    <div class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] border-2 border-gray-200 overflow-y-auto scrollbar scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300 rounded-lg self-center">
      <slot name="table">
        <table class="table-auto w-full text-5xl text-left">
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
              <th class="border-t-2 border-gray-200 px-4 py-2">{{ i[0] }}</th>
              <td class="border-t-2 border-l-2 border-gray-200 px-4 py-2">{{ i[1] }}</td>
              <td class="border-t-2 border-l-2 border-gray-200 px-4 py-2">€{{ i[2].toFixed(2) }}</td>
              <td class="border-t-2 border-l-2 border-gray-200 px-4 py-2">€{{ (i[2] * i[1]).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </slot>
    </div>
  </div>

</template>

<style scoped>

</style>

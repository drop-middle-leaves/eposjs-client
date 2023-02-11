<script setup>
</script>

<template>
  <div class="h-full w-full flex justify-center">
    <div class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] border overflow-y-scroll scrollbar scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300 rounded-lg self-center">
      <table class="table-auto w-full">
        <thead class="bg-gray-500">
          <tr>
            <th class="px-4 py-2">Item</th>
            <th class="px-4 py-2">Qty</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 20">
            <th class="border px-4 py-2">Irn Bru {{ i }}</th>
            <td class="border px-4 py-2">1</td>
            <td class="border px-4 py-2">1.00</td>
            <td class="border px-4 py-2">1.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped>

</style>

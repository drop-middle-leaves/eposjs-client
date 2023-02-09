<script setup>
import CurrentTable from "@/components/currentTable.vue";
import SearchTotal from "@/components/searchTotal.vue";
</script>

<template>
  <div id="app" class="flex h-screen w-screen justify-center">
    <div class="flex h-[calc(100vh_-_1rem)] w-[calc(100vw_-_1rem)] self-center">
      <div class="flex-row h-1/2 w-full">
        <div class="flex-col h-full w-full">
          <current-table />
        </div>
        <div class="flex-col h-full w-full">
          <div class="bg-red-500 h-full w-full">hello</div>
        </div>
      </div>
      <div class="flex-row h-1/2 w-full">
        <div class="flex-col h-full w-full">
          <search-total />
        </div>
        <div class="flex-col h-full w-full">
          <div class="bg-green-500 h-full w-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
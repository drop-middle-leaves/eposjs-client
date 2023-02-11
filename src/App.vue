<script setup>
import currentTable from "@/components/currentTable.vue";
import search from "@/components/search.vue";
import searchButton from "@/components/search-button.vue";
import total from "@/components/total.vue";
</script>

<template>
  <!-- mounts to main.js, makes the size the size of the screen -->
  <div id="app" class="h-screen w-screen">
    <!-- creates the 1st row -->
    <div class="flex-row flex h-1/2 w-full">
      <!-- creates the 1st column of the first row -->
      <div class="flex-col h-full w-full">
        <current-table />
      </div>
      <!-- creates the 2nd column of the first row -->
      <div class="flex-col flex h-full w-full">
        <!-- creates the area for the search box (first row, second column -> first row) -->
        <div class="flex-row h-1/2 w-full flex justify-center">
          <search />
        </div>
        <!-- creates a second row (first row, second column -> second row) -->
        <div class="flex-row flex h-1/2 w-full">
          <!-- creates the first column ^ -->
          <div class="flex-col h-full w-1/2 flex justify-center">
            <total />
          </div>
          <!-- creates the second column ^ -->
          <div class="flex-col h-full w-1/2 flex justify-center">
            <search-button />
          </div>
        </div>
      </div>
    </div>
    <!-- creates the second row -->
    <div class="flex-row flex h-1/2 w-full">
      <!-- creates the first column of the second row -->
      <div class="flex-col h-full w-full">
        <div class="bg-green-500 h-full w-full"></div>
      </div>
      <!-- creates the second column of the second row -->
      <div class="flex-col h-full w-full">
        <div class="bg-red-500 h-full w-full"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
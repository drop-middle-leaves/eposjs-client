<script setup>
import CurrentTable from "@/components/currentTable.vue";
import SearchTotal from "@/components/searchTotal.vue";
</script>

<template>
  <!-- mounts to main.js, centralises the container containing the grid to allow for container -->
  <div id="app" class="flex h-screen w-screen justify-center">
    <!-- creates the outside container, creating the outside margin -->
    <div class="h-[calc(100vh_-_1rem)] w-[calc(100vw_-_1rem)] self-center">
      <!-- creates the 1st row -->
      <div class="flex-row flex h-1/2 w-full">
        <!-- creates the 1st column of the first row -->
        <div class="flex-col h-full w-full">
          <current-table />
        </div>
        <!-- creates the 2nd column of the first row -->
        <div class="flex-col flex h-full w-full">
          <!-- creates the area for the search box (first row, second column -> first row) -->
          <div class="flex-row h-1/2 w-full bg-cyan-500">yo</div>
          <!-- creates a second row (first row, second column -> second row) -->
          <div class="flex-row flex h-1/2 w-full">
            <!-- creates the first column ^ -->
            <div class="flex-col h-full w-1/2 bg-amber-500">whats up</div>
            <!-- creates the second column ^ -->
            <div class="flex-col h-full w-1/2 bg-gray-500">fuzz nut</div>
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
  </div>
</template>

<style scoped>
</style>
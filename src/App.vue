<script setup>
import CurrentTable from "@/components/currentTable.vue";
import Search from "@/components/search.vue";
import SearchButton from "@/components/searchButton.vue";
import Total from "@/components/total.vue";
import QuickActions from "@/components/quickActions.vue";
import Keypad from "@/components/keypad.vue";
import SearchModal from "@/components/searchModal.vue";

import { ref } from "vue";

let showSearchModal = ref(true);

function flipModal(x) {
  switch(x) {
    case true:
      console.log("test")
      showSearchModal.value = true;
      break;
    case false:
      showSearchModal.value = false;
      break;
  }
}

</script>

<template>
  <!-- mounts to main.js, makes the size the size of the screen -->
  <div id="app" class="h-screen w-screen">
    <!-- creates the search modal -->
    <search-modal @close="flipModal(false)" v-if="showSearchModal" />
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
            <search-button @goSearch="flipModal(true)" />
          </div>
          <!-- creates the second column ^ -->
          <div class="flex-col h-full w-1/2 flex justify-center">
            <total />
          </div>
        </div>
      </div>
    </div>
    <!-- creates the second row -->
    <div class="flex-row flex h-1/2 w-full">
      <!-- creates the first column of the second row -->
      <div class="flex-col h-full w-full">
        <quick-actions />
      </div>
      <!-- creates the second column of the second row -->
      <div class="flex-col h-full w-full">
        <keypad />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
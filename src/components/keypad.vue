<script setup>

import { ref } from 'vue';

// Sets current val to be blank
const currentVal = ref("");

// Updates current val by adding the number passed in
function updateValBy(num) {
  // Max length of 3 to prevent GUI overflow (also not a good idea to accidentally buy 3000 Irn Brus)
  if (currentVal.value.length === 3) {
    currentVal.value = "" + num;
  } else {
    currentVal.value = "" + currentVal.value + num;
  }
}

// Clears current val
function clearVal() {
  currentVal.value = "";
}

</script>

<template>
  <div class="h-full w-full flex justify-center">
    <!-- Creates outer border -->
    <div class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] self-center flex justify-center">
      <div class="flex-col flex h-full aspect-[4/3] gap-2">

        <div class="flex-row flex h-1/3 w-full gap-2">
          <div class="buttonWrapper border-4 border-purple-600 text-6xl">
            <p class="self-center">{{currentVal}}</p>
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

        <div class="flex-row flex h-1/3 w-full gap-2">
          <div class="buttonWrapper ">
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

        <div class="flex-row flex h-1/3 w-full gap-2">
          <div class="buttonWrapper ">
            <button class="h-full w-full rounded-full bg-red-500 hover:bg-red-600 text-white text-5xl" @click="clearVal">Clear</button>
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
  @apply rounded-full bg-purple-500 hover:bg-purple-600 text-6xl h-full w-full text-white;
}

.buttonWrapper {
  @apply flex-col h-full aspect-square flex justify-center rounded-full;
}
</style>

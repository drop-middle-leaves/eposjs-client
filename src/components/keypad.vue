<script setup>
</script>

<template>
  <div class="h-full w-full flex justify-center">
    <!-- Creates outer border -->
    <div class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] self-center flex justify-center">
      <div class="flex-col flex h-full aspect-[4/3] gap-2">

        <div class="flex-row flex h-1/3 w-full gap-2">
          <div class="flex-col h-full aspect-square flex justify-center border-4 border-purple-600 rounded-full text-6xl flex justify-center">
            <p class="self-center">300</p>
          </div>
          <div class="flex-col h-full aspect-square flex justify-center">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">1</button>
          </div>
          <div class="flex-col h-full aspect-square flex justify-center">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">2</button>
          </div>
          <div class="flex-col h-full aspect-square flex justify-center">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">3</button>
          </div>
        </div>

        <div class="flex-row flex h-1/3 w-full gap-2">
          <div class="flex-col h-full aspect-square flex justify-center ">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">0</button>
          </div>
          <div class="flex-col h-full aspect-square flex justify-center">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">4</button>
          </div>
          <div class="flex-col h-full aspect-square flex justify-center">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">5</button>
          </div>
          <div class="flex-col h-full aspect-square flex justify-center">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">6</button>
          </div>
        </div>

        <div class="flex-row flex h-1/3 w-full gap-2">
          <div class="flex-col h-full aspect-square flex justify-center ">
            <button class="h-full w-full rounded-full bg-red-500 hover:bg-red-600 text-white text-5xl">Clear</button>
          </div>
          <div class="flex-col h-full aspect-square flex justify-center">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">7</button>
          </div>
          <div class="flex-col h-full aspect-square flex justify-center">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">8</button>
          </div>
          <div class="flex-col h-full aspect-square flex justify-center">
            <button class="h-full w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white text-6xl">9</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

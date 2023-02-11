<script setup>
</script>

<template>
  <div class="h-full w-full flex justify-center">
    <!-- Creates outer border -->
    <div class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] rounded-lg self-center">
      <!-- Creates grid -->
      <div class="grid grid-rows-3 grid-flow-col gap-2 h-full w-full flex">
        <!-- col 1 -->
        <button type="button" class="text-white bg-orange-500 hover:bg-orange-600 text-6xl rounded-lg h-full w-full">
          <font-awesome-icon icon="fa-solid fa-hammer" class="buttonIcon" />
        </button>
        <button type="button" class="text-white bg-cyan-500 hover:bg-cyan-600 text-6xl rounded-lg h-full w-full">
          <font-awesome-icon icon="fa-solid fa-shopping-bag" class="buttonIcon" />
        </button>
        <button type="button" class="text-white bg-orange-500 hover:bg-orange-600 text-6xl rounded-lg h-full w-full">
          <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" class="buttonIcon" />
        </button>

        <!-- col 2 -->
        <button type="button" class="text-white bg-red-500 hover:bg-red-600 text-6xl rounded-lg h-full w-full">
          <font-awesome-icon icon="fa-solid fa-xmark" class="buttonIcon" />
        </button>
        <button type="button" class="text-white bg-cyan-500 hover:bg-cyan-600 text-6xl rounded-lg h-full w-full">
          <font-awesome-icon icon="fa-solid fa-bars" class="buttonIcon" />
        </button>
        <button type="button" class="text-white bg-red-500 hover:bg-red-600 text-6xl rounded-lg h-full w-full">
          <font-awesome-icon icon="fa-solid fa-xmarks-lines" class="buttonIcon" />
        </button>

        <!-- col 3 -->
        <button type="button" class="text-white bg-orange-500 hover:bg-orange-600 text-6xl rounded-lg h-full w-full">
          <font-awesome-icon icon="fa-solid fa-money-bill" class="buttonIcon" />
        </button>
        <button type="button" class="text-white bg-yellow-500 hover:bg-yellow-600 text-6xl rounded-lg h-full w-full">
          <font-awesome-icon icon="fa-solid fa-dolly" class="buttonIcon" />
        </button>
        <button type="button" class="text-white bg-orange-500 hover:bg-orange-600 text-6xl rounded-lg h-full w-full">
          <font-awesome-icon icon="fa-solid fa-percent" class="buttonIcon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buttonIcon {
  height: 3.5rem;
  width: 3.5rem;
}
</style>
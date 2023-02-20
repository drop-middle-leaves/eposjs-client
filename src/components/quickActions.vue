<script setup></script>

<template>
  <div class="flex justify-center w-full h-full">
    <!-- Creates outer border -->
    <div
      class="h-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] rounded-lg self-center"
    >
      <!-- Creates grid -->
      <div class="grid w-full h-full grid-flow-col grid-rows-3 gap-2">
        <!-- col 1 -->
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
        >
          <font-awesome-icon icon="fa-solid fa-hammer" class="buttonIcon" />
        </button>
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
        >
          <font-awesome-icon
            icon="fa-solid fa-shopping-bag"
            class="buttonIcon"
          />
        </button>
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
        >
          <font-awesome-icon
            icon="fa-solid fa-arrow-rotate-left"
            class="buttonIcon"
          />
        </button>

        <!-- col 2 -->
        <button type="button" class="bg-red-500 hover:bg-red-600 buttonWrapper">
          <font-awesome-icon icon="fa-solid fa-xmark" class="buttonIcon" />
        </button>
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 buttonWrapper"
        >
          <font-awesome-icon icon="fa-solid fa-bars" class="buttonIcon" />
        </button>
        <button type="button" class="bg-red-500 hover:bg-red-600 buttonWrapper">
          <font-awesome-icon
            icon="fa-solid fa-xmarks-lines"
            class="buttonIcon"
          />
        </button>

        <!-- col 3 -->
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
        >
          <font-awesome-icon icon="fa-solid fa-money-bill" class="buttonIcon" />
        </button>
        <button
          type="button"
          class="bg-yellow-500 hover:bg-yellow-600 buttonWrapper"
        >
          <font-awesome-icon icon="fa-solid fa-dolly" class="buttonIcon" />
        </button>
        <button
          type="button"
          class="bg-orange-500 hover:bg-orange-600 buttonWrapper"
        >
          <font-awesome-icon icon="fa-solid fa-percent" class="buttonIcon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.buttonIcon {
  @apply h-[5.5rem] w-[5.5rem] aspect-square self-center;
}
.buttonWrapper {
  @apply h-full w-full rounded-lg text-white text-6xl flex justify-center;
}
</style>

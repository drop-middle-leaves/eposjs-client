<script setup></script>

<template>
  <div
    class="fixed top-0 left-0 flex w-full h-full transition-all bg-black/50 shadow-gray-300"
  >
    <div
      class="w-1/2 max-h-full px-2 py-3 m-auto overflow-y-auto bg-white border-2 rounded-lg shadow-gray-300 scrollbar scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300"
    >
      <div class="w-full mt-0">
        <slot name="header">
          <h1 class="mt-0 mb-6 text-6xl font-bold">default header</h1>
        </slot>
      </div>

      <div>
        <slot name="body">default body</slot>
      </div>
      <slot name="footer">
        <div class="flex justify-center w-full h-full">
          <button
            type="button"
            @click="$emit('close')"
            class="w-[calc(100%_-_0.5rem)] h-[8vw] mx-1 mt-3 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            <font-awesome-icon
              icon="fa-solid fa-times"
              class="h-[6vw] w-[6vw]"
            />
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped></style>

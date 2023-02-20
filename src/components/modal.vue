<script setup></script>

<template>
  <Transition name="modal">
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

        <button
          class="px-8 py-6 mx-6 my-6 mt-3 text-5xl font-bold text-white bg-red-500 rounded-lg hover:bg-red-700"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>

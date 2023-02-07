<script setup>
import searchTotal from './components/searchTotal.vue'
</script>

<template>
  <body>
  <div id="app">
    <div class="container-fluid vh-100">
      <div class="row h-50">
        <div class="col-6">
          <div class="box w-100">
            <p>test</p>
          </div>
        </div>
        <div class="col-6" >
          <searchTotal/>
        </div>
      </div>
      <div class="row h-50">
        <div class=" col-6">
          <div class="box w-100">
            <p>test</p>
          </div>
        </div>
        <div class="col-6">
          <div class="box w-100">
            <p>test</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<style scoped>
.box {
  background-color: red;
  width: 100%;
  height: 100%;
}
</style>

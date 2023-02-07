<script setup>
import CurrentTable from "@/components/currentTable.vue";
import SearchTotal from "@/components/searchTotal.vue";
</script>

<template>
  <body>
  <div id="app">
    <div class="container-fluid vh-100">
      <div class="row h-50 g-2">
        <div class="col-6">
          <current-table/>
        </div>
        <div class="col-6" >
          <div class="h-100 w-100">
            <search-total/>
          </div>
        </div>
      </div>
      <div class="row h-50 g-2">
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

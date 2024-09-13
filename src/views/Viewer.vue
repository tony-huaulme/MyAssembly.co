<template>
  <div class="container">
    <ModelControl @control-model="handleControl" />
    <ModelViewer ref="modelViewerRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ModelViewer from '../components/Model/ModelViewer.vue';
import ModelControl from '../components/Model/ModelControl.vue';

const modelViewerRef = ref(null);

const handleControl = (arg) => {
  modelViewerRef.value.handleControl(arg);
};


</script>

<style>
.container {
  display: flex;
  height: 100vh;
}
</style>

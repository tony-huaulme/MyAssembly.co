<template>
  <div class="h-screen w-screen flex">
    <ModelControl @control-model="handleControl" />
    <ModelViewer ref="modelViewerRef" :modelUrl="modelUrl"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import ModelViewer from '../components/Model/ModelViewer.vue';
import ModelControl from '../components/Model/ModelControl.vue';


// setting the model URL
const modelUrl = ref("https://myassembly.co/src/assets/glbModel/MyAssemblyDemoBIGscale.glb");

// pass controle from ModelControl to ModelViewer
const modelViewerRef = ref(null);

const handleControl = (arg) => {
  modelViewerRef.value.handleControl(arg);
};


</script>
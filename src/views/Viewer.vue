<template>
  <FullScreenToggle />
  <div class="h-screen w-screen flex">
    <ModelControl @control-model="handleControl" />
    <ModelViewer ref="modelViewerRef" :modelUrl="modelUrl"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import FullScreenToggle from '../components/FullScreenToggle.vue';
import ModelViewer from '../components/Model/ModelViewer.vue';
import ModelControl from '../components/Model/ModelControl.vue';

// gett model name in url params
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Get the query params from the current route
const route = useRoute();

const modelUrl = computed(() => `https://myassembly.co/src/assets/glbModel/${route.query.modelName}.glb`);;
const cameFromDashboard = computed(() => route.query.from === 'dashboard'); 
// pass controle from ModelControl to ModelViewer
const modelViewerRef = ref(null);

const handleControl = (arg) => {
  modelViewerRef.value.handleControl(arg);
};


</script>
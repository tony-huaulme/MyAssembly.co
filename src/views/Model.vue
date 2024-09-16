<template>
  <FullScreenToggle />
  <div class="h-screen w-screen flex">
    <ModelControl @control-model="handleControl" :buildingPanels="buildingPanels"/>
    <div ref="modelContainer" class="w-3/4 h-screen">
      <ModelViewer v-if="modelContainer" ref="modelViewerRef" :modelUrl="modelUrl" @model-loaded="setBuilding" :modelContainer="modelContainer"/>
    </div>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import FullScreenToggle from '../components/FullScreenToggle.vue';
import ModelViewer from '../components/Model/ModelViewer.vue';
import ModelControl from '../components/Model/ModelControl.vue';

import { Building } from '../ThreeJs/building/Building.js';
// Get the query params from the current route
const modelViewerRef = ref(null);
const modelContainer = ref(null);
const ModelBuilding = ref(null);
const buildingPanels = ref(false);
// Handling route params
const route = useRoute();

// get model name in url params 
const modelUrl = computed(() => `https://www.myassembly.co/src/assets/models/${route.query.modelName}.glb`);;
const cameFromDashboard = computed(() => route.query.from === 'dashboard'); 


// Data transfer between ModelControl and ModelViewer

// pass controle from ModelControl to ModelViewer
const handleControl = (arg) => {

  if(arg.controleName === 'showOnlyPanelByName') {
    ModelBuilding.value.showOnlyPanelByName(arg.arg);
  }

  modelViewerRef.value.handleControl(arg);
};

function setBuilding(model) {
  // B.value = new Building(model);
  ModelBuilding.value = new Building(model);
  let panels = ModelBuilding.value.getPanels();
  buildingPanels.value =  Object.keys( panels );
}

</script>
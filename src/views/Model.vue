<template>
  <FullScreenToggle />
  <div class="h-screen w-screen flex" 
    :class="{ 'flex-col-reverse': isPortrait, 'flex-row': !isPortrait }" 
    >
    <ModelControl class="overflow-auto p-3" 
      :class="{ 'h-1/3  w-screen': isPortrait, 'w-1/3 h-screen': !isPortrait }"
      @control-model="handleControl" 
      :buildingPanels="buildingPanels" 
      :panelBtnOnly="true"
    />
    <div ref="modelContainer" 
      :class="{ 'h-2/3 w-screen': isPortrait, 'w-2/3 h-screen': !isPortrait }"
    >   
      <ModelViewer v-if="modelContainer" ref="modelViewerRef" :modelUrl="modelUrl" @model-loaded="setBuilding" :modelContainer="modelContainer"/>
    </div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
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
const isPortrait = ref(false);
// Handling route params
const route = useRoute();

// get model name in url params  https://www.myassembly.co/src/assets/models/DemoModel.glb 
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
  buildingPanels.value = ModelBuilding.value.getPanelsByGroupsDict();
}


function detectOrientation() {
  isPortrait.value = window.innerHeight > window.innerWidth;
  console.log("Screen Orientation :",isPortrait.value ? "Portrait" : "Landscape");
}

onMounted(() => {
  detectOrientation();
  window.addEventListener('resize', detectOrientation);
});


</script>
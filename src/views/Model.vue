<template>
  <FullScreenToggle />
  <div class="h-screen w-screen flex md:flex-row flex-column-reverse">
    <ModelControl class="md:w-1/4 md:h-screen h-1/3 w-screen overflow-auto p-3" @control-model="handleControl" :buildingPanels="buildingPanels" :panelBtnOnly="true"/>
    <div ref="modelContainer" class="md:w-3/4 md:h-screen h-2/3">   
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

</script>
<template>
  <FullScreenToggle v-if="!modelInfosVisible"/>
  <ModelInfos 
    v-model:visible="modelInfosVisible" 
    v-model:isPortrait="isPortrait"
    v-model:activePanel="selectedPanelName"
  />
  <div class="h-screen w-screen flex" 
    :class="{ 'flex-col-reverse': isPortrait, 'flex-row': !isPortrait }" 
    >
    <ModelControl class="overflow-auto p-3" 
      :class="{ 'h-1/3  w-screen': isPortrait, 'w-1/3 h-screen': !isPortrait }"
      @control-model="handleControl"
      :buildingPanels="buildingPanels" 
      :panelBtnOnly="true"
      :modelName="modelName"
      @show-panel-info="modelInfosVisible=true"
    />
    <div ref="modelContainer" 
      :class="{ 'h-2/3 w-screen': isPortrait, 'w-2/3 h-screen': !isPortrait }"
    >   
      <ModelViewer 
        v-if="modelContainer" 
        ref="modelViewerRef" 
        :modelUrl="modelUrl" 
        :modelContainer="modelContainer"
        @model-loaded="setBuilding"
        @renderer-loaded="renderer= $event"
        @orbitControls-loaded="orbitControls= $event" 
      />
    </div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import FullScreenToggle from '../components/FullScreenToggle.vue';
import ModelViewer from '../components/Model/ModelViewer.vue';
import ModelControl from '../components/Model/ModelControl.vue';
import ModelInfos from '../components/Model/ModelInfos.vue';

import { Building } from '../ThreeJs/building/Building.js';
// Get the query params from the current route
const modelViewerRef = ref(null);
const modelContainer = ref(null);
const ModelBuilding = ref(null);
const buildingPanels = ref(false);
const isPortrait = ref(false);
const modelInfosVisible = ref(true);


// Model control
const selectedPanelName = ref('');

// Three.js objects
const orbitControls = ref(null);
const renderer = ref(null);

// Handling route params
const route = useRoute();
const modelName = ref(route.query.modelName);


// get model name in url params  https://www.myassembly.co/src/assets/models/DemoModel.glb 
const modelUrl = computed(() => `https://www.myassembly.co/src/assets/models/${modelName.value}.glb`);;
const cameFromDashboard = computed(() => route.query.from === 'dashboard'); 

// Data transfer between ModelControl and ModelViewer

// pass controle from ModelControl to ModelViewer
const handleControl = (arg) => {

  if(arg.controleName === 'showOnlyPanelByName') {
    ModelBuilding.value.showOnlyPanelByName(arg.arg);
    selectedPanelName.value = arg.arg;
  }

  if(arg.controleName === 'stopAutoRotate') {
    orbitControls.value.autoRotate = false;
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
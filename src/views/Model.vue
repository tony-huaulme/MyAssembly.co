<template>
  <FullScreenToggle v-if="!modelInfosVisible"/>
  
  <RouterLink v-if="modelName == 'DemoModel'" 
    :to="'/dashboard/projects?from=demo'" 
    class="get-started-btn absolute"
    :class="{ 'top-5 left-5': isPortrait, 'bottom-5 right-5': !isPortrait }"
    style=" border: none;"
    >        
    <Button style="border: none;">
        <slot>
            <p class="m-0" style="margin-right: 1ch;">{{ isPortrait ? '+ Create':'Create yours now !' }}</p>
        </slot>
    </Button>
  </RouterLink>

  <ModelInfos 
    v-model:visible="modelInfosVisible" 
    v-model:isPortrait="isPortrait"
    v-model:selectedPanelName="selectedPanelName"

  />
  <div class="h-screen w-screen flex" 
    :class="{ 'flex-col-reverse': isPortrait, 'flex-row': !isPortrait }" 
    >
    <ModelControl class="overflow-auto p-3" 
      v-if="buildingPanels != {} && buildingPanels"
      :class="{ 'h-1/3  w-screen': isPortrait, 'w-1/3 h-screen': !isPortrait }"
      :style="{ 'height:33vh': isPortrait, 'w-1/3 h-screen': !isPortrait }"
      @control-model="handleControl"
      @show-panel-info="modelInfosVisible=true"
      v-model:selectedPanelName="selectedPanelName"
      :buildingPanels="buildingPanels" 
      :panelBtnOnly="true"
      :projectName="modelName"
    />
    <div ref="modelContainer" 
      :class="{ 'h-2/3 w-screen': isPortrait, 'w-2/3 h-screen': !isPortrait }"
      :style="{ 'width:75vw;': !isPortrait }"
      @click="threeJsOrbitControls.autoRotate = false;"
    >   
      <ModelViewer 
        v-if="modelContainer" 
        ref="modelViewerRef" 
        :modelUrl="modelUrl" 
        :modelContainer="modelContainer"
        @model-loaded="setBuilding"
        @renderer-loaded="threeJsRenderer = $event"
        @orbitControls-loaded="threeJsOrbitControls = $event" 
        @camera-loaded="threeJsModelCamera = $event"
        @scene-loaded="threeJsScene = $event"
        @element-clicked="panelClicked = $event"
        @click="threeJsOrbitControls.autoRotate = false;"
        
      />
    </div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router'

import FullScreenToggle from '../components/FullScreenToggle.vue';
import ModelViewer from '../components/Model/ModelViewer.vue';
import ModelControl from '../components/Model/ModelControl.vue';
import ModelInfos from '../components/Model/ModelInfos.vue';

import { Building } from '../ThreeJs/building/Building.js';
// Get the query params from the current route
const modelViewerRef =    ref(null);
const modelContainer =    ref(null);
const ModelBuilding =     ref(null);
const buildingPanels =    ref(null);
const isPortrait =        ref(false);
const modelInfosVisible = ref(false);


// Model control
const selectedPanelName = ref('');
const panelClicked = ref(null);

// Three.js objects
const threeJsOrbitControls = ref(null);
const threeJsRenderer = ref(null);
const threeJsModel = ref(null);
const threeJsModelCamera = ref(null);
const threeJsScene = ref(null);

// Handling route params
const route = useRoute();
const modelName = ref(route.query.modelName);


// get model name in url params  https://www.myassembly.co/src/assets/models/DemoModel.glb 
const modelUrl = computed(() => `https://www.myassembly.co/src/assets/models/${modelName.value}.glb`);;
const cameFromDashboard = computed(() => route.query.from === 'dashboard'); 
// Data transfer between ModelControl and ModelViewer


watch(() => panelClicked.value, (newVal) => {
  if(newVal) {
    console.log('panelClicked', newVal);
    selectedPanelName.value = newVal;
    ModelBuilding.value.showOnlyPanelByName(newVal);
  }
});

// pass controle from ModelControl to ModelViewer
const handleControl = (arg) => {

  if(arg.controleName === 'showOnlyPanelByName') {
    ModelBuilding.value.showOnlyPanelByName(arg.arg);
    selectedPanelName.value = arg.arg;
  }

  if(arg.controleName === 'stopAutoRotate') {
    threeJsOrbitControls.value.autoRotate = false;
  }

  if(arg.controleName === 'startAutoRotate') {
    threeJsOrbitControls.value.autoRotate = true;
  }

  // showall panels
  if(arg.controleName === 'showAllPanels') {
    ModelBuilding.value.showAllPanels();
    selectedPanelName.value = '';
  }

  modelViewerRef.value.handleControl(arg);
};

function setBuilding(model) {
  // B.value = new Building(model);
  threeJsModel.value = model;
  ModelBuilding.value = new Building(model);
  buildingPanels.value = ModelBuilding.value.getPanelsByGroupsDict();
}


function detectOrientation() {
  isPortrait.value = window.innerHeight > window.innerWidth;
}

onMounted(() => {
  detectOrientation();
  window.addEventListener('resize', detectOrientation);
});


</script>

<style>



</style>
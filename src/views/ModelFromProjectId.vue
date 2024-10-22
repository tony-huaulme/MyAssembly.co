<template>
  <div v-if="noAccessToModel" class="h-screen w-screen flex flex-column items-center justify-center">
    <h1 class="text-3xl mb-5">No access to this model</h1>
    <!-- user pi-times in big size -->
    <i class="pi pi-times text-7xl"></i>
  </div>
  <div v-else>
    <FullScreenToggle v-if="!modelInfosVisible"/>
    <ModelInfos 
      v-model:visible="modelInfosVisible" 
      v-model:isPortrait="isPortrait"
      v-model:selectedPanelName="selectedPanelName"
    />
    <div class="h-screen w-screen flex" 
      :class="{ 'flex-col-reverse': isPortrait, 'flex-row': !isPortrait }" 
      >
      <ModelControl class="overflow-auto p-3" 
        :class="{ 'h-1/3  w-screen': isPortrait, 'w-1/3 h-screen': !isPortrait }"
        @control-model="handleControl"
        @show-panel-info="modelInfosVisible=true"
        v-model:selectedPanelName="selectedPanelName"
        :buildingPanels="buildingPanels" 
        :panelBtnOnly="true"
        :modelName="modelName"
      />
      <div ref="modelContainer" 
        :class="{ 'h-2/3 w-screen': isPortrait, 'w-2/3 h-screen': !isPortrait }"
      >   
        <ModelViewer 
          v-if="modelContainer && modelUrl" 
          ref="modelViewerRef" 
          :modelUrl="modelUrl" 
          :modelContainer="modelContainer"
          @model-loaded="setBuilding"
          @renderer-loaded="threeJsRenderer = $event"
          @orbitControls-loaded="threeJsOrbitControls = $event" 
          @camera-loaded="threeJsModelCamera = $event"
          @scene-loaded="threeJsScene = $event"
          @element-clicked="panelClicked = $event"
          
        />
      </div>
    </div>
  </div>

</template>

<script setup>

import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import FullScreenToggle from '../components/FullScreenToggle.vue';
import ModelViewer from '../components/Model/ModelViewer.vue';
import ModelControl from '../components/Model/ModelControl.vue';
import ModelInfos from '../components/Model/ModelInfos.vue';

import { Building } from '../ThreeJs/building/Building.js';
// Get the query params from the current route
const modelViewerRef =    ref(null);
const modelContainer =    ref(null);
const ModelBuilding =     ref(null);
const buildingPanels =    ref(false);
const isPortrait =        ref(false);
const modelInfosVisible = ref(false);

const noAccessToModel = ref(false);

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

const projectId = ref(route.query.projectId);
const modelName = ref('');
const modelUrl = ref('');


import api from '@/services/api';

async function getProject() {
  try {

    const {data} = await api.get(`projects/${projectId.value}`);
    modelName.value = data.project_name;
    const fileKey = data.file3d_link.split('amazonaws.com/')[1]
    // MyAssemblyDemoLIL.glb


    const res = await api.get(`files/download`, {
        params: {
          file_key: fileKey // Pass file_key in the query string
        }
      });

    modelUrl.value = res["data"].presigned_url;

    if(!modelUrl.value) {
      noAccessToModel.value = true;
    }

  } catch (error) {
    noAccessToModel.value = true;
  }



}

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
  console.log("Screen Orientation :",isPortrait.value ? "Portrait" : "Landscape");
}

onMounted(() => {
  detectOrientation();
  window.addEventListener('resize', detectOrientation);
  getProject();
});


</script>
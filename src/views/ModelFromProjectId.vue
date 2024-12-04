<template>
  <div class="viewer-background">

  <p class="absolute"> {{ project_settings?.test}}</p>
  <div v-if="noAccessToModel" class="h-screen w-screen flex flex-column items-center justify-center">
    <h1 class="text-3xl mb-5">No access to this model</h1>
    <!-- user pi-times in big size -->
    <i class="pi pi-times text-7xl"></i>
  </div>
  <div v-else>

    <FullScreenToggle v-if="!modelInfosVisible"/>


    <ProjectInfos 
      v-model:visible="projectInfosVisible" 
      :projectName="projectName"
      :projectDescription="project_settings?.description"
    />

    <div 
      class="h-screen w-screen flex" 
      :class="{ 'flex-col-reverse': isPortrait, 'flex-row': !isPortrait }" 
    >
      <ModelControl class="overflow-auto p-3" 
        :class="{ 'h-1/3  w-screen': isPortrait, 'w-1/3 h-screen': !isPortrait }"
        @control-model="handleControl"
        @show-panel-info="modelInfosVisible=true"
        @show-project-info="projectInfosVisible=true"
        v-model:selectedPanelName="selectedPanelName"
        :buildingPanels="buildingPanels" 
        :panelBtnOnly="true"
        :projectName="projectName"
      />
      <ModelInfos 

        v-if="project_settings && selectedPanelName != ''"

        v-model:visible="modelInfosVisible" 
        v-model:isPortrait="isPortrait"

        v-model:selectedPanelName="selectedPanelName"
        v-model:tabs="infosTabs"
        v-model:panelDescription="infosDescription"
        />
      <div 
        @mousedown.right="mouseDown"
        @mouseup.right="mouseUp"
        ref="modelContainer" 
        @click="threeJsOrbitControls.autoRotate = false;"
        class="canvas-container w-screen h-screen"
      >   
      <!-- :class="{ 'h-[75vh] w-screen': isPortrait, 'w-[75vw] h-screen': !isPortrait }" -->

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
</div>
 
</template>

<script setup>

import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import FullScreenToggle from '../components/FullScreenToggle.vue';
import ModelViewer from '../components/Model/ModelViewer.vue';
import ModelControl from '../components/Model/ModelControl.vue';
import ModelInfos from '../components/Model/ModelInfos.vue';
import ProjectInfos from '../components/Model/ProjectInfos.vue';


import { Building } from '../ThreeJs/building/Building.js';
// Get the query params from the current route
const modelViewerRef =    ref(null);
const modelContainer =    ref(null);
const ModelBuilding =     ref(null);
const buildingPanels =    ref(null);
const isPortrait =        ref(false);
const modelInfosVisible = ref(false);
const projectInfosVisible = ref(false);

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

// Project INFOS
const projectId = ref(route.query.projectId);


// dynamic infos
const infosTabs = computed(() => {
  if(project_settings.value) {
    const panels = project_settings.value?.pannels;
    if (panels) {
      return panels[selectedPanelName.value]?.accordions || [];
    }
  }
  return [];
});


const infosDescription = computed(() => {

  if(project_settings.value) {
    const panels = project_settings.value?.pannels;
    if (panels) {
      return panels[selectedPanelName.value]?.description || '';
    }
  }
  return '';
});

const projectName = ref('');
const modelUrl = ref('');
const noAccessToModel = ref(false);
const project_settings = ref(null);


const props = defineProps({
  editMode: {
    type: Boolean,
    required: false,
    default: false,
  },
  p_noAccessToModel: {
    type: Boolean,
    required: false,
    default: false,
  },
  p_projectName: {
    type: String,
    required: false,
    default: '',
  },
  p_modelUrl: {
    type: String,
    required: false,
    default: '',
  },
  p_project_settings: {
    type: Object,
    required: false,
    default: null,
  },
});

import api from '@/services/api';

async function getProject() {
  try {
    const {data} = await api.get(`projects/${projectId.value}`);
    projectName.value = data.project_name;
    let dataHandled = data.settings;
    
    project_settings.value = JSON.parse(dataHandled);
    console.log("LoadedSettings :", project_settings.value);

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
    console.error('Error fetching project:', error);  
    noAccessToModel.value = true;
  }
}

const cameFromDashboard = computed(() => route.query.from === 'dashboard'); 
// Data transfer between ModelControl and ModelViewer

// define emit to pass data to parent
const emit = defineEmits(['model-loaded', 'newActivePanel', 'contextMenuTrigger', 'project-settings']);

watch(() => panelClicked.value, (newVal) => {
  if(newVal) {

    selectedPanelName.value = newVal;
    ModelBuilding.value.showOnlyPanelByName(newVal);
    addLabelToPanel(newVal, `This is the ${newVal} panel`);
    
  }
});



// pass controle from ModelControl to ModelViewer
const handleControl = (arg) => {

  if(arg.controleName === 'showOnlyPanelByName') {
    ModelBuilding.value.showOnlyPanelByName(arg.arg);
    selectedPanelName.value = arg.arg;

    console.log('addLabelToPanel', arg.arg);
    addLabelToPanel(arg.arg, `This is the ${arg.arg} panel`);

  }

  if(arg.controleName === 'stopAutoRotate') {
    threeJsOrbitControls.value.autoRotate = false;
  }

  // showall panels
  if(arg.controleName === 'showAllPanels') {
    ModelBuilding.value.showAllPanels();
    selectedPanelName.value = '';

    // delete element with class : panelLabelDemo
    const existing_labels = document.getElementsByClassName('panelLabelDemo')

    while(existing_labels.length > 0){
        // delete the parent of the label
        existing_labels[0].remove();
    }
  }

};

function setBuilding(model) {
  // B.value = new Building(model);
  threeJsModel.value = model;
  ModelBuilding.value = new Building(model, project_settings.value);
  buildingPanels.value = ModelBuilding.value.getPanelsByGroupsDict();
}


function detectOrientation() {
  isPortrait.value = window.innerHeight > window.innerWidth;
  console.log("Screen Orientation :",isPortrait.value ? "Portrait" : "Landscape");
}


function addLabelToPanel(panelName, label) {
  ModelBuilding.value.addLabelToGroup(panelName, label);
}


let mouseDownTime = 0;
let startX = 0, startY = 0;

function mouseDown(event) {
  mouseDownTime = Date.now(); // Record time when the mouse is pressed down
  startX = event.clientX; // Record start X position
  startY = event.clientY; // Record start Y position
}

function mouseUp(event) {

  const mouseUpTime = Date.now(); // Record time when the mouse is released

  // Check if the click was quick and mouse did not move much
  const timeDiff = mouseUpTime - mouseDownTime;
  const movedDistance = Math.sqrt(Math.pow(event.clientX - startX, 2) + Math.pow(event.clientY - startY, 2));

  if (timeDiff < 200 && movedDistance < 5) emit('contextMenuTrigger', event);
}
onMounted(() => {
  detectOrientation();
  window.addEventListener('resize', detectOrientation);
  if (!props.editMode) {
    getProject();
    
  }

  if (props.editMode) {
    watch(() => selectedPanelName.value, (newVal) => {
      emit('newActivePanel', newVal);
    });
    projectName.value = props.p_projectName;
    modelUrl.value = props.p_modelUrl;
    noAccessToModel.value = props.p_noAccessToModel;
    project_settings.value = props.p_project_settings;
  }

});

</script>

<style>

.viewer-background {
    /* Grid pattern layer */
    /* background-image: 
      linear-gradient(rgba(67, 73, 92, 0.379) 1.5px, transparent 1.5px),
      linear-gradient(to right, rgba(67, 73, 92, 0.206) 1.5px, transparent 1.5px),
       */
      /* Gradient layer */
      /* linear-gradient(90deg, rgba(27, 32, 46, 1) 0%, rgba(33, 41, 64, 1) 35%, rgba(8, 14, 28, 1) 100%); */
      
    /* Grid size */
    /* background-size: 44px 44px, 44px 44px, cover; */
}

.canvas-container {
    position: relative;
    overflow: hidden;
    /* width: 100%; */
    height: 100vh; /* Ensure full height to match screen */
}

.canvas-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://www.myassembly.co/src/assets/logo_dass.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.1;
    z-index: 0;
}

canvas {
    position: relative;
    z-index: 1; /* Ensure the canvas stays on top */
}


</style>
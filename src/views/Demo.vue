<template>
  <div class="p-4">
    <!-- Trigger Button -->
    <Button
     
      label="Show Tooltip via Button 1"
      class="bg-green-600 text-white font-bold py-2 px-4 rounded ml-4"
      @click="showOverlay"
    />

    <!-- Overlay Tooltip -->
    <div
      ref="overlay"
      v-show="isOverlayVisible"
      class="absolute"
    >
      <div class="p-4 bg-purple-600 text-white rounded-lg shadow-lg text-sm leading-5">
        <div class="flex items-center mb-2">
          <span class="text-pink-300 text-lg mr-2">🚀</span>
          <span class="font-semibold">See Flagsmith in action</span>
        </div>
        <p class="text-white mb-2">Click through this demo.</p>
        <p class="text-white mb-4">
          Manage feature deployments with confidence across any number of projects and environments.
        </p>
        <div class="flex justify-between items-center mt-4 border-t border-purple-500 pt-2">
          <span class="text-purple-300 text-xs">1 / 2</span>
          <Button
            label="Feature Flags →"
            icon="pi pi-arrow-right"
            class="p-button-rounded p-button-sm p-button-success"
            @click="onButtonClick"
          />
        </div>
      </div>
    </div>
  </div>

  <p class="absolute"> {{ project_settings?.test}}</p>
  <div v-if="noAccessToModel" class="h-screen w-screen flex flex-column items-center justify-center">
    <h1 class="text-3xl mb-5">No access to this model</h1>
    <!-- user pi-times in big size -->
    <i class="pi pi-times text-7xl"></i>
  </div>
  <div v-else>

    <FullScreenToggle v-if="!modelInfosVisible"/>
    <ModelInfos 

      v-if="project_settings && selectedPanelName != ''"

      v-model:visible="modelInfosVisible" 
      v-model:isPortrait="isPortrait"
      
      v-model:selectedPanelName="selectedPanelName"
      v-model:tabs="infosTabs"
      v-model:panelDescription="infosDescription"
    />

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
      <div 
        @mousedown.right="mouseDown"
        @mouseup.right="mouseUp"
        ref="modelContainer" 
        @click="threeJsOrbitControls.autoRotate = false;"
        :class="{ 'h-[75vh] w-screen': isPortrait, 'w-[75vw] h-screen': !isPortrait }"
        class="canvas-container"
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

// MyAssembly.co Components
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


// DEMO CODE STARTS HERE
import { computePosition, offset, flip, shift } from '@floating-ui/vue';

// Refs for the overlay and button
const overlay = ref(null);
const demoBtn_1 = ref(null);
const isOverlayVisible = ref(false);

// Function to position the overlay relative to the button
const showOverlay = async () => {
  // Make the overlay visible
  isOverlayVisible.value = true;
  const btn = document.getElementById('clickPanelR1');

  // Compute the position with Floating UI
  const { x, y } = await computePosition(btn, overlay.value, {
    placement: 'right',
    middleware: [offset(8), flip(), shift()],
  });

  // Apply the computed position to the overlay
  Object.assign(overlay.value.style, {
    left: `${x}px`,
    top: `${y}px`,
  });
};

// Function to handle the button click within overlay
const onButtonClick = () => {
  // Logic for the button inside the overlay
  alert('Feature Flags Clicked');
};

// DEMO CODE ENDS HERE



import api from '@/services/api';

async function getProject() {
  try {
    const {data} = await api.get(`projects/48`);
    projectName.value = data.project_name;
    let dataHandled = data.settings || '{"description": "No description available", "pannels": {}}';
 
    project_settings.value = JSON.parse(dataHandled);


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

// Data transfer between ModelControl and ModelViewer

// define emit to pass data to parent
const emit = defineEmits(['model-loaded', 'newActivePanel', 'contextMenuTrigger', 'project-settings']);

watch(() => panelClicked.value, (newVal) => {
  if(newVal) {

    selectedPanelName.value = newVal;
    ModelBuilding.value.showOnlyPanelByName(newVal);
    
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
  }

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

function addLabelToPanel(panelName, label) {
  if(props.editMode) {
    ModelBuilding.value.addLabelToGroup(panelName, label);
  }
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

/* Custom styling to make OverlayPanel look like a tooltip */
.p-overlaypanel {
  width: 16rem;
  background-color: #6b21a8; /* Customize background to purple */
  color: white;
  border-radius: 0.5rem;
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
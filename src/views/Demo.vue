<template>
  <!-- <div class="absolute top-10 right-10">{{ reference }}</div> -->
  <!-- <div 
    v-if="isOpen"
    class="h-screen w-screen absolute top-0 left-0"
    style="z-index: 9999;  background: rgba(64, 64, 64, 0.5); /* Semi-transparent background */
  backdrop-filter: blur(4px); /* Applies blur to everything behind */"
    
    ></div> -->
  <div v-if="isOpen" ref="floating" :style="floatingStyles" class="p-3 popupContainer" style="z-index: 10001;">
    <div class="popup p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="font-semibold">{{ currentDemoPopupContent["title"] }}</span>
        <span class="pi pi-times cursor-pointer" @click="isOpen = false"></span> 
      </div>
      
      <div class="mb-4" v-html="currentDemoPopupContent['description']"></div>
      <div class="flex justify-between items-center mt-4">

        <span > 
          <i v-if="demoPopupIndex > 1" @click="demoPopupIndex --" class="pi pi-arrow-left cursor-pointer"></i>
        </span>

        <button
          @click="demoPopupIndex ++"
          v-if="demoPopupIndex < demoPopupContentLength"  
          class="p-button p-component p-button-rounded p-button-sm p-button-success" 
          type="button"
          style="overflow: hidden; position: relative;">
          <span class="p-button-icon p-button-icon-right pi pi-arrow-right"></span>
          <span class="p-button-label">Next</span>
        </button>
        <button
          v-else
          @click="startAfterDemo"
          class="p-button p-component p-button-rounded p-button-sm p-button-success" 
          type="button"
          style="overflow: hidden; position: relative;">
          <span class="p-button-icon p-button-icon-right pi pi-arrow-right"></span>
          <span class="p-button-label">Go Next</span>

        </button>




      </div>
    </div>
  </div>


    <Button 
        v-else
        class="absolute"
        :class="{ 'top-5 left-5': isPortrait, 'bottom-5 right-5': !isPortrait }"
        style=" border: none; z-index: 10001;"
        @click="togglePopup"
        >        
            <slot>
                <p class="m-0">Resume Demo</p>
            </slot>
      </Button>
  
  <p class="absolute"> {{ project_settings?.test }}</p>
  <div v-if="noAccessToModel" class="h-screen w-screen flex flex-column items-center justify-center">
    <h1 class="text-3xl mb-5">No access to this model</h1>
    <!-- user pi-times in big size -->
    <i class="pi pi-times text-7xl"></i>
  </div>
  <div v-else>

    <FullScreenToggle v-if="!modelInfosVisible" />
    <ModelInfos 
      v-if="project_settings && selectedPanelName != ''" 
      v-model:visible="modelInfosVisible"
      v-model:isPortrait="isPortrait" 
      v-model:selectedPanelName="selectedPanelName" 
      v-model:tabs="infosTabs"
      v-model:panelDescription="infosDescription"
      @nextStepDemo="nextStepDemo($event)"
       />

    <ProjectInfos v-model:visible="projectInfosVisible" :projectName="projectName"
      :projectDescription="project_settings?.description" />

    <div class="h-screen w-screen flex" :class="{ 'flex-col-reverse': isPortrait, 'flex-row': !isPortrait }">
      <ModelControl class="overflow-auto p-3" :class="{ 'h-1/3  w-screen': isPortrait, 'w-1/3 h-screen': !isPortrait }"
        @control-model="handleControl" 
        @show-panel-info="modelInfosVisible = true"
        @show-project-info="projectInfosVisible = true" 
        @nextStepDemo="nextStepDemo($event)"
        @startDemo="togglePopup"
        v-model:selectedPanelName="selectedPanelName"
        :buildingPanels="buildingPanels" :panelBtnOnly="true" :projectName="projectName" />
      <div @mousedown.right="mouseDown" @mouseup.right="mouseUp" ref="modelContainer"
        @click="threeJsOrbitControls.autoRotate = false;"
        :class="{ 'h-[75vh] w-screen': isPortrait, 'w-[75vw] h-screen': !isPortrait }" class="canvas-container">
        <ModelViewer v-if="modelContainer && modelUrl" ref="modelViewerRef" :modelUrl="modelUrl"
          :modelContainer="modelContainer" @model-loaded="setBuilding" @renderer-loaded="threeJsRenderer = $event"
          @orbitControls-loaded="threeJsOrbitControls = $event" @camera-loaded="threeJsModelCamera = $event"
          @scene-loaded="threeJsScene = $event" @element-clicked="panelClicked = $event" />
      </div>
    </div>
  </div>

  <FormDemo/>
</template>

<script setup>

import { ref, computed, onMounted, watch, nextTick } from 'vue';
// DEMO CODE STARTS HERE

function nextStepDemo(stepToSet) {
  if (demoPopupIndex.value == stepToSet-1 && demoPopupContentLength > stepToSet) {
    demoPopupIndex.value = stepToSet;
  }
}

const demoPopupContent = ref({
  1 : {
    title: 'Show Panel',
    description: `
    
    <p class=" mb-4"> Click on a button an see the panel showup on the model</p>`,
    elementReferenceId : 'demoShowPanelButton',
    alignment: 'left',
  },
  2 : {
    title: 'Get Details',
    description: `
    
    <p class="mb-4">Discover panel details by clicking the active panel name that is bouncing.</p>`,

    elementReferenceId: 'selectedPanel',
    alignment: 'left',
  },
  3 : {
    title: 'Panel Details Tab',
    description: `
    
    <p class="mb-4">1. Here you can find general description of the active panel.</p>
    <p class="mb-4">2. Then Assembly creator could add information with image / video / GIF to describe panel specifications.</p>
    `
    ,
    elementReferenceId: 'remote-config',
    alignment: 'left',
    },
  4 : {
    title: 'Lock Details Tab',
    description: `
    
    <p class="mb-6">You can now lock the left tab, and interact with the model as you need</p> 
    
        `,
    elementReferenceId: 'toggleDrawerLock',
    alignment: 'right',
    },

  5 : {
    title: 'Interact with the model',
    description: `
    <p class="mb-4">1. Click any panel on the model to active it.</p>
      <img src="https://www.myassembly.co/src/assets/ClickModel.gif" alt="Image for tab n°0" class="w-full mt-2">`,
    elementReferenceId: 'toggleDrawerLock',
    alignment: 'right',
  },

  6 : {
    title: 'End of Demo',
    description: `
    
    <p class="mb-4">You can now interact with the model as you need</p>`,
    elementReferenceId: 'toggleDrawerLock',
    alignment: 'right',
  },
  
});

const currentDemoPopupContent = computed(() => demoPopupContent.value[demoPopupIndex.value]);


const demoPopupIndex = ref(1);

const demoPopupContentLength = Object.keys(demoPopupContent.value).length;

import { useFloating, autoPlacement, flip, shift } from '@floating-ui/vue';

const isOpen = ref(false);
const reference = ref(null);
const floating = ref(null);


const { floatingStyles, update } = useFloating(reference, floating, {
  placement: 'left',
  middleware: [
    autoPlacement({ alignment: 'center', padding: 8 }), // Tries to auto-place based on available space
    flip(), // Flips the popup to opposite side if there's no space
    shift({ padding: 8 }), // Shifts popup to stay within the viewport
  ],
});

watch(demoPopupIndex , (newVal) => {
  // changing the active reference for the popup to open it on the right place around the new active elemennt
  reference.value = document.getElementById(currentDemoPopupContent.value.elementReferenceId);
  nextTick(() => {
    update();
  });

});


function togglePopup() {
  reference.value = document.getElementById(currentDemoPopupContent.value.elementReferenceId);
  isOpen.value = !isOpen.value;
}

function startAfterDemo() {
  isOpen.value = false;

  alert("Demo is over, KEEP TESTING or IMPORT MY OWN MODEL");
}

// DEMO CODE ENDS HERE



// MyAssembly.co Components
import FullScreenToggle from '../components/FullScreenToggle.vue';
import ModelViewer from '../components/Model/ModelViewer.vue';
import ModelControl from '../components/Model/ModelControl.vue';
import ModelInfos from '../components/Model/ModelInfos.vue';
import ProjectInfos from '../components/Model/ProjectInfos.vue';
import FormDemo from '../components/Demo/FormDemo.vue';

import { Building } from '../ThreeJs/building/Building.js';
// Get the query params from the current route
const modelViewerRef = ref(null);
const modelContainer = ref(null);
const ModelBuilding = ref(null);
const buildingPanels = ref(null);
const isPortrait = ref(false);
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
  if (project_settings.value) {
    const panels = project_settings.value?.pannels;
    if (panels) {
      return panels[selectedPanelName.value]?.accordions || [];
    }
  }
  return [];
});


const infosDescription = computed(() => {

  if (project_settings.value) {
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
    const { data } = await api.get(`projects/48`);
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

    if (!modelUrl.value) {
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
  if (newVal) {

    selectedPanelName.value = newVal;
    ModelBuilding.value.showOnlyPanelByName(newVal);

    addLabelToPanel(newVal, `This is the ${newVal} panel`);


  }
});



// pass controle from ModelControl to ModelViewer
const handleControl = (arg) => {

  if (arg.controleName === 'showOnlyPanelByName') {
    ModelBuilding.value.showOnlyPanelByName(arg.arg);
    selectedPanelName.value = arg.arg;

    addLabelToPanel(arg.arg, `This is the ${arg.arg} panel`);

  }

  if (arg.controleName === 'stopAutoRotate') {
    threeJsOrbitControls.value.autoRotate = false;
  }

  // showall panels
  if (arg.controleName === 'showAllPanels') {
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

.popupContainer {
  /* max-width: min(calc(100vw - 2rem), 400px);
  max-height: 70vh; */
  overflow: auto;
  color: var(--p-content-background);
  max-width: 555px;
 
}

.arrow {
  width: 10px;
  height: 10px;
  background: inherit;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background-color: aqua;
}

.popup {
  background: var(--p-text-color);
}

.canvas-container {
  position: relative;
  overflow: hidden;
  /* width: 100%; */
  height: 100vh;
  /* Ensure full height to match screen */
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
  z-index: 1;
  /* Ensure the canvas stays on top */
}
</style>
<template>

    <div class="container position-relative">
        <!-- <h2 style="position: fixed; left: 0; background-color: aliceblue; color: black;">{{ res }}</h2> -->
        <Header></Header>
        <div ref="modelContainer" class="h-screen mg:w-3/4 w-1/2 h-screen" id="HomePageModelContainer"
            style="position: fixed;right: 0; top: 0px !important;">
            <ModelViewer v-if="modelContainer" ref="modelViewerRef"
                modelUrl="https://www.myassembly.co/src/assets/models/DemoModel.glb" 
                :controle="false"
                :modelContainer="modelContainer" 
                @model-loaded="ModelBuilding = $event"
                @camera-loaded="ModelCamera = $event" />
        </div>

        <!-- Section 1: More than just 3D visualization -->
        <SideSection side="left">
            <template #title>
                More than a<br>3D visualization
            </template>
            <template #description>
                <span>With our innovative 3D modeling platform, architects, builders, and clients can explore and
                    interact with building structures in a whole new way — with assembly instructions, detailed parts
                    identification, and interactive, critical checkpoints — all in a single 3D view.</span>
            </template>
            <GetStartedButton />
            <template #rightcolumn>

            </template>
        </SideSection>

        <!-- Section 3: A platform designed for builders -->
        <SideSection side="left">
            <template #title>
                <span>Designed for builders</span>
            </template>
            <template #description>



                <div class="flex flex-column">

                    <span>Our powerful toolset is designed to scale with your project. Whether you’re working on a
                        single-family home or a large-scale commercial structure, our 3D models adapt, offering
                        flexibility and real-time updates.</span>

                    <div class="flex flex-column mt-5 card w-fit from-gray-800">

                        <p class="m-0 text-base panel-ittle">
                            Ground floor walls:
                        </p>
                        <div class="flex flex-row items-baseline mb-3">
                            <Button @click="BuildingAssembly.showOnlyPanelByName('G-W1*');" outlined
                                class="panelButton font-semibold ">G-W1</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('G-W2*');" outlined
                                class="panelButton font-semibold ">G-W2</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('G-W3*');" outlined
                                class="panelButton font-semibold ">G-W3</Button>
                        </div>
                        <p class="m-0 text-base panel-ittle">

                            First floor walls:
                        </p>

                        <div class="flex flex-row items-baseline mb-3">
                            <Button @click="BuildingAssembly.showOnlyPanelByName('1F-W1*');" outlined
                                class="panelButton font-semibold">1F-W1</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('1F-W2*');" outlined
                                class="panelButton font-semibold">1F-W2</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('1F-W3*');" outlined
                                class="panelButton font-semibold">1F-W3</Button>
                        </div>
                        <p class="m-0 text-base panel-ittle">

                            Roof:
                        </p>

                        <div class="flex flex-row items-baseline mb-3">
                            <Button @click="BuildingAssembly.showOnlyPanelByName('R1*');" outlined
                                class="panelButton font-semibold">R1</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('R2*');" outlined
                                class="panelButton font-semibold">R2</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('R3*');" outlined
                                class="panelButton font-semibold">R3</Button>
                        </div>
                    </div>

                </div>

            </template>
            <GetStartedButton>
                <p class="m-0 ">Start Building</p>
            </GetStartedButton>
        </SideSection>
    </div>
    <div class="container">

        
       <HeroSection>
            <template #title>
                <span>Manage your Assembly Pool</span>
            </template>
            <template #description>
                <!-- description of the dashboard -->
                <span>
                    Our dashboard provides a comprehensive overview of your projects: <br> <b>filter</b>, <b>edit</b>, and <b>share</b> them as you want.
                </span>
            </template>
        </HeroSection>

        <Panel class="mb-10">
            <img src="../assets/dashboard_picture.png" class="max-w-full h-50">
        </Panel>

        <!-- Section 5: Seamless Interactions -->
        <SideSection side="left">
            <template #title>
                <span>Share it !</span>
            </template>
            <template #description>
                <span>Navigate the structure with intuitive gestures, switching between a comprehensive view and
                    detailed assembly instructions.</span>
                <ul>
                    <li>Explore the 3D space: Rotate, zoom, and explore every angle of the structure.</li>
                    <li>Global <> Detailed Views: Switch easily between high-level overviews and focused views on
                            specific elements.</li>
                    <li>Play Mode: Activate assembly playback to guide workers or users through key installation steps.
                    </li>
                </ul>
            </template>
            <GetStartedButton />
        </SideSection>

        <h1 class="text-5xl sm:text-6xl lg:text-6xl font-bold leading-tight text-center">3 Free Steps</h1>

        <!-- Section 2: A solution that goes beyond blueprints -->
        <HeroSection>
            <template #title>
                <span>A solution that goes beyond blueprints</span>
            </template>
            <template #description>
                <span>
                    You focus on the project — we provide interactive 3D insights, from element identification to
                    assembly videos and pop-up instructions.
                </span>
            </template>
            <GetStartedButton />
        </HeroSection>

        <Stepper />
    </div>

    <div class="container">
        <Footer />
    </div>


    <ScrollTop />
</template>

<script setup>
import Header from "../components/HomePage/Header.vue";
import HeroSection from "../components/HomePage/HeroSection.vue";
import SideSection from "../components/HomePage/SideSection.vue";
import Stepper from "../components/HomePage/Stepper.vue";
import ScrollTop from "primevue/scrolltop";
import ModelViewer from "../components/Model/ModelViewer.vue";
import Footer from "../components/HomePage/Footer.vue";
import GetStartedButton from "../components/HomePage/GetStartedButton.vue";


import Panel from "primevue/panel";

import { Building } from '../ThreeJs/building/Building.js';
import { OpeningAnimation } from '../ThreeJs/building/ModelAnimation.js';

import { useHomePageAnimation } from '../composables/useHomePageAnimation.js';

import { ref, watch, onMounted, onUnmounted } from "vue";

const modelViewerRef = ref(null);
const modelContainer = ref(null);
const ModelBuilding = ref(null);
const ModelCamera = ref(null);

const scrollPositionStep = ref(0);
const stepSetter = ref(null);

const BuildingAssembly = ref(null);

const res = ref('Hello World');

const cameraPosition = ref({ x: 0, y: 0, z: 0 });

watch(ModelCamera, (camera) => {
    if (camera) {
        cameraPosition.value = camera.position;

        OpeningAnimation(camera, ModelBuilding.value, { "x": -10.349590810671197, "y": 1.1734950219156364, "z": 5.603326770502212 }, 1500);
        const { setStep } = useHomePageAnimation(ModelCamera.value, ModelBuilding.value, BuildingAssembly.value, 1200);
        stepSetter.value = setStep;

        window.addEventListener('scroll', handleScroll);
    }
});


watch(cameraPosition, (newPos) => {
    if (ModelCamera.value) {
        ModelCamera.value.position.set(newPos.x, newPos.y, newPos.z);
    }
});


watch(ModelBuilding, (building) => {
    if (building) {
        BuildingAssembly.value = new Building(building);
    }
});

// function getSettings() {
//     res.value = { ModelCamera: ModelCamera.value.position };
// }

// window.addEventListener('mousemove', getSettings);

const handleControl = (arg) => {

    if (arg.controleName === 'showOnlyPanelByName') {
        BuildingAssembly.value.showOnlyPanelByName(arg.arg);
        return;
    }
    modelViewerRef.value.handleControl(arg);
};

// Define a debounce function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}


// Debounced scroll handler
const handleScroll = debounce(() => {

    let viewportHeight = window.innerHeight;

    let currentScrollStep = scrollPositionStep.value;
    scrollPositionStep.value = Math.floor((window.scrollY + (0.6 * viewportHeight)) / viewportHeight);

    if (scrollPositionStep.value !== currentScrollStep) {
        stepSetter.value(scrollPositionStep.value);
    }

}, 50);

onUnmounted(() => {
    // Remove the scroll event listener
    window.removeEventListener('scroll', handleScroll);

});

</script>

<style>
.container {
    width: 90%;
    max-width: 1380px;
    margin-left: auto;
    margin-right: auto;
}

#HomePageModelContainer {
    transition: opacity 0.5s;
}

.panelButton {
    border-radius: 0 !important;
    width: 100px;
    background-color: var(--p-content-background);
}

.card {
    border: 1px solid var(--p-content-border-color);
}

.panel-ittle{
   opacity: 0.8;
}


    

</style>

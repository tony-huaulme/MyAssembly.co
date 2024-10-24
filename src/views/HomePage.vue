<template>
    <div class="container position-fixed h-container" style="
        position: fixed;
        top: 0px;
        z-index: 9999;
        backdrop-filter: blur(24px);
        width: 100vw;
    ">
        <Header></Header>
    </div>

    <div class="container position-relative">
        <div ref="modelContainer" class="h-screen w-1/2 h-screen" id="HomePageModelContainer">
            <ModelViewer v-if="modelContainer" ref="modelViewerRef"
                modelUrl="https://www.myassembly.co/src/assets/models/DemoModel.glb" 
                :controle="false"
                :modelContainer="modelContainer" 
                @model-loaded="ModelBuilding = $event"
                @camera-loaded="ModelCamera = $event" 
            />
        </div>

        <!-- Section 1: More than just 3D visualization -->
        <SideSection side="left" id="section1" class="md:mt-20">
            <template #title>
                More than a<br>3D visualization
            </template>
            <template #description>
                <span>Interact with building structures in a whole new way — with assembly instructions, detailed parts
                    identification, and interactive, critical checkpoints — even from your phone.</span>
            </template>
            <GetStartedButton />
            <template #rightcolumn>

            </template>
        </SideSection>

        <!-- Section 2: A platform designed for builders -->
        <SideSection side="left" style="min-height: auto;" >
            <template #title>
                <span>Designed for builders</span>
            </template>
            <template #description>



                <div class="flex flex-column">

                    <span>Designed to scale with your project. Whether you’re working on a
                        single-family home or a large-scale commercial structure, our 3D models adapt.</span>

                    <div class="flex flex-column mt-5 w-fit from-gray-800 panelInteractionContainer" @click="blinking = false">

                        <div class="flex flex-row items-baseline">
                            <Button @click="BuildingAssembly.showOnlyPanelByName('G-W1');" outlined
                                class="panelButton font-semibold" :class="blinking ? 'blink' : ''">G-W1</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('G-W2');" outlined
                                class="panelButton font-semibold ">G-W2</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('G-W3');" outlined
                                class="panelButton font-semibold ">G-W3</Button>

                        </div>
                        <div class="flex flex-row items-baseline">
                            <Button @click="BuildingAssembly.showOnlyPanelByName('1F-W1');" outlined
                                class="panelButton font-semibold">1F-W1</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('1F-W2');" outlined
                                class="panelButton font-semibold">1F-W2</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('1F-W3');" outlined
                                class="panelButton font-semibold">1F-W3</Button>
                        </div>
                        <div class="flex flex-row items-baseline">
                            <Button @click="BuildingAssembly.showOnlyPanelByName('R1');" outlined
                                class="panelButton font-semibold">R1</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('R2');" outlined
                                class="panelButton font-semibold">R2</Button>
                            <Button @click="BuildingAssembly.showOnlyPanelByName('R3');" outlined
                                class="panelButton font-semibold">R3</Button>
                        </div>
                    </div>

                </div>

            </template>
            <GetStartedButton>
                <p class="m-0 ">Start Building</p>
            </GetStartedButton>
        </SideSection>

        
        <!-- Section 3: More than just 3D visualization -->
        <SideSection side="left" class="md:mt-20">
            <template #title>
                Even from a Phone
            </template>
            <template #description>
                <span>Interact with building structures in a whole new way — with assembly instructions, detailed parts
                    identification, and interactive, critical checkpoints — even from your phone.</span>
            </template>
            <GetStartedButton />
            <template #rightcolumn>

            </template>
        </SideSection>


    </div>
    <div class="container">

        <!-- Section 5: SHARE SECTION -->
            <!-- share on phone -->
            <HeroSection class=" md:hidden flex"  style="z-index: 99999;">
                <template #title>
                    <span class="md:mt-20">Share it !</span>
                </template>
                <template #description>
                    <!-- description of the dashboard -->
                    <span>
                        Make it accessible from any where.
                    </span>
                </template>
            </HeroSection>
            <div class="p-10 md:hidden flex card" style="background-color: #18181b !important;">
                <img src="../assets/shareDemoPopUp.png" class="max-w-full">
            </div>

            <!-- Share on wide screen -->
            <section class="hidden md:flex h-screen w-fill" style="z-index: 99999;">
                <div data-hero-content-wrap="" pointer-auto="" class="flex w-fill flex-row" style="align-items: center; justify-content: space-between;">
                    <div class="w-1/2 mt-20 flex flex-column justify-center">
                        <div class="hl_headline-w">
                            <h1 class="h1 hero-title">
                               Share it !
                            </h1>
                        </div>
                        <div class="hl_subheadline-w is--hero">
                            <p class="paragraph-l text-secondary">
                                Share your projects with your team, clients, or anyone else.
                                 <!-- make list of points -->
                                 <ul>
                                    <li>Acces it from a <b>Phone</b></li>

                                </ul>
                            </p>
                        </div>
                        <GetStartedButton/>
                    </div>
                    <div class="flex flex-row justify-center card" style="align-items: center; height: fit-content">
                        <img src="../assets/shareDemoPopUp.png" class="p-3" style="border-radius: 5px; max-height: 60vh;">
                    </div>
                </div>

            </section>


        <HeroSection>
            <template #title>
                <span>Manage your Models</span>
            </template>
            <template #description>
                <!-- description of the dashboard -->
                <span>
                    Our dashboard provides a comprehensive overview of your projects: <br> <b>filter</b>, <b>edit</b>, and <b>share</b> them as you want.
                </span>
            </template>
        </HeroSection>
        <div class="w-fill flex flex-row justify-center mb-20 mt-20">
            <img src="../assets/dashboard_picture.png" class="max-w-full">
        </div>
        <GetStartedButton/>

    </div>

    <!-- <HeroSection>
        <template #title>
            <span>Try it now or contact us !</span>
        </template>
    </HeroSection>
    <GetStartedButton/> -->
    <Footer class="mt-20"/>

    <ScrollTop />
</template>

<script setup>
import Header from "../components/HomePage/Header.vue";
import HeroSection from "../components/HomePage/HeroSection.vue";
import SideSection from "../components/HomePage/SideSection.vue";
import ScrollTop from "primevue/scrolltop";
import ModelViewer from "../components/Model/ModelViewer.vue";
import Footer from "../components/HomePage/Footer.vue";
import GetStartedButton from "../components/HomePage/GetStartedButton.vue";


import Panel from "primevue/panel";

import { Building } from '../ThreeJs/building/Building.js';
import { OpeningAnimation } from '../ThreeJs/building/ModelAnimation.js';
import {
  setModelPosition,
} from '../ThreeJs/building/ModelAnimation.js';
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
const blinking = ref(true);
const cameraPosition = ref({ x: 0, y: 0, z: 0 });

watch(ModelCamera, (camera) => {
    if (camera) {
        cameraPosition.value = camera.position;

        OpeningAnimation(camera, ModelBuilding.value, { "x": -9.349590810671197, "y": 1.1734950219156364, "z": 6.603326770502212 }, 1500);
        setModelPosition(ModelBuilding.value, { "x": 3, "y": -3.5, "z": 0 }, 1500);
        
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

.p-button-icon-only {
    font-size: 15px;
    padding: 0.8rem;
    border: none;
}

.blink {
    animation: blink-animation 1.8s infinite ease-in-out;
}

@keyframes blink-animation {
    0% { opacity: 0.3; }
    70% { opacity: 1; }
    100% { opacity: 0.3; }
}

/* blink animation for the background that goes from transparent to gray between white and black */
@keyframes blink-background {
    0% { background-color: transparent; }
    50% { background-color: #18181b; }
    100% { background-color: transparent; }
}

.blink-bg {
    animation: blink-background 1.8s infinite ease-in-out;
}


.container {
    width: 90%;
    max-width: 1380px;
    margin-left: auto;
    margin-right: auto;
}

#HomePageModelContainer {
    transition: opacity 0.5s;
    z-index: 999;
}


@media screen and (min-width: 1380px) {
    #HomePageModelContainer {
      right:0;
      width: 75vw !important;
      height: 100vh !important;
      top: 0;
      background-color: transparent;
    }
    .panelInteractionContainer{
        z-index: 99999;
    }
  }

  @media screen and (max-width: 1380px) {
    #HomePageModelContainer {
      width: 100vw !important;
      height: 35vh !important;
      left: 0;
      right: 0;
      background: linear-gradient(to bottom, var(--p-content-background) 90%,  rgba(27, 24, 24, 0) 100%), #18181b00;
    }
    section {
      height: webkit-fill-available;
    }
    #section1 {
        padding-top: 30vh;
    }
    .h-container {
        padding-left: 5%;
        padding-right: 5%;
    }
    .panelInteractionContainer{
        z-index: 9;
    }
  }

@media screen and (max-width: 479px) {
    .h1.hero-title {
        font-size: 12vw;
    }
}

.panelButton {
    border-radius: 0 !important;
    width: 100px;
    background-color: var(--p-content-background);
    color :var(--p-text-color);
}

.card {
    border: 1px solid var(--p-content-border-color);
}

.panel-ittle{
   opacity: 0.8;
}

#HomePageModelContainer{
    position: fixed;
}
    

</style>

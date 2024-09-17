<template>


    <div class="container position-relative">

        <Header></Header>
        <div 
            ref="modelContainer" 
            class="h-screen" 
            style="width: 75vw !important; position: fixed;right: 0; top: 0px !important;"
        >
            <ModelViewer v-if="modelContainer" modelUrl="https://www.myassembly.co/src/assets/models/DemoModel.glb" :modelContainer="modelContainer"/>
        </div>

        <!-- Section 1: More than just 3D visualization -->
        <SideSection side="left">
            <template #title>
                <span>More than a<br>3D visualization</span>
            </template>
            <template #description>
                <span>With our innovative 3D modeling platform, architects, builders, and clients can explore and interact with building structures in a whole new way — with assembly instructions, detailed parts identification, and interactive, critical checkpoints — all in a single 3D view.</span>
            </template>
            <GetStartedButton />
            <template #rightcolumn>

            </template>
        </SideSection>





        <!-- Section 3: A platform designed for builders -->
        <SideSection side="left">
            <template #title>
                <span>A platform designed for builders</span>
            </template>
            <template #description>
                <span>Our powerful toolset is designed to scale with your project. Whether you’re working on a single-family home or a large-scale commercial structure, our 3D models adapt, offering flexibility and real-time updates.</span>
            </template>
            <GetStartedButton />
        </SideSection>
    </div>
    <div class="container">

        <h1 class="text-5xl sm:text-6xl lg:text-5xl font-bold leading-tight">Manage your projects</h1>

        <img src="../assets/dashboard_picture.png" class="max-w-full">

        <!-- Section 5: Seamless Interactions -->
        <SideSection side="right">
            <template #title>
                <span>Seamless Interactions</span>
            </template>
            <template #description>
                <span>Navigate the structure with intuitive gestures, switching between a comprehensive view and detailed assembly instructions.</span>
                <ul>
                    <li>Explore the 3D space: Rotate, zoom, and explore every angle of the structure.</li>
                    <li>Global <> Detailed Views: Switch easily between high-level overviews and focused views on specific elements.</li>
                    <li>Play Mode: Activate assembly playback to guide workers or users through key installation steps.</li>
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
                    You focus on the project — we provide interactive 3D insights, from element identification to assembly videos and pop-up instructions.
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
import AccordionAndContent from "../components/HomePage/AccordionAndContent.vue";
import SideSection from "../components/HomePage/SideSection.vue";
import Stepper from "../components/HomePage/Stepper.vue";
import ScrollTop from "primevue/scrolltop";
import ModelViewer from "../components/Model/ModelViewer.vue";
import Footer from "../components/HomePage/Footer.vue";

import { ref } from "vue";


import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Panel from 'primevue/panel';


const modelContainer = ref(null);
const accordionTabs = ref([
    {
        title: 'Identification of elements',
        content: 'Clearly label and view structural components in a 3D space, helping users easily identify and navigate through different parts of the structure.',
        value: '0'
    },
    {
        title: 'Assembly instructions',
        content: 'Step-by-step guidance through interactive assembly sequences, providing detailed instructions at every stage of the building process.',
        value: '1'
    },
    {
        title: 'Critical point alerts',
        content: 'Get pop-up notifications for important verifications and key assembly moments to ensure safety and accuracy throughout the assembly process.',
        value: '2'
    },
    {
        title: 'Video & Animation',
        content: 'Detailed videos and animations for more complex assembly tasks, allowing for a visual understanding of difficult or intricate steps.',
        value: '3'
    }
]
);

const events = ref([
    { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);
</script>

<style>
.container {
    width: 90%;
    max-width: 1580px;
    margin-left: auto;
    margin-right: auto;
}
</style>

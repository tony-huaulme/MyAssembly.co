<template>
    <div v-if="displayDemoIntro" class="modal-background">
        <div 
            :class="isPortrait ? 'flex justify-center items-center p-5' : 'card mb-0 flex justify-center'" 
            :style="isPortrait ? 'width: 100vw; height: 100vh;' : 'width: 80vw; height: 80vh;'"
            style="background-color: #18181b;"
        >
            <Stepper value="1" class="w-fill h-fill">
                <StepList>
                    <Step value="1">{{isPortrait ? '' :"Overview"}}</Step>
                    <Step value="2">{{isPortrait ? '' :"Explore"}}</Step>
                    <Step value="3">{{isPortrait ? '' :"Details"}}</Step>
                </StepList>
                <StepPanels style="height: 90%; position: relative;" class="flex flex-col items-center">
                    <StepPanel v-slot="{ activateCallback }" value="1" style="flex: 1;">
                        <div class="flex flex-col items-center w-fill" style="height: 100%;">
                            <div class="text-center mt-4 mb-4 text-xl font-semibold">Panel Overview</div>
                            <p>Quickly access panels sorted by groups on the right.</p>
                            <img v-if="isPortrait" src="@/assets/demo_controle_model_phone.jpg" alt="Image 1" style="height: 51%;">
                            <img v-else src="@/assets/demo_controle_model.jpg" alt="Image 1" class="stepImage">
                        </div>
                        <div class="flex pt-1 justify-end" :class="{ 'absolute bottom-5 left-0 right-0  btn-container': !isPortrait, 'fixed bottom-5 right-5 left-5': isPortrait }">
                            <Button class="stepperBtn" label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="flex flex-col items-center w-fill" style="height: 100%;">
                            <div class="text-center mt-4 mb-4 text-xl font-semibold">Explore the Model</div>
                            <p>Drag, zoom, and click panels to interact with and explore the model in detail.</p>
                            
                            <img v-if="isPortrait" src="@/assets/identify_by_clicking_phone.jpg" alt="Image 1" style="height: 51%;">
                            <img v-else src="@/assets/identify_by_clicking.jpg" alt="Image 1" class="stepImage">
                        </div>
                        <div class="flex pt-1 justify-between" :class="{ 'absolute bottom-5 left-0 right-0 btn-container': !isPortrait, 'fixed bottom-5 right-5 left-5': isPortrait }">
                            <Button class="stepperBtnLeft" label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                            <Button class="stepperBtn" label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="flex flex-col items-center w-fill" style="height: 100%;">
                            <div class="text-center mt-4 mb-4 text-xl font-semibold">Element Insights</div>
                            <p>Access critical details by clicking blue panel tags.</p>
                            
                            <img v-if="isPortrait" src="@/assets/pannel_information_phone.jpg" alt="Image 1" style="height: 51%;">
                            <img v-else src="@/assets/pannel_information.jpg" alt="Image 1" class="stepImage">

                        </div>

                        <div class="flex pt-1 justify-between" :class="{ 'absolute bottom-5 left-0 right-0 btn-container': !isPortrait, 'fixed bottom-5 right-5 left-5': isPortrait }">
                            <Button class="stepperBtnLeft" label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                            <Button class="stepperBtn" label="Launch Demo" icon="pi pi-arrow-right" iconPos="right" @click="diveInDemo" />
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
</template>

<script setup>


import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

import {ref,  onMounted } from 'vue';

const displayDemoIntro = ref(true);
const isPortrait = ref(true);
const startTime = ref(0);

function detectOrientation() {
    isPortrait.value = window.innerHeight > window.innerWidth;
}

const emit = defineEmits(['demoIntroEnded']);

function diveInDemo() {
    displayDemoIntro.value = false;
    emit('demoIntroEnded');
    sendWebhook();
}

// Function to calculate elapsed time in seconds
function getElapsedTimeInSeconds() {
    const elapsedTime = Date.now() - startTime.value;
    return (elapsedTime / 1000).toFixed(0);
}

// window.addEventListener('beforeunload', async function () {
//     // Call sendWebhook when the page is about to be closed
//     await sendWebhook();
// });

async function sendWebhook() {
    const webhookUrl = 'https://discord.com/api/webhooks/1296183137587433564/g8D7euIKzA6gmS5fTW0rylDyQmzu4xYlZNdi8fk6GqEUe8SJpHBEjuBSy7OGg3gcpNTI';
    const elapsedTime = getElapsedTimeInSeconds();
    // Determine if the user is on a PC or mobile
    const payload = {
        embeds: [{
            title: `DemoIntro ${elapsedTime}s`,
            color: 2123412, // Green color in decimal
        }]
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log('Webhook sent successfully.');
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}

onMounted(() => {
    startTime.value = Date.now();
    detectOrientation();
    window.addEventListener('resize', detectOrientation);
});
</script>

<style>

.stepImage {
    width: 61%;
}

.btn-container {
    width: 100%;
}

.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(205, 204, 218, 0.343);
    backdrop-filter: blur(3px) saturate(200%);
    z-index: 100000;
    display: flex;
    justify-content: center;
    align-items: center;
}


.stepperBtnLeft{
    position: fixed;
    left: 0px;
    bottom: 0px;
}
.stepperBtn {
    position: fixed;
    right: 0px;
    bottom: 0px;
}
</style>
<template>
    <OverlayBadge 
        v-if="selectedPanelName"
        value="2" 
        severity="info"
        size="small"
        id="selectedPanel" 
        class="button blink-bg" 
        @click="$emit('show-panel-info', true); stopBlinking('selectedPanel'); openFirstInfoAccordion()" >
        {{ selectedPanelName }}
    </OverlayBadge>
    <div style="overflow: auto;" :style="isPortrait ? '': 'width: 25vw;'">
        <h1 class="project-name p-2" :class="{'portraitPorjectName':isPortrait, 'notPortraitProjectName' : !isPortrait}">{{ props.modelName }}</h1>
        <div v-if="buildingPanels">
            <div v-if="selectedPanelName != ''  && clickedPanelCount > 3">
                <Button 
                    class="button" 
                    @click="$emit('control-model', { controleName: 'showAllPanels' })"
                >
                    Show All Panels
                </Button>
            </div>
            <Accordion v-model="activeIndex">
                <AccordionPanel 
                    v-for="( [group, items], index ) in Object.entries(props.buildingPanels)" 
                    :key="group" 
                    :header="group"
                    :value="index"
                >
                <AccordionHeader>{{ group }}</AccordionHeader>
                    <AccordionContent>
                        <div class="containerPanelName">
                            <div v-for="panel in items" :key="panel">
                            
                                <Button v-if="panel == 'R1'" 
                                    class="button blink-bg" 
                                    id="clickPanelR1"
                                    @click.stop="$emit(
                                        'control-model', { controleName: 'showOnlyPanelByName', arg: panel }); stopBlinking('clickPanelR1'); clickedPanelCount++"
                                    >
                                    {{ panel }}
                                </Button>
                                <Button v-else
                                    class="button" 
                                    @click="$emit(
                                        'control-model', { controleName: 'showOnlyPanelByName', arg: panel }); stopBlinking('clickPanelR1'); clickedPanelCount++"
                                    >
                                    {{ panel }}
                                </Button>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>

        </div>
        <div v-else class="p-3">
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <br>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <br>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <br>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <br>
   
        </div>

    </div>
</template>


<script setup>
import Skeleton from 'primevue/skeleton';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import OverlayBadge from 'primevue/overlaybadge';


import Button from 'primevue/button';
import { ref, defineEmits, onMounted, watch } from 'vue';


const props = defineProps({
    buildingPanels: {
        type: Array,
        required: false,
    },
    panelBtnOnly: {
        type: Boolean,
        required: false,
        default: false,
    },
    modelName: {
        type: String,
        required: true,
    },
    selectedPanelName: {
        type: String,
        required: true,
    }
});

const activeIndex = ref(0);
const isPortrait = ref(false);
const clickedPanelCount = ref(0);

const emit = defineEmits(['control-model', 'show-panel-info']);

function detectOrientation() {
  isPortrait.value = window.innerHeight > window.innerWidth;
}


onMounted(() => {
  detectOrientation();
  window.addEventListener('resize', detectOrientation);
    //   delay with 1s to allow the page to load before clicking the first accordion header
    setTimeout(() => {
        try {
            document.getElementsByClassName('p-accordionheader')[0].click();
        } catch (error) {
            console.error('Error clicking the first accordion header: ', error);
        }
    }, 1000);
});

function stopBlinking(idToStop) {
    const blinkBg = document.getElementsByClassName('blink-bg');
    for (let i = 0; i < blinkBg.length; i++) {
        if (blinkBg[i].id == idToStop) {
            blinkBg[i].classList.remove('blink-bg');
        }
    }
}

function openFirstInfoAccordion() {
    const firstAccordion = document.getElementsById('pv_id_2_accordionheader_0');
    firstAccordion.click();

    // add blink bg to #pv_id_3_accordionheader_1
    const secondAccordion = document.getElementById('pv_id_2_accordionheader_1');
    secondAccordion.classList.add('blink');

}

</script>
<style>

/* Blink animation for the background that transitions from white to gray to black */
@keyframes blink-background {
    0% { background-color: var(--p-content-background-color); }
    50% { background-color: gray; }
    100% { background-color: var(--p-content-background-color); }
}

.blink-bg {
    animation: blink-background 1.8s infinite ease-in-out;
}


.project-name{
    display: block;
    width: 100%;
    font-size: clamp(1rem, 4vw, 4rem); /* Adapts font size based on viewport width */
    text-align: center; /* Center the text if needed */
    white-space: normal; /* Allows the text to wrap within the container */
    word-wrap: break-word; /* Ensures words break when needed */
}

.notPortraitProjectName{
    width: 100%;
    padding: 10px;
    font-size: 2vw;
    word-break: break-word;
    overflow-wrap: break-word;
}

.portraitPorjectName {
    width: 100%;
    padding: 10px;
    word-break: break-word;
    overflow-wrap: break-word;
}

.p-accordioncontent-content{
    display: flex;
    flex-wrap: wrap;
    background: transparent;
}
.p-accordion, .p-accordionpanel, .p-accordionheader, .p-accordioncontent{
    background: transparent !important;
}
.containerPanelName {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* Creates responsive columns */
  width: 100%;

}

.button {
  padding: 10px;
  cursor: pointer;
  border-radius: 0;
  background-color: var(--p-content-background-color); 
  color: var(--p-text-color);
  text-align: center;
  width: 100%;
}

#selectedPanel{
    border-bottom: 1px solid var(--p-button-primary-hover-border-color);
    width: auto;
    color: var(--p-text-color);
    position: absolute;
    top: 45px;
    left: 50%;
    transform: translate(-50%, -50%); 
}


</style>

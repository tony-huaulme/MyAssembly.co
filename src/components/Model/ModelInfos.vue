
<template>
    <span  @click="toggleSideBar" id="toggle-info-panel" class="p-3 cursor-pointer">
        <i class="pi pi-chevron-left flip-r" id="toggle-info-panel-icon" style="font-size: 1rem"></i>
    </span>
<div :style="isPortraitStyle" style="overflow: auto;" id="info-panel-container" >
    <div class="info-panel-content-container">
        <div>
            <div style="font-size: x-large; font-weight: 800;" class="p-3"> {{ selectedPanelName }} </div>
            <!-- <ToggleButton 
                v-if="!isPortrait"
                id="toggleDrawerLock"
                v-model="drawerLocked"
                onLabel="Unclock Infos"
                offLabel="Lock Infos"
                onIcon="pi pi-lock" 
                offIcon="pi pi-lock-open"
                @click="stopBlinking('toggleDrawerLock'); $emit('nextStepDemo', 5)"    
            /> -->

        </div>

        <p style=" text-align: justify;" class="p-3">
            {{ panelDescription }}
        </p>

        <Accordion value="0" v-if="tabs">
            <AccordionPanel v-for="(tab, index) in tabs" :key="tab.title" :value="index">
                <AccordionHeader :class="`panelInfoHeader_${index}`">
                    <Checkbox @click.stop="" v-model="tab.checked" :binary="true" />{{ tab.title }}
                </AccordionHeader>
                <AccordionContent>
                    <p class="m-0"> {{ tab.content }} </p>
                    <img :src="tab.image" :alt="`Image for tab n°${index}`" class="w-full mt-2">

                </AccordionContent>
            </AccordionPanel>
        </Accordion>
        <p v-else>No Details Here.</p>
    </div>
</div>

</template>

<script setup>

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import Checkbox from 'primevue/checkbox';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';


import { nextTick, ref, watch, onMounted, computed } from 'vue';

const drawerLocked = ref(true);


// Script setup
watch(drawerLocked, (newValue) => {
    console.log('DrawerLocked toggled:', newValue);
    if (newValue) {
        nextTick(() => {
            const drawerMask = document.getElementsByClassName('p-drawer-mask')[0];
            if (drawerMask) {
                drawerMask.style.setProperty('width', 'auto', 'important');
            }
        });
    }
});

const emit = defineEmits(['nextStepDemo']);
function stopBlinking(idToStop) {

    const blinkBg = document.getElementsByClassName('blink-bg');
    for (let i = 0; i < blinkBg.length; i++) {
        if (blinkBg[i].id == idToStop) {
            blinkBg[i].classList.remove('blink-bg');
        }
    }
}

const props = defineProps({
    selectedPanelName: {
        type: String,
        required: true,
    },
    tabs: {
        type: Array,
        required: true,
    },
    panelDescription: {
        type: String,
        required: true,
    },
    isPortrait: {
        type: Boolean,
        required: false,
        default: false,
    },
});


const visible = ref(false);

// watch visible, on change do toggleSideBar stuff
watch(visible, (newValue) => {
    if (newValue) {
        toggleSideBar();
    }
});


function toggleSideBar() {
    document.getElementById('info-panel-container').classList.toggle('h-sidebar');
    document.getElementById('toggle-info-panel-icon').classList.toggle('flip-r');
}



const isPortraitStyle = computed(() => {
    return props.isPortrait ? `
    
        height: 100vh;
        position: absolute;
        z-index: 10001;
        background-color: #0f0f115a;
        backdrop-filter: blur( 17px ) saturate(200%);

    
    ` : `
    width: 25vw; 
    overflow: auto;
    height: 100vh;
    position: absolute;
    z-index: 10000;
    right:0px;
   `
});



</script>
<style>
#toggle-info-panel{
    display: flex;
    justify-content: center;
    align-items: center;

    top: 20px;
    right: 20px;
    border-radius: 100%;
    background-color: #0f0f11;
    position: absolute;
    z-index: 20000;
}

.info-panel-content-container {
    padding: 3px; 
    border-radius: 25px; 
    height: 100%;

    /* box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ); */
    backdrop-filter: blur( 7px ) saturate(200%);
    -webkit-backdrop-filter: blur( 10px );
    border-radius: 10px;
    height: fit-content;

}
.flip-r {
    transform: scaleX(-1);
}

#toggle-info-panel-icon{
    transition: all 0.5s;
}


.h-sidebar{
    right: -25vw !important;
    display: none;
}

#info-panel-container {
    overflow: auto;
}
</style>
<template>

    <Drawer 
        v-model:visibleLeft="visible" class="!w-full md:!w-80 lg:!w-[30rem]">
        <template #header>
           <div style="font-size: x-large; font-weight: 800;"> {{selectedPanelName}} </div>
        </template>

        <p style=" text-align: justify;">
            {{ panelDescription }}
        </p>
    
        <Accordion value="0" v-if="tabs">
            <AccordionPanel v-for="(tab, index) in tabs" :key="tab.title" :value="index">
                <AccordionHeader><Checkbox  @click.stop="" v-model="tab.checked" :binary="true" />{{ tab.title }}</AccordionHeader>
                <AccordionContent>
                    <p class="m-0"> {{ tab.content }} </p>
                    <img :src="tab.image" :alt="`Image for tab n°${index}`" class="w-full mt-2" >
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
        <p v-else>No Details Here.</p>

    </Drawer>
</template>

<script setup>

import Drawer from 'primevue/drawer';
// import ToggleButton from 'primevue/togglebutton';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import Checkbox from 'primevue/checkbox';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';


import { ref, watch } from 'vue';


const visible = ref(false);
const drawerLocked = ref(false);
const isPortrait = ref(false);


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
});

</script>
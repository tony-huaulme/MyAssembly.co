<template>

    <Drawer 
        v-model:visibleLeft="visible" 
        :modal="!drawerLocked"
        :dismissableMask="drawerLocked"
        class="!w-full md:!w-80 lg:!w-[30rem]">
        <template #header>
            <div style="font-size: x-large; font-weight: 800;"> {{selectedPanelName}} </div>
            <ToggleButton v-model="drawerLocked" onLabel="Unclock Infos" offLabel="Lock Infos" onIcon="pi pi-lock" 
                offIcon="pi pi-lock-open"/>
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
import ToggleButton from 'primevue/togglebutton';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import Checkbox from 'primevue/checkbox';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';


import { nextTick, ref, watch } from 'vue';


const visible = ref(false);
const drawerLocked = ref(false);
const isPortrait = ref(false);

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
<style>

.custom-drawer-width {
  width: auto !important;
}
</style>
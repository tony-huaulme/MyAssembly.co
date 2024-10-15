<template>
    <Drawer v-model:visibleLeft="visible" :header="`Panel - ${ selectedPanelName }`"class="!w-full md:!w-80 lg:!w-[30rem]">
        <!-- <template #header>
            <div class="flex justify-center w-fill">
                <ToggleButton v-model="drawerLocked" onLabel="Locked" offLabel="Unlocked" onIcon="pi pi-lock" 
                    offIcon="pi pi-lock-open" class="w-36" aria-label="Do you confirm" />
            </div>
        </template> -->

        <p>
            SC-AF
        </p>
    
        <Accordion value="0">
            <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
                <AccordionHeader><Checkbox  @click.stop="console.log('sss')" v-model="tab.checked" :binary="true" />{{ tab.title }}</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                        {{ tab.content }}
                        <div v-if="tab.value == '0'">
                            <img 
                                src="https://i.pinimg.com/originals/06/91/42/06914243fe226bc48a5efdcb429a0ef2.gif" 
                                alt=""
                                class="w-full"
                                >
                        </div>
                    </p>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>

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


import { ref } from 'vue';


const visible = ref(false);
const drawerLocked = ref(false);
const isPortrait = ref(false);


const props = defineProps({
    selectedPanelName: {
        type: String,
        required: true,
    }
});

const tabs = ref([
    { title: 'Title 1', content: 'Content 1', value: '0', checked: false},
    { title: 'Title 2', content: 'Content 2', value: '1', checked: false},
    { title: 'Title 3', content: 'Content 3', value: '2', checked: false},
]);

</script>
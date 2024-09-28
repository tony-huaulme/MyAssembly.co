<template>
    <div>
        <div v-if="buildingPanels">

            <Accordion v-model="activeIndex">
                <AccordionPanel 
                    v-for="([group, items], index) in Object.entries(props.buildingPanels)" 
                    :key="group" 
                    :header="group"
                    :value="index"
                >
                <AccordionHeader>{{ group }}</AccordionHeader>
                    <AccordionContent>
                        <div v-for="panel in items" :key="panel">
                        <Button 
                            style="border-radius: 0; background-color: var(--p-content-background-color); color: var(--p-text-color);"
                            @click="$emit('control-model', { controleName: 'showOnlyPanelByName', arg: panel })"
                        >
                            {{ panel }}
                        </Button>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>

            <!-- <Button 
                style="border-radius: 0; background-color: var(--p-content-background-color); color: var(--p-text-color);"
                v-for="panel in props.buildingPanels" 
                :key="panel"
                @click="$emit('control-model', { controleName: 'showOnlyPanelByName', arg: panel })"
            >
                {{ panel }}
            </Button> -->
        </div>
        <div v-else>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
            <Skeleton class="mb-1"/>
        </div>

    </div>
</template>


<script setup>
import Skeleton from 'primevue/skeleton';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Button from 'primevue/button';
import { ref } from 'vue';


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
});

const activeIndex = ref(0);
</script>
<style>
.p-accordioncontent-content{
    display: flex;
    flex-wrap: wrap;
    background: transparent;
}
.p-accordion, .p-accordionpanel, .p-accordionheader, .p-accordioncontent{
    background: transparent !important;
}

</style>

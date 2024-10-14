<template>
    <OverlayBadge 
        value="2" 
        severity="info"
        size="small"
        id="selectedPanel" 
        class="button" 
        @click="$emit('show-panel-info', true)">
        {{ selectedPanelName }}
    </OverlayBadge>
    <div style="overflow: auto;">
        <h1 class="project-name p-2">{{ props.modelName }}</h1>
        <div @click="$emit('control-model', {controleName : 'stopAutoRotate'})" v-if="buildingPanels">
            
            <Accordion v-model="activeIndex">
                <AccordionPanel 
                    v-for="([group, items], index) in Object.entries(props.buildingPanels)" 
                    :key="group" 
                    :header="group"
                    :value="index"
                >
                <AccordionHeader>{{ group }}</AccordionHeader>
                    <AccordionContent>
                        <div class="containerPanelName">
                            <div v-for="panel in items" :key="panel">
                                <Button 
                                    class="button" 
                                    @click="$emit('control-model', { controleName: 'showOnlyPanelByName', arg: panel }); selectedPanelName = panel"
                                    >
                                    {{ panel }}
                                </Button>
                            </div>
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
import OverlayBadge from 'primevue/overlaybadge';


import Button from 'primevue/button';
import { ref, defineEmits } from 'vue';

const selectedPanelName = ref('');

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
});

const activeIndex = ref(0);
const emit = defineEmits(['control-model', 'show-panel-info']);

</script>
<style>
.project-name{
    display: block;
    width: 100%;
    font-size: clamp(1rem, 4vw, 4rem); /* Adapts font size based on viewport width */
    text-align: center; /* Center the text if needed */
    white-space: normal; /* Allows the text to wrap within the container */
    word-wrap: break-word; /* Ensures words break when needed */
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

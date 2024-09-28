<template>
    <div>
        <div v-if="buildingPanels">
            <Button 
                style="border-radius: 0; background-color: var(--p-content-background-color); color: var(--p-text-color);"
                v-for="panel in props.buildingPanels" 
                :key="panel"
                @click="$emit('control-model', { controleName: 'showOnlyPanelByName', arg: panel })"
            >
                {{ panel }}
            </Button>
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

import { useModelControls } from '../../composables/useModelControls';

// Import the shared state and logic from the composable
const { isRotating } = useModelControls();
</script>

<template>
    <div class="card w-1/4 m-0">
        <div v-if="!panelBtnOnly" class="control-panel">
            <h2>Control Panel</h2>
            <button @click="$emit('control-model', {controleName : 'zoomCam'});">zoomCam</button>
        </div>

        <div v-if="buildingPanels">
            <Button v-for="panel in props.buildingPanels" :key="panel" @click="$emit('control-model', {controleName : 'showOnlyPanelByName', arg : panel})">{{panel}}</Button>
        </div>
        <div v-else>
            <Skeleton />
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

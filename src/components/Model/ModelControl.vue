<template>
    <div class="card w-1/4 m-0">
        <div class="control-panel">
            <h2>Control Panel</h2>
            <button @click="$emit('control-model', {controleName : 'zoomCam'});">zoomCam</button>
        </div>
        <div class="controls mt-5">
            <label>
                <input type="checkbox" v-model="isRotating" /> Toggle Model Rotation
            </label>
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
    });

    import { useModelControls } from '../../composables/useModelControls';

    // Import the shared state and logic from the composable
    const { isRotating } = useModelControls();
</script>

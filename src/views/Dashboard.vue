<template>
    <div ref="DashboardContainer" class="card flex dahsboardContainer h-screen w-fill overflow-hidden" :class="isPortrait ? 'flex-column' : 'flex'">
        <SideMenue></SideMenue>
        <RouterView />

    </div>
</template>
<script setup>
    import SideMenue from '../components/Dashboard/SideMenue.vue';
    import { RouterView } from 'vue-router'
    import { ref, onMounted } from 'vue';

    const DashboardContainer = ref(null);
    const isPortrait = ref(false);

    function detectOrientation() {
        isPortrait.value = window.innerHeight > window.innerWidth;
    }

    onMounted(() => {
        detectOrientation();
        window.addEventListener('resize', detectOrientation);
    });


</script>
<style>
.dahsboardContainer {
    border-radius: 0px;
    margin-bottom: 0;
}
</style>
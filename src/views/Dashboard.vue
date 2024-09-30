<template>
    <div class="card flex h-screen dashboardContainer" style="margin: 0;">
        <SideMenue></SideMenue>
        <RouterView />

    </div>
</template>
<script setup>
    import SideMenue from '../components/Dashboard/SideMenue.vue';
    import { RouterView } from 'vue-router'
</script>
<style>
.dashboardContainer {
    border-radius: 0px;
}
</style>
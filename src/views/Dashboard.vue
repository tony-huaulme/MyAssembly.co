<template>
    <div ref="DashboardContainer" class="card  md:flex dahsboardContainer h-screen hidden w-fill">
        <SideMenue></SideMenue>
        <RouterView />

    </div>
    <div class="md:hidden flex">
        Please use a bigger screen to view the dashboard
    </div>
</template>
<script setup>
    import SideMenue from '../components/Dashboard/SideMenue.vue';
    import { RouterView } from 'vue-router'
    import {ref} from 'vue';

    const DashboardContainer = ref(null);

</script>
<style>
.dahsboardContainer {
    border-radius: 0px;
    margin-bottom: 0;
}
</style>
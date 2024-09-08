<template>
    <div class="card flex h-screen" style="margin: 0;">
        <SideMenue></SideMenue>
        <RouterView />

    </div>
</template>
<script setup>
    import SideMenue from '../components/Dashboard/SideMenue.vue';
    import ProjectsTable from '../components/Dashboard/ProjectsTable.vue';
    import { RouterView } from 'vue-router'

</script>
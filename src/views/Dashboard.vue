<template>
    <div class="card flex flex-column" style="margin: 0;">
        <SideMenue></SideMenue>
        <RouterView />

    </div>
</template>
<script setup>
    import SideMenue from '../components/Dashboard/SideMenue.vue';
    import { RouterView } from 'vue-router'
</script>
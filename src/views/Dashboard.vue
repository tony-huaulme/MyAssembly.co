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
    import { useRouter } from 'vue-router';

    const $router = useRouter();

    const DashboardContainer = ref(null);
    const isPortrait = ref(false);

    function detectOrientation() {
        isPortrait.value = window.innerHeight > window.innerWidth;
    }

    import api from '@/services/api';
    onMounted(() => {
        api.get('auth/check').then(({ data }) => {
            if (!data.authenticated) {
                $router.push('/authenticate');
            }
        }).catch((error) => {
            console.error('Error:', error);
        });

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
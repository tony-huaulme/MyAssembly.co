<template>
    <div ref="DashboardContainer" v-if="userAuthCheck" class="card flex dahsboardContainer h-screen w-fill" style="overflow-y: auto; overflow-x: hidden;" :class="isPortrait ? 'flex-column' : 'flex'">
        <SideMenue></SideMenue>
        <RouterView />
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>
<script setup>
    import SideMenue from '../components/Dashboard/SideMenue.vue';
    import { RouterView } from 'vue-router'
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const $router = useRouter();

    const DashboardContainer = ref(null);
    const isPortrait = ref(false);

    const userAuthCheck = ref(false);


    function detectOrientation() {
        isPortrait.value = window.innerHeight > window.innerWidth;
    }
    
    import api from '@/services/api';
    onMounted(() => {

        api.get('auth/check').then(({ data }) => {
            if (!data.authenticated) {
                $router.push('/authenticate');
            }
            userAuthCheck.value = true;
        }).catch((error) => {
            console.error('Error:', error);
            $router.push('/authenticate');
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
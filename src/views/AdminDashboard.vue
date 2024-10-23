<template>
    <div class="card flex dahsboardContainer h-screen w-fill" style="overflow-y: auto; overflow-x: hidden;" :class="isPortrait ? 'flex-column' : 'flex'">
        <SideMenueAdmin></SideMenueAdmin>
        <RouterView />
    </div>
</template>
<script setup>
    import SideMenueAdmin from '../components/AdminDashboard/SideMenueAdmin.vue';
    import { RouterView } from 'vue-router'
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const $router = useRouter();

    const isPortrait = ref(false);

    function detectOrientation() {
        isPortrait.value = window.innerHeight > window.innerWidth;
    }

    import api from '@/services/api';
    onMounted(() => {
        // api.get('auth/check').then(({ data }) => {
        //     if (!data.authenticated) {
        //         $router.push('/authenticate');
        //     }
        // }).catch((error) => {
        //     console.error('Error:', error);
        // });

        // detectOrientation();
        // window.addEventListener('resize', detectOrientation);
    });


</script>
<style>
.dahsboardContainer {
    border-radius: 0px;
    margin-bottom: 0;
}
</style>
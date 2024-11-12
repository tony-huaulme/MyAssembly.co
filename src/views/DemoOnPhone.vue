<template>
    <div class="h-screen p-5 flex flex-column items-center">

        <div class="flex flex-row items-center">
            <img v-if="isDarkMode" src="../assets/logo_darkmode.png" alt="MyAssembly.co Icon"
                class="p-3 w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem]" style="align-self: center;">
            <img v-else src="../assets/logo_lightmode.png" alt="MyAssembly.co Icon"
                class="p-3 w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem]" style="align-self: center;">
            <p style="font-size: larger; font-weight: 600;">MyAssembly.co</p>
        </div>
        <h3>Intro to the EditMode</h3>
        <p>MyAssembly.co EditMode work best on a bigger screen, so here's a quick intro to the EditMode</p>

        <video src="../assets/vertical_Demo_x1.mp4" style="width: 80vw; border: solid 1px gray" autoplay="false" controls></video>

        <RouterLink 
            to="/ModelFromProjectId?projectId=48" 
        >
            <Button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-7 mb-7"
            >
                Open The Demo Project
            </Button>
        
        </RouterLink>

    </div>


</template>
<script setup>

import { computed } from 'vue'

const isDarkMode = computed(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

</script>

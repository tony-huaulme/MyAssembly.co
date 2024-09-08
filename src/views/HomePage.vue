<template>
    <div class="container">

    <Header></Header>
    <SectionAlignLeft/>
    <HeroSection/>
</div>

    <AccordionAndContent/>
    <Stepper/>


    <div class="card">
        <Timeline :value="events" align="alternate" class="customized-timeline">
            <template #marker="slotProps">
                <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" :style="{ backgroundColor: slotProps.item.color }">
                    <i :class="slotProps.item.icon"></i>
                </span>
            </template>
            <template #content="slotProps">
                <Card class="mt-4">
                    <template #title>
                        {{ slotProps.item.status }}
                    </template>
                    <template #subtitle>
                        {{ slotProps.item.date }}
                    </template>
                    <template #content>
                        <img v-if="slotProps.item.image" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.item.image}`" :alt="slotProps.item.name" width="200" class="shadow-sm" />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                            neque quas!
                        </p>
                        <Button label="Read more" text></Button>
                    </template>
                </Card>
            </template>
        </Timeline>
    </div>


    
    <ScrollTop />
</template>

<script setup>
import Header from "../components/HomePage/Header.vue";
import HeroSection from "../components/HomePage/HeroSection.vue";
import AccordionAndContent from "../components/HomePage/AccordionAndContent.vue";
import SectionAlignLeft from "../components/HomePage/SectionAlignLeft.vue";
import Stepper from "../components/HomePage/Stepper.vue";
import ScrollTop from "primevue/scrolltop";
import { ref } from "vue";


import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import Button from 'primevue/button';

const events = ref([
    { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);
</script>

<style>
.container{
    width: 90%;
    max-width: 1380px;
    margin-left: auto;
    margin-right: auto;
}
</style>






<template>
<!-- Hero Section -->
    <section class="flex flex-col items-center justify-center text-center mb-15" style="padding-top: 6.5rem;">
        <h1 class="h1 hero-title mb-5">
            <slot name="title"></slot>
        </h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-5" style="max-width: -webkit-fill-available;">
            <slot name="description"></slot>
        </p>
        <!-- <GetStartedButton/> -->
    </section>

</template>
<script setup>
import GetStartedButton from './GetStartedButton.vue';
</script>
<style>

h1 { 
    margin-top: 0; 
    margin-bottom: 0; 
    font-size: 4em; 
    line-height: 1.4;
} 

.h1 { 
    margin-top: 0; 
    margin-bottom: 0; 
    font-family: WF Visual Sans,Arial,sans-serif; 
    font-size: 5.313rem; 
    font-weight: 600; 
    line-height: 1.04;
    
} 

h1,.h1 { 
    font-feature-settings: "ss01" 0, "ss02" 0, "ss03" 0;
} 

.h1.hero-title { 
    text-wrap: balance; 
    font-size: 6vw;
} 

@media only screen and (min-width: 1600px){ 
.h1.hero-title { 
    font-size: 5.313rem;
} 
} 
</style>
    
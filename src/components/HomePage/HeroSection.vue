<template>
<!-- Hero Section -->
    <section class="flex flex-col items-center justify-center text-center mb-32">
        <h1 class="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-5">
            <slot name="title"></slot>
        </h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-5">
            <slot name="description"></slot>
        </p>
        <GetStartedButton/>
    </section>

</template>
<script setup>
import GetStartedButton from './GetStartedButton.vue';
</script>
    
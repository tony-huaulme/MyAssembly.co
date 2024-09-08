<template>
<!-- Hero Section -->
    <section class="flex flex-col items-center justify-center text-center mb-20">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">
            {{ props.title }}
            <slot name="title"></slot>
        </h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            {{ props.description }}
            <slot name="description"></slot>
        </p>
        <GetStartedButton/>
    </section>

</template>
<script setup>
import GetStartedButton from './GetStartedButton.vue';
const props = defineProps({
    title: {
        type: String,
        default: "Hero Section Title"
    },
    description: {
        type: String,
        default: "Hero Section Description"
    }
});
</script>
    
<template>
    <section class="h-screen flex">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-6">
            <h1 class="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight">
                {{ props.title }}
                <slot name="title"></slot>
            </h1>
            <p class="text-lg sm:text-xl lg:text-2xl text-gray-400">
                {{ props.description }}
                <slot name="description"></slot>
            </p>
            <GetStartedButton/>
            </div>
            <!-- The right column is intentionally left empty for larger screens -->
        </div>
    </section>
</template>
<script setup>
import GetStartedButton from './GetStartedButton.vue';

const props = defineProps({
    title: {
        type: String,
        default: "Section Title"
    },
    description: {
        type: String,
        default: "Section Description"
    }
});

</script>
<template>
    <section class="h-screen flex" :class="props.side == 'right' ?  'flex-row-reverse' :''">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8" style="max-width: 40vw;">
            <div class="space-y-6">
                <h1 class="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-5">
                    <slot name="title"></slot>
                </h1>
                <p class="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-5">
                    <slot name="description"></slot>
                </p>
                <GetStartedButton/>
            </div>
            <!-- The right column is intentionally left empty for larger screens -->
        </div>
        <slot name="rightcolumn" ></slot>
    </section>
</template>
<script setup>
import GetStartedButton from './GetStartedButton.vue';

const props = defineProps({
    side : {
        type: String,
        default: "left"
    }
});

</script>
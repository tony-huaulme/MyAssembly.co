<template>
    <!-- <section class="h-screen flex" :class="props.side == 'right' ?  'flex-row-reverse' :''">
        <div class="grid grid-cols-1 gap-8" style="max-width: 40vw;">
            <div class="space-y-6">
                <h1 class="mb-5 h1 hero-title pt-24">
                    <slot name="title"></slot>
                </h1>
                <p class="text-lg sm:text-xl lg:text-lg text-gray-400 mb-5">
                    <slot name="description"></slot>
                </p>
                <GetStartedButton/>
            </div>
        </div>
        <slot name="rightcolumn" ></slot>
    </section> -->
    <section>
        <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w breakpoint-section">
        <div class="hl_headline-w">
            <h1 class="h1 hero-title">
                <slot name="title"></slot>
            </h1>
        </div>
        <div class="hl_subheadline-w is--hero">
            <p class="paragraph-l text-secondary">
                <slot name="description"></slot>
            </p>
        </div>
        <GetStartedButton :value="'Start building'"/>
        </div>
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
<style scoped>



/* copy paste ancien site (webflowCopy) */
section {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

h1 { 
    margin-top: 0; 
    margin-bottom: 0; 
    font-size: 4em; 
    line-height: 1.4;
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

.hl_headline-w { 
    margin-bottom: 2rem;
} 

.hero_content-w {
    padding-top: 6.5rem; 
    padding-bottom: 0;
} 

.breakpoint-section {
    width: 50%;
}

@media screen and (max-width: 1380px) {
    .breakpoint-section {
        width: 100%;
    }

}

.hl_subheadline-w { 
    max-width: none; 
    margin-bottom: 2rem;
} 

.paragraph-l { 
    font-size: 1.125rem; 
    line-height: 1.6;
} 

.text-secondary {
    color: var(--color-text-secondary);
}
</style>
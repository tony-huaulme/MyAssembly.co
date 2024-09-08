
<template>


<section class="flex flex-col md:flex-row items-start justify-between gap-6rem">
        <!-- Accordion -->
        <div>
            <Accordion v-model:value="active">
                <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
                    <AccordionHeader><p class="text-3xl m-2">{{ tab.title }}</p></AccordionHeader>
                    <AccordionContent>
                        <p class="m-0">{{ tab.content }}</p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>

        <!-- Content Area -->
        <div class="card pt-0">
            <div class="w-full md:w-2/3 ">
                <div class="bg-gray-900 rounded-lg p-6">
                    <img src="https://via.placeholder.com/500x400" alt="Content Image" class="rounded-lg shadow-lg">
                </div>
            </div>
        </div>

    </section>


</template>

<script setup>
    import Accordion from 'primevue/accordion';
    import AccordionPanel from 'primevue/accordionpanel';
    import AccordionHeader from 'primevue/accordionheader';
    import AccordionContent from 'primevue/accordioncontent';

    import { ref } from 'vue';

    const active = ref("0");

    const props = defineProps({
        tabs: {
            type: Array,
            default: () => [
                { title: 'Title 1', content: 'Content 1 Content 1Content 1Content 1Content 1Content 1Content 1', value: '0' },
                { title: 'Title 2', content: 'Content 2 Content 2Content 2Content 2Content 2Content 2Content 2', value: '1' },
                { title: 'Title 3', content: 'Content 3 Content 3Content 3Content 3Content 3Content 3Content 3', value: '2' }
            ]
        }
    });
</script>
<style>
.p-accordionheader-toggle-icon {
    display: none;
}
.p-accordionpanel {
    border: none;
}
</style>
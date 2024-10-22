<script setup>
    import Button from 'primevue/button';
    import { RouterLink } from 'vue-router'

</script>

<template>

<!-- btn btn-primary d-flex flex-row -->
    <RouterLink :to="'/authenticate'" class="get-started-btn">       
        
            <Button>
                <slot>
                    <p class="m-0" style=" margin-right: 1ch">Start Demo</p>
                    <p class="lg:block hidden m-0"> — It's Easy</p>
                </slot>
            </Button>
            
    </RouterLink>
</template>

<style scoped>
.get-started-btn {
    width: fit-content !important;
}

.p-button {
    padding: 1em 1.5em;
    box-shadow: 0 4px 4px #08080814, 0 1px 2px #08080833, inset 0 6px 12px #ffffff1f, inset 0 1px 1px #fff3;
    font-weight: 600 !important;
    border: none;
}

.p-button:hover {
    box-shadow: 0 4px 4px #08080814, 0 1px 2px #08080833, inset 0 6px 12px #ffffff1f, inset 0 1px 1px #fff3;
    background-color: var(--p-button-primary-hover-background);
}
</style>
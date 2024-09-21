<script setup>
    import Button from 'primevue/button';
    import { RouterLink } from 'vue-router'

</script>

<template>

<!-- btn btn-primary d-flex flex-row -->
    <RouterLink :to="'/authenticate'" class="get-started-btn">       
        
            <Button>
                <slot>
                    <p class="m-0" style="font-weight: bold; margin-right: 1ch">Get Started</p>
                    <p class="lg:block hidden m-0"> — it's free</p>
                </slot>
            </Button>
            
    </RouterLink>
</template>

<style>
.get-started-btn {
    width: fit-content !important;
}

.p-button {
    padding: 0.5rem 1rem;
}
</style>
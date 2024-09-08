<template>

</template>

<script setup>
    import { ref, watch } from "vue";
    import Dialog from "primevue/dialog";
    import InputText from "primevue/inputtext";
    import Button from "primevue/button";

    const projectName = ref("");
    const projectDescription = ref("");

    defineEmits(["setVisibleToFalse"]);

    const props = defineProps({
        visible: Boolean
    });


    const visible = ref(props.visible);

    watch(() => props.visible, (newValue) => {
        if (newValue) {
            visible.value = newValue;
            console.log(visible.value); // This logs true
        }
    });
</script>
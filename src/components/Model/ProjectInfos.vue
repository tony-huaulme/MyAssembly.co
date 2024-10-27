
<template>
    
  <Dialog v-model:visible="visible" modal :header="projectName" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-html="projectDescription" class="overflow-y-auto p-3" style="height: 80vh;"></div>
  </Dialog>
    
    <!-- <Button @click="updateSettings()">UPDATE SETTIGNS</Button> -->
</template>

<script setup>
import { ref } from "vue";
import Dialog from 'primevue/dialog';

const visible = ref(false);

const props = defineProps({
    projectName: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
});



</script>

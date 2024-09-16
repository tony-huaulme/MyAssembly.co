<template>
  <!-- Loading Waiter -->
  <div v-if="!viewerReady" class="absolute top-50 left-50">
    <div class="spinner-container">
      <div class="loader-1"></div>
      <div class="spinner-text">{{ loadingProgress }}</div>
    </div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useThreeJs } from '@/composables/useThreeJs'; // Import the composable


const threeContainer = ref(null);
const loadingProgress = ref(0);
const viewerReady = ref(false);
const { initThreeJs } = useThreeJs();


const props = defineProps({
  modelUrl: {
    type: String,
    required: true,
  },
  loadedModel: {
    type: Object,
    required: false,
  },
  modelContainer: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['model-loaded']);

onMounted(() => {
  if (props.modelContainer) runBuildProcess()
});

function runBuildProcess() {

  initThreeJs(props.modelContainer, props.modelUrl, loadingProgress)
    .then(({ model, camera, renderer, orbitControls, canvas }) => {
      
      // Clean model reveal
      canvas.style.opacity = 1;
      
      // loadingState 100%
      viewerReady.value = true;
      console.log('viewerReady.value:',viewerReady.value);
      // Pass the model to the parent component
      emit('model-loaded', model)

    })
    .catch(error => {
      console.error('Error initializing Three.js:', error);
    });
}


function handleControl(control) {
  console.log('control', control);
}

defineExpose({
  handleControl,
});

</script>

<style>
.three-container {
  position: relative;
}
canvas {
  transition: opacity 1s;
}

.spinner-container {
  position: relative;
  width: 100px;
  height: 100px;
}

.loader-1 {
  position: absolute;
  top: 0;
  left: 0;
  height: 100px;
  width: 100px;
  border: 5px solid #ccc0;
  border-right-color: var(--p-primary-color);
  /* border: solid; */
  border-radius: 50%;
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.spinner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
}
</style>
<template>

  <!-- <p>Loading Time: {{ loadTime }} ms</p> -->
  <!-- <p v-if="loading != '0' && loading != '100'">{{ loading + '% loaded'}}</p> -->
  <div ref="threeContainer" class="w-full h-screen"></div>
</template>

<!-- <script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useModelControls } from '../../composables/useModelControls';
import { toRaw } from 'vue';
// Reactive state
const loadTime = ref(0); // Store the load time
const threeContainer = ref(null); // DOM reference for the Three.js container
const loading = ref('0')
// Three.js specific variables

const { model, rotateModel } = useModelControls();

let scene, camera, renderer;

// Initialize the Three.js scene, camera, and renderer
const initThreeJS = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);

  animate();
};

const fileName = "MyAssemblyDemo"//MyAssemblyDemo`, Garage, demo, MyAssemblyDemoBIGscale 

// Load a GLB model using GLTFLoader
const loadGLBModel = (startTime) => {
  const loader = new GLTFLoader();
  loader.load(
    `https://myassembly.co/src/assets/glbModel/${fileName}.glb`, // Replace with your GLB file path
    (gltf) => {
      model.value = gltf.scene;
      scene.add(toRaw(model.value));//ToRaw Usage

      const endTime = performance.now();
      loadTime.value = (endTime - startTime).toFixed(2); // Calculate loading time
    },
    (xhr) => {
      loading.value = ((xhr.loaded / xhr.total) * 100).toFixed() 
    },
    (error) => {
      console.error('An error occurred while loading the GLB model:', error);
    }
  );
};


const moveCamByOne = () => {
  camera.position.z += 100
}

function handleControl(arg) {
  if(arg == "zoomCam") {
    moveCamByOne()
  }
}

defineExpose({
  handleControl,
});

const startTime = performance.now();

loadGLBModel(startTime);

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  rotateModel();
  renderer.render(scene, camera);
};

// Initialize Three.js on component mount
onMounted(() => {
  initThreeJS();
});


</script> -->

<script setup>
import { onMounted, ref } from 'vue';
import { useThreeJs } from '@/composables/useThreeJs'; // Import the composable

const threeContainer = ref(null);
const { initThreeJs } = useThreeJs();

const props = defineProps({
  modelUrl: {
    type: String,
    required: true,
  },
});


onMounted(() => {
  if (threeContainer.value) {
    initThreeJs(threeContainer.value, props.modelUrl); // Pass container and model URL
  }
});
</script>

<style>
.three-container {
  position: relative;
}
</style>


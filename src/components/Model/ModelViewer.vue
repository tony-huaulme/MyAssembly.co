<template>
  <div>
    <button @click="moveCamByOne">MOVE CAM</button>
    <p>Loading Time: {{ loadTime }} ms</p>
    <p v-if="loading != '0' && loading != '100'">{{ loading + '% loaded'}}</p>
    <div ref="threeContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue';
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

// Load a GLB model using GLTFLoader
const loadGLBModel = (startTime) => {
  const loader = new GLTFLoader();
  loader.load(
    'https://myassembly.co/src/assets/glbModel/demo.glb', // Replace with your GLB file path
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
  camera.position.z ++
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


</script>

<style scoped>
button {
  margin: 10px;
}

#threeContainer {
  width: 100%;
  height: 100%;
}
</style>

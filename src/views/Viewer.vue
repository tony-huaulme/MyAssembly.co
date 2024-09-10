<template>
    <div>
      <button @click="toggleModelType">Toggle Model (Currently: {{ loadGLB ? 'GLB' : 'Serialized' }})</button>
      <button @click="loadModel">Load Model</button>
      <button @click="serializeModel" :disabled="!model">Serialize Model</button> <!-- New button to serialize the model -->
      <p>Loading Time: {{ loadTime }} ms</p>
      <div ref="threeContainer"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  
  // Reactive state
  const loadGLB = ref(true); // Toggle between GLB and Serialized
  const loadTime = ref(0); // Store the load time
  const threeContainer = ref(null); // DOM reference for the Three.js container
  
  // Three.js specific variables
  let scene, camera, renderer, model;
  
  // Toggle between GLB and serialized model
  const toggleModelType = () => {
    loadGLB.value = !loadGLB.value;
  };
  
  // Clear the scene (remove existing models)
  const clearScene = () => {
    if (model) {
      scene.remove(model);
      model = null;
    }
  };
  
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
      'https://myassembly.co/src/assets/glbModel/0452.glb', // Replace with your GLB file path
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
  
        const endTime = performance.now();
        loadTime.value = (endTime - startTime).toFixed(2); // Calculate loading time
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred while loading the GLB model:', error);
      }
    );
  };
  
  // Load a serialized model using ObjectLoader
  const loadSerializedModel = (startTime) => {
    const loader = new THREE.ObjectLoader();
    fetch('path_to_your_model/serialized_model.json') // Replace with your JSON file path
      .then((response) => response.json())
      .then((json) => {
        model = loader.parse(json);
        scene.add(model);
  
        const endTime = performance.now();
        loadTime.value = (endTime - startTime).toFixed(2); // Calculate loading time
      })
      .catch((error) => {
        console.error('An error occurred while loading the serialized model:', error);
      });
  };
  
  // Load the model (either GLB or serialized)
  const loadModel = () => {
    clearScene();
    const startTime = performance.now();
  
    if (loadGLB.value) {
      loadGLBModel(startTime);
    } else {
      loadSerializedModel(startTime);
    }
  };
  
  // Serialize the currently loaded model and download it as a JSON file
  const serializeModel = () => {
    if (model) {
      const serializedModel = model.toJSON();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(serializedModel));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "serialized_model.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else {
      console.warn('No model is loaded to serialize');
    }
  };
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
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
  
import { onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function useThreeJs() {
  let scene, camera, renderer, labelRenderer, orbitControls, animationFrameId, model;

  const initThreeJs = (container, modelUrl, loadingProgress, tweenGroup) => {
    return new Promise((resolve, reject) => {
      const base = { x: 0, y: 5, z: 18 };

      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      camera.position.set(base.x, base.y, base.z);
      camera.lookAt(0, 0, 0);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.domElement.style.opacity = 0;
      container.appendChild(renderer.domElement);

      // OrbitControls
      orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableDamping = true;
      orbitControls.dampingFactor = 0.25;
      orbitControls.enableZoom = true;

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 3);
      dirLight.position.set(10, 10, 10);
      scene.add(dirLight);

      // Load the model using GLTFLoader
      if (modelUrl) {
        const loader = new GLTFLoader();
        loader.load(
          modelUrl,
          (gltf) => {
            model = gltf.scene;
            scene.add(model);

            // Center the model in the scene
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.set(-center.x, -center.y, -center.z);

            const originalScale = model.scale.clone();

            // Handle resize event to maintain the model's scale and aspect ratio
            const onResize = () => {
              const width = container.offsetWidth;
              const height = container.offsetHeight;
              camera.aspect = width / height;
              camera.updateProjectionMatrix();
              renderer.setSize(width, height);
              model.scale.copy(originalScale);
            };

            window.addEventListener('resize', onResize);

            // Animate the scene
            const animate = () => {
              animationFrameId = requestAnimationFrame(animate);
              renderer.render(scene, camera);
              orbitControls.update();
            };

            animate();

            // Cleanup on unmount
            onUnmounted(() => {
              console.log('Cleanup Three.js');
              console.log('animationFrameId:', animationFrameId);
              cancelAnimationFrame(animationFrameId);
              console.log('removeEventListener resize');
              window.removeEventListener('resize', onResize);
              console.log('removeChild renderer.domElement');
              container.removeChild(renderer.domElement);
            });
            loadingProgress.value = 100;
            let canvas = renderer.domElement;
            // Resolve the Promise once the model is loaded and everything is set up
            resolve({ model, scene, camera, renderer, orbitControls, canvas });
          },
          (xhr) => {
            // Calculate and update the loading progress
            loadingProgress.value = Math.round((xhr.loaded / xhr.total) * 100);
          },
          (error) => {
            console.error('An error occurred while loading the model:', error);
            reject(error);
          }
        );
      } else {
        reject(new Error('No model URL provided'));
      }
    });
  };

  return { initThreeJs };
}



// import { ref, onUnmounted } from 'vue';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// export function useThreeJs() {
//   let scene, model;
//   const camera = ref(null);
//   const renderer = ref(null);
//   const labelRenderer = ref("leRendererLabel");
//   const orbitControls = ref(null);
//   const animationFrameId = ref(null);

//   const initThreeJs = (container, modelUrl) => {
//     const base = { x: 0, y: 5, z: 18 };

//     // Scene
//     scene = new THREE.Scene();

//     // Camera
//     camera.value = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
//     camera.value.position.set(base.x, base.y, base.z);
//     camera.value.lookAt(0, 0, 0);

//     // Renderer
//     renderer.value = new THREE.WebGLRenderer({ antialias: true });
//     renderer.value.setClearColor(0x000000, 0);
//     renderer.value.setPixelRatio(window.devicePixelRatio);
//     renderer.value.setSize(container.offsetWidth, container.offsetHeight);
//     container.appendChild(renderer.value.domElement);

//     // CSS2DRenderer
//     // labelRenderer.value = new CSS2DRenderer();
//     // labelRenderer.value.domElement.style.position = 'absolute';
//     // labelRenderer.value.domElement.style.top = '0px';
//     // container.appendChild(labelRenderer.value.domElement);

//     // OrbitControls
//     orbitControls.value = new OrbitControls(camera.value, renderer.value.domElement);
//     orbitControls.value.enableDamping = true;
//     orbitControls.value.dampingFactor = 0.25;
//     orbitControls.value.enableZoom = true;

//     // Lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//     scene.add(ambientLight);

//     const dirLight = new THREE.DirectionalLight(0xffffff, 3);
//     dirLight.position.set(10, 10, 10);
//     scene.add(dirLight);

//     // Load the model using GLTFLoader
//     if (modelUrl) {
//       const loader = new GLTFLoader();
//       loader.load(
//         modelUrl,
//         (gltf) => {
//           model = gltf.scene;
//           scene.add(model);

//           // Center the model in the scene
//           const box = new THREE.Box3().setFromObject(model);
//           const center = box.getCenter(new THREE.Vector3());
//           model.position.set(-center.x, -center.y, -center.z);
          
//           const originalScale = model.scale.clone();

//           // Handle resize event to maintain the model's scale and aspect ratio
//           const onResize = () => {
//             const width = container.offsetWidth;
//             const height = container.offsetHeight;
//             camera.value.aspect = width / height;
//             camera.value.updateProjectionMatrix();
//             renderer.value.setSize(width, height);
//             // labelRenderer.value.setSize(width, height);
//             model.scale.copy(originalScale);
//           };
//           window.addEventListener('resize', onResize);
//         },
//         undefined,
//         (error) => {
//           console.error('An error occurred while loading the model:', error);
//         }
//       );
//     } else {
//       console.error('No model URL provided');
//     }

//     // Animate
//     const animate = () => {
//       animationFrameId.value = requestAnimationFrame(animate);
//       renderer.value.render(scene, camera.value);
//       orbitControls.value.update();
//       // labelRenderer.value.render(scene, camera.value);
//     };

//     animate();

//     // Cleanup
//     onUnmounted(() => {
//       cancelAnimationFrame(animationFrameId.value);
//       window.removeEventListener('resize', onResize);
//       container.removeChild(renderer.value.domElement);
//       container.removeChild(labelRenderer.value.domElement);
//     });

//     return { model, camera, renderer, labelRenderer, orbitControls };

//   };

//   return { initThreeJs };
// }

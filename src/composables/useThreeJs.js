import { onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TG } from '../ThreeJs/building/ModelAnimation';

export function useThreeJs() {
  let scene, camera, renderer, labelRenderer, orbitControls, animationFrameId, model, cameraLight;

  const initThreeJs = (container, modelUrl, loadingProgress, controle, callbackPieceClicked) => {


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
      console.log('renderer.domElement:', container);
      container.appendChild(renderer.domElement);

      // OrbitControls
      orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableDamping = controle;
      orbitControls.enableZoom = controle;
      orbitControls.enableRotate = controle;
      orbitControls.enablePan = controle;
      orbitControls.autoRotate = controle;
      orbitControls.autoRotateSpeed = 1.5;

      orbitControls.dampingFactor = 0.25;
      
      // Directional light (acts like sunlight)
      const directionalLight = new THREE.DirectionalLight(0xAEB3B8, 3); // White light
      directionalLight.position.set(10, 10, 10); // Position it in front of the model
      directionalLight.castShadow = true; // Enable shadows if needed

      // Optional: Add a second directional light to simulate bounced light or another light source
      const directionalLight2 = new THREE.DirectionalLight(0xAEB3B8, 7); 
      directionalLight2.position.set(-10, -10, 10); // Position opposite for balance
      camera.add(directionalLight2); // Attach light to camera


      camera.add(directionalLight); // Attach light to camera
      scene.add(camera); // Add the camera to the scene as an object

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
              
              TG.update();

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
              console.log('canceling all animations');
              TG.removeAll();
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

      let mouseDownTime = 0;
      let startX = 0, startY = 0;

      renderer.domElement.addEventListener('mousedown', (event) => {
        mouseDownTime = Date.now(); // Record time when the mouse is pressed down
        startX = event.clientX; // Record start X position
        startY = event.clientY; // Record start Y position
      });

      renderer.domElement.addEventListener('mouseup', (event) => {

        const mouseUpTime = Date.now(); // Record time when the mouse is released

        // Check if the click was quick and mouse did not move much
        const timeDiff = mouseUpTime - mouseDownTime;
        const movedDistance = Math.sqrt(Math.pow(event.clientX - startX, 2) + Math.pow(event.clientY - startY, 2));

        if (timeDiff < 200 && movedDistance < 5) { 

          const raycaster = new THREE.Raycaster();
          const mouse = new THREE.Vector2();


          const rect = renderer.domElement.getBoundingClientRect();

          // Calculate mouse position in normalized device coordinates (-1 to +1)
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;


          // Update the picking ray with the camera and mouse position
          raycaster.setFromCamera(mouse, camera);

          // Calculate objects intersecting the picking ray
          const intersects = raycaster.intersectObjects(scene.children, true);

          if (intersects.length > 0) {
            callbackPieceClicked(intersects[0].object.myassemblyPanelName);
          }
        }
      });

    });
  };

  return { initThreeJs };
}
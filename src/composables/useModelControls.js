import { ref } from 'vue';

const isRotating = ref(false); // Defined outside to be shared


export function useModelControls() {
  const model = ref(null);

  const rotateModel = () => {
    if (model.value && isRotating.value) {
      model.value.rotation.y += 0.01;
    }
  };

  const toggleRotation = () => {
    isRotating.value = !isRotating.value
    model.value.orbitControls.autoRotate = !model.value.orbitControls.autoRotate
  }

  const stopAutoRotation = () => {
    model.value.orbitControls.autoRotate = false
  }

  return {
    isRotating,
    model,
    rotateModel
  };
}
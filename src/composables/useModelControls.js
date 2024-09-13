import { ref } from 'vue';

const isRotating = ref(false); // Defined outside to be shared


export function useModelControls() {
  const model = ref(null);

  const rotateModel = () => {
    if (model.value && isRotating.value) {
      model.value.rotation.y += 0.01;
    }
  };

  return {
    isRotating,
    model,
    rotateModel
  };
}
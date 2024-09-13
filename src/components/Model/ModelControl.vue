<template>
<div class="card">
    <div class="control-panel">
        <h2>Control Panel</h2>
        <button @click="$emit('control-model', 'zoomCam');">SEND CONTROL</button>
    </div>
    <div class="controls mt-5">
        <label>
            <input type="checkbox" v-model="isRotating" /> Toggle Model Rotation
        </label>
    </div>
</div>
</template>


<script setup>
  import { useModelControls } from '../../composables/useModelControls';

  // Import the shared state and logic from the composable
  const { isRotating } = useModelControls();

</script>

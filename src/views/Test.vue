<template>
    <div v-if="!selectedComponent">
      <!-- Container for grouped components with buttons -->
      <div v-for="group in groupedComponents" :key="group.label" class="folder-group">
        <h3>{{ group.label }}</h3>
        <div class="button-container">
          <Button
            v-for="item in group.items"
            :key="item.value"
            :label="item.label"
            @click="loadComponent(item.value)"
            class="p-button p-component"
          />
        </div>
      </div>
    </div>
  
    <!-- Render the selected component -->
    <div v-else>
      <Button @click="resetSelection" label="Back to Component List" class="p-button p-component absolute bottom-4 right-4" />
      <component :is="dynamicComponent" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import Button from 'primevue/button';
  
  // Dynamically import all components in the "components" directory and subdirectories
  const allComponents = import.meta.glob('@/components/**/*.{vue,js,ts}');
  
  // Selected component reference
  const selectedComponent = ref(null);
  const dynamicComponent = ref(null); // Holds the resolved component
  
  // Group components by folder (e.g., AdminDashboard, Dashboard, etc.)
  const groupedComponents = ref([]);
  
  // Populate the grouped components with their respective paths
  Object.keys(allComponents).forEach((path) => {
    const [_, folder, file] = path.match(/\/components\/([^/]+)\/([^/]+)\.\w+$/) || [];
  
    if (folder && file) {
      let group = groupedComponents.value.find((g) => g.label === folder);
      if (!group) {
        group = { label: folder, items: [] };
        groupedComponents.value.push(group);
      }
      group.items.push({ label: "--> " + file.replace(/\.\w+$/, ''), value: path });
    }
  });
  
  // Load the selected component dynamically
  const loadComponent = async (path) => {
    const module = await allComponents[path]();
    dynamicComponent.value = module.default; // Assign the resolved component
    selectedComponent.value = { value: path }; // Mark the component as selected
  };
  
  // Reset the selection
  const resetSelection = () => {
    selectedComponent.value = null;
    dynamicComponent.value = null;
  };
  </script>
  
  <style scoped>
  .folder-group {
    margin-bottom: 1rem;
  }
  
  .folder-group h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .button-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .button-container .p-button {
    margin: 0.25rem;
  }
  </style>
  
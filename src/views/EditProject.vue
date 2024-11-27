<template>
  <ModelFromProjectId v-if="!projectLoading" :editMode="true" @newActivePanel="activePanel = $event"
    @contextMenuTrigger="showContextMenu($event)" v-model:p_project_settings="projectSettings"
    v-model:p_noAccessToModel="noAccessToModel" v-model:p_projectName="projectName" v-model:p_modelUrl="modelUrl" />

  <!-- Edit Active Panel -->
  <!-- <Button v-if="editPanelButtonIsVisible" :label="activePanel" icon="pi pi-pencil" size="large" class="editPanelButton"></Button> -->

  <!-- Edit Panel Form -->
  <Drawer v-model:visible="editPanelDrawerVisible" v-if="activePanel" position="bottom"
    class="!w-full md:!w-80 lg:!w-[40rem] custom-centered-drawer"
    style="position: absolute !important; top: 5vh !important; height: 80vh;">
    <template #header>
      <div style="font-size: x-large; font-weight: 800;"> {{ activePanel }} </div>
      <Button icon="pi pi-save" label="Save Settings" class="p-button-rounded p-button-text p-button-success"
        @click="saveSetting()" />
    </template>
    <p style=" text-align: justify;">
      <div class="flex flex-col gap-1 mb-3">
          <label>Description :</label>
          <Textarea v-model="selectedPanelDescription" class="w-full" />
        </div>
    </p>

    <div v-if="infosTabs && infosTabs.length">
      <div v-for="(tab, index) in infosTabs" :key="tab.value">
        <hr class="w-100 mb-5 mt-5" v-if="index !== 0" />
        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-1 mb-3">
            <label>Title :</label>
            <InputText v-model="tab.title" class="w-full" />
          </div>
          <Button @click="removeTab(index)"  icon="pi pi-times" label="Remove" class="p-button-rounded p-button-text p-button-danger"></Button>
        </div>
        <div class="flex flex-col gap-1 mb-3">
          <label>Description :</label>
          <Textarea class="m-0 w-full" v-model="tab.content" />
        </div>
        <div class="flex flex-col gap-1 mb-3">
          <label>Image Link :</label>
          <InputText v-model="tab.image" class="w-full" />
        </div>
        <img :src="tab.image" :alt="`Bad link or No Image`" class="w-full" />
      </div>
    </div>
    <h3 class="mt-10">Add New Tab</h3>
      <div class="flex flex-col gap-1 mb-3">
        <label>Title:</label>
        <InputText v-model="newTab.title" class="w-full" />
      </div>
      <div class="flex flex-col gap-1 mb-3">
        <label>Description:</label>
        <Textarea v-model="newTab.content" class="m-0 w-full" />
      </div>
      <div class="flex flex-col gap-1 mb-3">
        <label>Image Link:</label>
        <InputText v-model="newTab.image" class="w-full" />
      </div>
      <Button @click="addNewTab"  icon="pi pi-plus" label="Add" class="p-button-rounded p-button-text p-button-info"></Button>


  </Drawer>

  <!-- Context Menu -->
  <ContextMenu ref="menu" :model="itemsContextMenu" />
  <!-- SpeedDial Menu -->
  <SpeedDial :model="itemsSpeedDial" :radius="120" type="quarter-circle" direction="up-left"
    style="position: absolute; right: 25px; bottom: 25px;" />
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

import Button from 'primevue/button';
import ModelFromProjectId from './ModelFromProjectId.vue';
import SpeedDial from 'primevue/speeddial';
import ContextMenu from 'primevue/contextmenu';
import Drawer from 'primevue/drawer';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';



// PrimeVue
const toast = useToast();

// Vue Router
const router = useRouter();

// Project info
const activePanel = ref('');
const projectSettings = ref(null);
const noAccessToModel = ref(true);
const projectLoading = ref(true);
const projectName = ref('');
const modelUrl = ref('');


const route = useRoute();
const projectId = ref(route.query.projectId);


// Edit Stuff
const editPanelDrawerVisible = ref(false);
const editPanelButtonIsVisible = ref(false);

watch(() => editPanelDrawerVisible.value, (newValue) => {
  console.log('Edit Panel Drawer Visible :', newValue);
});

const infosTabs = computed({
  get() {
    if (projectSettings.value) {
      const panels = projectSettings.value?.pannels;
      if (panels) {
        return panels[activePanel.value]?.accordions || [];
      }
    }
    return [];
  },
  set(newTabs) {
    if (projectSettings.value?.pannels[activePanel.value]) {
      projectSettings.value.pannels[activePanel.value].accordions = newTabs;
    }
  }
});

const selectedPanelDescription = computed({
  get() {
    if (projectSettings.value) {
      const panels = projectSettings.value?.pannels;
      if (panels) {
        return panels[activePanel.value]?.description || '';
      }
    }
    return '';
  },
  set(newDescription) {
    if (projectSettings.value?.pannels[activePanel.value]) {
      projectSettings.value.pannels[activePanel.value].description = newDescription;
    }
  }
});


// Method to add a new tab
const addNewTab = () => {
  if (newTab.value.title && newTab.value.content && newTab.value.image) {
    // Create a new tab object
    const newAccordion = {
      title: newTab.value.title,
      content: newTab.value.content,
      image: newTab.value.image,
      value: Date.now() // or any unique value
    };

    // Get the current tabs and push the new one
    const currentTabs = infosTabs.value; // Access the current tabs
    currentTabs.push(newAccordion); // Push the new tab

    // Update the computed property
    infosTabs.value = currentTabs; // This will call the set function

    // Reset the newTab inputs
    newTab.value = {
      title: '',
      content: '',
      image: ''
    };
  }
};

const removeTab = (index) => {
      const currentTabs = infosTabs.value;
      currentTabs.splice(index, 1); // Remove the tab at the specified index
      infosTabs.value = currentTabs; // Update infosTabs to reflect the removal
    };

// New tab data structure
const newTab = ref({
  title: '',
  content: '',
  image: ''
});


async function saveSetting() {
  if(!projectSettings.value) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No settings available', life: 3000 });
    return;
  }
  try {
    const response = await api.put(`projects/${projectId.value}`, {
      settings: JSON.stringify(projectSettings.value) // Convert settings to JSON string if necessary
    }, {
      headers: {
        'Content-Type': 'application/json' // Specify content type if sending JSON
      }
    });
    toast.add({ severity: 'success', summary: 'Settings Saved !', life: 3000 });
    console.log('Project updated successfully:', response.data);
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update', life: 3000 });
    console.error('Error updating project:', error.response ? error.response.data : error.message);
  }

}
// SpeedDial Menu
const itemsSpeedDial = ref([
  {
    label: 'Add',
    icon: 'pi pi-pencil',
    command: () => {
      toast.add({ severity: 'info', summary: 'Active Panel :', detail: activePanel.value, life: 3000 });
    }
  },
  {
    label: 'Update',
    icon: 'pi pi-refresh',
    command: () => {
      toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000 });
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      toast.add({ severity: 'contrast', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
    }
  },
  {
    label: 'Upload',
    icon: 'pi pi-upload',
    command: () => {
      toast.add({ severity: 'warn', summary: 'Upload', detail: 'Data Upload', life: 3000 });

    }
  },
  {
    label: 'Vue Website',
    icon: 'pi pi-external-link',
    command: () => {
      toast.add({ severity: 'secondary', summary: 'Website', detail: 'Website active', life: 3000 });
    }
  }
])

// context menu
const menu = ref();


const itemsContextMenu = computed(() => {
  return [
    {
      label: `Edit ${activePanel.value}`,
      icon: 'pi pi-pencil',
      command: () => {
        // document.getElementById('selectedPanel').click();
        editPanelDrawerVisible.value = true;
      }
    },

    {
      label: `Open Info ${activePanel.value}`,
      icon: 'pi pi-file',
      command: () => {
        toast.add({ severity: 'warn', summary: 'Open Info', detail: "Panel's info", life: 3000 });
      }
    },
    {
      label: `Share ${activePanel.value}`,
      icon: 'pi pi-share-alt',
      command: () => {
        toast.add({ severity: 'info', summary: 'Share', detail: 'Share this panel', life: 3000 });
      }
    },
    {
      separator: true
    },
    {
      label: 'Help',
      icon: 'pi pi-question',
      command: () => {
        toast.add({ severity: 'info', summary: 'Help', detail: 'Ask for Help', life: 3000 });
      }
    },
    {
      label: 'Comments',
      icon: 'pi pi-comments',
      items: [
        { label: 'New', icon: 'pi pi-plus' },
        { label: 'Delete', icon: 'pi pi-trash' },
        { label: 'Export', icon: 'pi pi-upload' }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Quit',
      icon: 'pi pi-times',
      command: () => {
        toast.add({ severity: 'error', summary: 'Quit', detail: 'Quit Button', life: 3000 });
      }
    }
  ];
});

const showContextMenu = (event) => {
  if (activePanel.value) menu.value.show(event);
};

import api from '@/services/api';
async function getProject() {
  try {
    const { data } = await api.get(`projects/${projectId.value}`);
    projectName.value = data.project_name;
 
    projectSettings.value = JSON.parse(data.settings);


    const fileKey = data.file3d_link.split('amazonaws.com/')[1]
    // MyAssemblyDemoLIL.glb


    const res = await api.get(`files/download`, {
      params: {
        file_key: fileKey // Pass file_key in the query string
      }
    });

    modelUrl.value = res["data"].presigned_url;

    if (!modelUrl.value) {
      noAccessToModel.value = true;
    }
    console.log('noAccessToModel BEFORE:', noAccessToModel.value);
    noAccessToModel.value = false;
    projectLoading.value = false;
    console.log('noAccessToModel AFTER:', noAccessToModel.value);

  } catch (error) {
    console.error('Error fetching project:', error);
    projectLoading.value = false;

    noAccessToModel.value = true;
  }
}

onMounted(() => {
  getProject();
});

</script>

<style scoped>
.editPanelButton {
  position: absolute !important;
  top: 50vh !important;
  right: 25px !important;
  z-index: 1000000 !important;
}

.custom-centered-drawer {
  height: 70vh !important;
  /* Adjust as needed */
  margin: auto 0;
  /* Center vertically */
  top: 5vh !important;
  position: absolute !important;
}

.p-drawer-content {
  padding: 5rem !important;
}
</style>
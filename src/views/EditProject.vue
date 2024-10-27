<template>
  <ModelFromProjectId 
    :editMode="true" 
    @newActivePanel="activePanel = $event" 
    @contextMenuTrigger="showContextMenu($event)"
    v-model:projectSettings="projectSettings"
  />
  <!-- Edit Active Panel -->
  <!-- <Button v-if="editPanelButtonIsVisible" :label="activePanel" icon="pi pi-pencil" size="large" class="editPanelButton"></Button> -->
  
  <!-- Edit Panel Form -->
  <Drawer v-model:visibleLeft="editPanelDrawerVisible" class="!w-full md:!w-80 lg:!w-[30rem]">
        <template #header>
           <div style="font-size: x-large; font-weight: 800;"> {{selectedPanelName}} </div>
        </template>

        <p style=" text-align: justify;">
            {{ panelDescription }}
        </p>
    
        <Accordion value="0" v-if="tabs">
            <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
                <AccordionHeader><Checkbox  @click.stop="" v-model="tab.checked" :binary="true" />{{ tab.title }}</AccordionHeader>
                <AccordionContent>
                    <p class="m-0"> {{ tab.content }} </p>
                    <img :src="tab.image" :alt="`Image for tab n°${tab.value}`" class="w-full mt-2" >
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
        <p v-else>No Details Here.</p>

    </Drawer>
  
  <!-- Context Menu -->
  <ContextMenu ref="menu" :model="itemsContextMenu" />
  <!-- SpeedDial Menu -->
  <SpeedDial :model="itemsSpeedDial" :radius="120" type="quarter-circle" direction="up-left" style="position: absolute; right: 25px; bottom: 25px;"/>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

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



// PrimeVue
const toast = useToast();

// Vue Router
const router = useRouter();

// Project info
const activePanel = ref('');
const projectSettings = ref(null);

// Edit Stuff
const editPanelDrawerVisible = ref(false);
const editPanelButtonIsVisible = ref(false);

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
// const itemsContextMenu = ref([
//     { label: `Edit ${activePanel.value}`, icon: 'pi pi-file-edit' }
// ]);

const itemsContextMenu = computed(() => {
  return [
    { label: `Edit ${activePanel.value}`, 
      icon: 'pi pi-pencil', 
      command: () => { 
        toast.add({ severity: 'success', summary: 'Edit', detail: 'Edit info', life: 3000 });
        editPanelDrawerVisible.value = true;
      } 
    },

    { label: `Open Info ${activePanel.value}`, 
      icon: 'pi pi-file', 
      command: () => { 
        toast.add({ severity: 'warn', summary: 'Open Info', detail: "Panel's info", life: 3000 });
      } 
    },
    { label: `Share ${activePanel.value}`, 
      icon: 'pi pi-share-alt', 
      command: () => { 
        toast.add({ severity: 'info', summary: 'Share', detail: 'Share this panel', life: 3000 });
      } 
    },
    {
      separator: true
    },
    { label: 'Help', 
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
    { label: 'Quit', 
      icon: 'pi pi-times', 
      command: () => { 
        toast.add({ severity: 'error', summary: 'Quit', detail: 'Quit Button', life: 3000 });
      }
    }
  ];
});

const showContextMenu = (event) => {
  if(activePanel.value) menu.value.show(event);
};


</script>

<style scoped>
.editPanelButton {
  position: absolute !important;
  top: 50vh !important;
  right: 25px !important;
  z-index: 1000000 !important;
}
</style>
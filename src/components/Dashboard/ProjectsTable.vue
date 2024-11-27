<!-- construction du datatable avec primevue -->
<!-- #Id  ||  Nom Client  ||  Nom Projet  ||  Nom Fichier Importé  ||  Statut (SHARED, READY, FILE IMPORTED) ||  [Boutons] -> edit / share / delete -->
<template>
    <div class="w-fill h-fill">
        <!-- DataTable with Filters and Action Buttons -->
        <div class="card w-fill" v-if="projects != []">
            <DataTable  class="w-fill" style="height: 85vh;" v-model:filters="filters" :value="projects" dataKey="id"
                scrollable scrollHeight="flex" tableStyle="min-width: 50rem" :loading="loading"
                paginator :rows="8" 
                filterDisplay="menu" :globalFilterFields="['project_name', 'file3d_link', 'statut']">
                <!-- Header Template -->
                <template #header>
                    
                    <div class="flex justify-between mb-3 flex-column md:flex-row">
                        <!-- class="flex justify-between" si avec le remove filter button qui est just en dessous -->
                        <Button style="height: fit-content;" type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                        
                        <h1 class="flex flex-row align-items-center md:mt-0 mt-5 font-semibold text-xl mb-4">
                        Projects
                        <Button 
                            rounded  text
                            icon="" 
                            id="refreshProjectsButton"
                            class="" 
                            @click="updateProjectTable()"
                        />
                    </h1>
                        
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search mr-3" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        </IconField>
                    </div>
                </template>

                <!-- Empty and Loading Templates -->
                <template #empty>
                    Create your first project now !
                    <div id="pv_id_1_1_0" @click="clickCreateProject" class="p-menu-item" role="menuitem" aria-label="New" data-pc-section="item" data-p-focused="false" data-p-disabled="false"><div class="p-menu-item-content" data-pc-section="itemcontent"><a class="flex items-center blink p-menu-item-link" tabindex="-1" aria-hidden="true" data-pc-section="itemlink"><span class="pi pi-plus"></span><span class="ml-2">New</span><!--v-if--><!--v-if--></a></div></div>
                </template>
                <template #loading>Loading project data. Please wait.</template>

                <!-- Columns -->
                <Column field="project_name" header="Project Name" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.project_name }}</template>
                    <!-- <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" placeholder="Search by project name" />
                    </template> -->
                </Column>

                <Column field="file3d_link" header="Imported 3D File" style="min-width: 12rem">
                    <template #body="{ data }">{{ data.file3d_link.split('/').pop() }}</template>
                    <!-- <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" placeholder="Search by file name" />
                    </template> -->
                </Column>

                <Column field="statut" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                    <template #body="{ data }">
                        <Tag :value="data.statut" :severity="getSeverity(data.statut)" />
                    </template>
                    <!-- <template #filter="{ filterModel }">
                        <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
                            <template #option="slotProps">
                                <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                            </template>
                        </Select>
                    </template> -->
                </Column>

                <!-- Action Buttons Column -->
                <Column header="Actions" bodyClass="p-text-center">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" class="p-button-rounded p-button-contrast mr-2"
                            @click="openProject(slotProps.data)" rounded outlined/>

                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-warn mr-2"
                            @click="editProject(slotProps.data)" rounded outlined/>
                        <Button icon="pi pi-cog" class="p-button-rounded p-button-secondary"
                        a  @click="activeProject = slotProps.data; projectSettingDrawerVisible = true" rounded outlined/>

                        <Button icon="pi pi-share-alt" class="p-button-rounded mr-2"
                            @click="shareProject(slotProps.data)" rounded outlined/>

                    </template>
                </Column>
            </DataTable>
        </div>
        <div v-else>
            Create your first project now !
            <div  id="pv_id_1_1_0" @click="clickCreateProject" class="p-menu-item" role="menuitem" aria-label="New" data-pc-section="item" data-p-focused="false" data-p-disabled="false"><div class="p-menu-item-content" data-pc-section="itemcontent"><a class="flex items-center blink p-menu-item-link" tabindex="-1" aria-hidden="true" data-pc-section="itemlink"><span class="pi pi-plus"></span><span class="ml-2">New</span><!--v-if--><!--v-if--></a></div></div>
        </div>
    </div>

    <ShareDemoModal v-model:visible="showShareModal" v-model:activeProject="activeProject"/>

    <Dialog 
        v-model:visible="projectSettingDrawerVisible" 
        modal 
        header="Project Settings" 
        :style="{ width: '50rem' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
   
        
        <div 
            class="flex flex-col gap-5 pr-4" 
            style="overflow-y: auto; padding: 5px; max-height: 75vh;">
            <!-- input for each project infos / setting like porjectName -->
            <div>
                <h4>Shared Informations :</h4>
                <div class="ml-3 flex flex-col gap-5">

                    <div class="flex flex-col gap-2">
                        <label for="projectName">Name</label>
                        <InputText disabled id="projectName"  v-model="activeProject.project_name" aria-describedby="name-help" />
                        <!-- <small id="projectName-help">This is the name</small> -->
                    </div>
                    <!-- texte area for project description -->
                    
                    <div class="flex flex-col gap-2">
                        <label for="projectDescription">Description 
                            <!-- preview the description -->
                            <!-- <Button type="button" icon="pi pi-eye" label="Preview" @click="togglePreview" class="ml-3"/> -->
                        </label>
                        <Editor v-model="activeProject.settings.description" editorStyle="height: 320px" />
                        <!-- <small id="projectDescription-help">Here can go general information</small> -->
                    </div>

                </div>
            </div>

            <div>
                <h4>Project Files :</h4>
                <div class="ml-3 flex flex-col gap-5">
                    <div class="flex flex-col gap-2">
                        <label for="projectFile">3D File</label>
                        <InputText disabled id="projectFile"  v-model="activeProject.file3d_link" aria-describedby="file-help" />
                        <Button disabled icon="pi pi-upload" label="Upload an updated file" />
                        <!-- <small id="projectFile-help">This is the file</small> -->
                    </div>
                </div>
            </div>
           
            <!-- responsive container with on the right input file for image and on the left the inputed image or a placeholder -->
            
            <div>
                <h4>Model Background Image :</h4>
                <div class="ml-3 flex flex-col gap-5">
                    <div class="flex flex-col gap-2">
                        <label for="projectImage">Image</label>
                        <div class="flex flex-row gap-5">
                            <div class="flex flex-col gap-2">
                                <img src="https://www.myassembly.co/src/assets/logo_darkmode.png" alt="project image" style="max-width: 200px;"/>
                                <Button disabled icon="pi pi-upload" label="Upload" />
                            </div>
                            <div>
                                <img src="../../assets/brandImageBg.gif" alt="" style="max-width: 400px;">
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
            <div class="flex justify-end gap-5 ">
                <Button disabled label="Delete Project" icon="pi pi-times" class="p-button-danger" @click="deleteProject(activeProject.id)" />
                <Button disabled label="Save" icon="pi pi-check" class="p-button-success" @click="projectSettingDrawerVisible = false" />
            </div>
        </div>

    </Dialog>

    <Popover ref="op" style="max-width: 35vw;">
       <div v-html="pd" class="overflow-auto"></div>
    </Popover>    
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Editor from 'primevue/editor';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import ShareDemoModal from '../ShareDemoModal.vue'; 
import Popover from 'primevue/popover';

import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

import { FilterMatchMode, FilterOperator } from '@primevue/core/api'; // Correct import for PrimeVue API filters
import { useToast } from "primevue/usetoast";



function clickCreateProject() {
    document.getElementById('createProjectButton').click();
}

const router = useRouter();
const toast = useToast();

// Project data
const projects = ref([]);

const showShareModal = ref(false);
const activeProject = ref(null);
const loading = ref(true);
const projectSettingDrawerVisible = ref(false);

const pd = ref(`<h2>Let's Build It Together!</h2> <p>We’re excited to help you bring this project to life! To ensure a smooth and successful building experience, please review these essential points before you get started:</p> <h3>Important Reminders:</h3> <ol> <li><strong>Follow the provided recommendations:</strong> These are designed to guide you safely and effectively through each step. Please adhere to each guideline for the best results.</li> <li><strong>Avoid using any fire tools:</strong> For safety, do not use any open flames or tools that require fire in any part of this project. If specific tools are required, please refer to the recommended tools list.</li> <li><strong>Reach out for support:</strong> If you have any questions or uncertainties about any aspect of the building process, our team is here to help. Please contact us through our support form at <a href="www.company.com" target="_blank" rel="noopener noreferrer">www.company.com</a> for prompt assistance.</li> </ol> <h2>The Classic Method:</h2> <p>Below is an image illustrating the traditional construction approach for this project. Follow the outlined steps carefully to ensure stability, durability, and optimal aesthetics.</p><h2>Let's Build It Together!</h2> <p>We’re excited to help you bring this project to life! To ensure a smooth and successful building experience, please review these essential points before you get started:</p> <h3>Important Reminders:</h3> <ol> <li><strong>Follow the provided recommendations:</strong> These are designed to guide you safely and effectively through each step. Please adhere to each guideline for the best results.</li> <li><strong>Avoid using any fire tools:</strong> For safety, do not use any open flames or tools that require fire in any part of this project. If specific tools are required, please refer to the recommended tools list.</li> <li><strong>Reach out for support:</strong> If you have any questions or uncertainties about any aspect of the building process, our team is here to help. Please contact us through our support form at <a href="www.company.com" target="_blank" rel="noopener noreferrer">www.company.com</a> for prompt assistance.</li> </ol> <h2>The Classic Method:</h2> <p>Below is an image illustrating the traditional construction approach for this project. Follow the outlined steps carefully to ensure stability, durability, and optimal aesthetics.</p><h2>Let's Build It Together!</h2> <p>We’re excited to help you bring this project to life! To ensure a smooth and successful building experience, please review these essential points before you get started:</p> <h3>Important Reminders:</h3> <ol> <li><strong>Follow the provided recommendations:</strong> These are designed to guide you safely and effectively through each step. Please adhere to each guideline for the best results.</li> <li><strong>Avoid using any fire tools:</strong> For safety, do not use any open flames or tools that require fire in any part of this project. If specific tools are required, please refer to the recommended tools list.</li> <li><strong>Reach out for support:</strong> If you have any questions or uncertainties about any aspect of the building process, our team is here to help. Please contact us through our support form at <a href="www.company.com" target="_blank" rel="noopener noreferrer">www.company.com</a> for prompt assistance.</li> </ol> <h2>The Classic Method:</h2> <p>Below is an image illustrating the traditional construction approach for this project. Follow the outlined steps carefully to ensure stability, durability, and optimal aesthetics.</p>`);

watch( activeProject, (val) => {
    if (val.project_description) {
        pd.value = val.project_description;
    }
});

const op = ref(null);
const togglePreview = (event) => {
    op.value.toggle(event);
}

import api from '@/services/api';
async function updateProjectTable() {

    try {
        const {data} = await api.get('projects');
        loading.value = true;
        projects.value = data.projects;
        loading.value = false;
    } catch (error) {
        loading.value = false;
        console.error('Error Getting Projects:', error.response);
        // projects.value = [{ id: 44, project_name: 'UFO_1', file3d_link: 'HOUSE.obj', statut: 'SHARED' }]
           
        // if response status is 401, redirect to login page
        if (error.response.status === 401) {
            router.push({ name: 'authenticate' });
        }

    }
}


onMounted(async () => {
    updateProjectTable();
});
// Filters and options
const filters = ref();

const statuses = ref(["SHARED", "READY TO SHARE", "FILE IMPORTED"]);

// Methods for actions
const editProject = (project) => {
    activeProject.value = project;
    router.push({ name: 'EditProject', query: { projectId: project.id } });
    console.log("Editing project:", project);
};

const shareProject = (project) => {
    activeProject.value = project;
    showShareModal.value = true;
};

const deleteProject = (project) => {
    api.get(`projects_delete/${project.id}`).then((res) => {
        if (res.status === 200) {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Project Deleted', life: 3000 });
            projects.value = projects.value.filter((p) => p.id !== project.id);
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete', life: 3000 });
        }
    }).catch((error) => {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete', life: 3000 });
    });
};

const openProject = (project) => {
    router.push({ name: 'ModelFromProjectId', query: { projectId: project.id } });
};




// Initialize Filters
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nomClient: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        nomProjet: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        file3d_link: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        statut: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    };
};

// Call initFilters to initialize filters
initFilters();


// Utility functions
const clearFilter = () => {
    initFilters(); // Reset filters to the initial state
};

const getSeverity = (status) => {
    switch (status) {
        case 'SHARED':
            return 'success';
        case 'READY TO SHARE':
            return 'info';
        case 'FILE IMPORTED':
            return 'warn';
        default:
            return null;
    }
};
</script>
<style>

.p-datatable-table-container {
  --sb-track-color: var(--p-content-background);
  --sb-thumb-color: var(--p-primary-color);
  --sb-size: 6px;
}

.p-datatable-table-container::-webkit-scrollbar {
  width: var(--sb-size)
}

.p-datatable-table-container::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 3px;
}

.p-datatable-table-container::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 3px;
  
}

@supports not selector(::-webkit-scrollbar) {
  .p-datatable-table-container {
    scrollbar-color: var(--sb-thumb-color)
                     var(--sb-track-color);
  }
}

button > svg {
    width: 25px;
    height: 25px;
}

.p-datatable-header-cell {
    padding: var(--p-datatable-header-cell-padding);
    /* background: #3a3a45; */
    border-style: solid;
}

.p-datatable-header{
    padding: 0px 0px 0.5rem 0px !important;

}

.p-dialog-content {
    overflow-y: auto !important;
}

</style>
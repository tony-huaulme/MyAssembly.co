<!-- construction du datatable avec primevue -->
<!-- #Id  ||  Nom Client  ||  Nom Projet  ||  Nom Fichier Importé  ||  Statut (SHARED, NOT-SHARED, FILE IMPORTED) ||  [Boutons] -> edit / share / delete -->
<template>
    <div class="w-fill">
        <h1 class="flex flex-row align-items-center gap-5 md:mt-0 mt-5" style="text-wrap: balance; font-size: 6vw;     padding: 1rem;">
            <Button icon="pi pi-refresh" class="p-button-rounded p-button-secondary" @click="updateProjectTable()"/>
            Projects
        </h1>
        <!-- button with icon refresh triggering updateProjectTable() -->
        
        <!-- DataTable with Filters and Action Buttons -->
        <DataTable v-if="projects != []" class="w-fill" v-model:filters="filters" :value="projects" dataKey="id"
            scrollable scrollHeight="flex" tableStyle="min-width: 50rem" :loading="loading"
            filterDisplay="menu" :globalFilterFields="['nomClient', 'project_name', 'nomFichierImporte', 'statut']">
            <!-- Header Template -->
            <!-- <template #header>
                <div class="flex justify-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search mr-3" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template> -->

            <!-- Empty and Loading Templates -->
            <template #empty>
                Create your first project now !
                <div id="pv_id_1_1_0" @click="clickCreateProject" class="p-menu-item" role="menuitem" aria-label="New" data-pc-section="item" data-p-focused="false" data-p-disabled="false"><div class="p-menu-item-content" data-pc-section="itemcontent"><a class="flex items-center blink p-menu-item-link" tabindex="-1" aria-hidden="true" data-pc-section="itemlink"><span class="pi pi-plus"></span><span class="ml-2">New</span><!--v-if--><!--v-if--></a></div></div>
            </template>
            <template #loading>Loading project data. Please wait.</template>

            <!-- Columns -->
            <Column field="project_name" header="Project Name" style="min-width: 12rem">
                <template #body="{ data }">{{ data.project_name }}</template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by project name" />
                </template>
            </Column>

            <!-- <Column field="nomFichierImporte" header="Imported 3D File" style="min-width: 12rem">
                <template #body="{ data }">{{ data.nomFichierImporte }}</template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by file name" />
                </template>
            </Column>

            <Column field="statut" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :value="data.statut" :severity="getSeverity(data.statut)" />
                </template>
                <template #filter="{ filterModel }">
                    <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>
                </template>
            </Column> -->

            <!-- Action Buttons Column -->
            <Column header="Actions" bodyClass="p-text-center">
                <template #body="slotProps">
           
                    <Button icon="pi pi-eye" class="p-button-rounded p-button-secondary mr-2"
                        @click="openProject(slotProps.data)" />
                    <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2"
                        @click="editProject(slotProps.data)" /> -->
                    <Button icon="pi pi-share-alt" class="p-button-rounded p-button-info mr-2"
                        @click="shareProject(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                      a  @click="deleteProject(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <div v-else>
            Create your first project now !
            <div id="pv_id_1_1_0" @click="clickCreateProject" class="p-menu-item" role="menuitem" aria-label="New" data-pc-section="item" data-p-focused="false" data-p-disabled="false"><div class="p-menu-item-content" data-pc-section="itemcontent"><a class="flex items-center blink p-menu-item-link" tabindex="-1" aria-hidden="true" data-pc-section="itemlink"><span class="pi pi-plus"></span><span class="ml-2">New</span><!--v-if--><!--v-if--></a></div></div>
        </div>
    </div>
    <!-- <ShareDemoModal /> -->
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';

import ShareDemoModal from '../ShareDemoModal.vue'; 

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { FilterMatchMode, FilterOperator } from '@primevue/core/api'; // Correct import for PrimeVue API filters

function clickCreateProject() {
    document.getElementById('createProjectButton').click();
}

const router = useRouter();

// Project data
const projects = ref([]);

const loading = ref(true);


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

const statuses = ref(["SHARED", "NOT-SHARED", "FILE IMPORTED"]);

// Methods for actions
const editProject = (project) => {
    console.log("Editing project:", project);
};

const shareProject = (project) => {
    console.log("Sharing project:", project.id);
};

const deleteProject = (project) => {
    console.log("Deleting project:", project);
};

const openProject = (project) => {

    // Navigate to the Model page with the query param
    router.push({ name: 'ModelFromProjectId', query: { projectId: project.id } });
};

// Initialize Filters
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nomClient: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        nomProjet: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        nomFichierImporte: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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
        case 'NOT-SHARED':
            return 'danger';
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
    background: #3a3a45;
    border-color: #fefefe;
    border-style: solid;
    border-width: 0 0 3px 0;
}

</style>
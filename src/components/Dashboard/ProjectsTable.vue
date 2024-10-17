<!-- construction du datatable avec primevue -->
<!-- #Id  ||  Nom Client  ||  Nom Projet  ||  Nom Fichier Importé  ||  Statut (SHARED, NOT-SHARED, FILE IMPORTED) ||  [Boutons] -> edit / share / delete -->
<template>
    <div class="w-fill">
        <h1 class="mb-5">Projects</h1>

        <!-- DataTable with Filters and Action Buttons -->
        <DataTable v-if="projects != []" class="w-fill" v-model:filters="filters" :value="projects" dataKey="id"
            scrollable scrollHeight="flex" tableStyle="min-width: 50rem"   :loading="loading"
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
            <template #empty>No projects found.</template>
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
            No projects found.
            Create a new project to get started.
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


const router = useRouter();

// Project data
const projects = ref([]);

const loading = ref(true);
import api from '@/services/api';
onMounted(async () => {
    try {

        const {data} = await api.get('projects/');
        
        projects.value = data.projects;
        loading.value = false;

    } catch (error) {
        loading.value = false;
        console.error('Login Error:', error.response.data.error);
        console.log('error.response.status:', error.response.status);
        // if (error.response && error.response.status === 401) {
        //     toast.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials', life: 3000 });
            
        // } else {
        //     toast.add({ severity: 'error', summary: 'Login Failed', detail: error.code, life: 3000 });
        // }
    }

//     setTimeout(() => {

//         loading.value = false;
//         projects.value = [
//         { id: 1, nomClient: "AlphaCorp", nomProjet: "Building Design", nomFichierImporte: "alpha_building_design.ifc", statut: "SHARED" },
// { id: 2, nomClient: "BetaTech", nomProjet: "Structural Analysis", nomFichierImporte: "beta_structural_analysis.glb", statut: "FILE IMPORTED" },
// { id: 3, nomClient: "Gamma Solutions", nomProjet: "Building Safety Audit", nomFichierImporte: "gamma_safety_audit.sat", statut: "NOT-SHARED" },
// { id: 4, nomClient: "DeltaDesign", nomProjet: "Interior Design", nomFichierImporte: "delta_interior_design.obj", statut: "SHARED" },
// { id: 5, nomClient: "EpsilonWorks", nomProjet: "3D Modeling", nomFichierImporte: "epsilon_3d_modeling.stl", statut: "NOT-SHARED" },
// { id: 6, nomClient: "Zeta Urban", nomProjet: "Urban Planning", nomFichierImporte: "zeta_urban_plan.3ds", statut: "FILE IMPORTED" },
// { id: 7, nomClient: "Theta Innovations", nomProjet: "Energy Optimization", nomFichierImporte: "theta_energy_optimization.step", statut: "SHARED" },
// { id: 8, nomClient: "IotaArch", nomProjet: "Architectural Redesign", nomFichierImporte: "iota_architectural_redesign.ifc", statut: "NOT-SHARED" },
// { id: 9, nomClient: "KappaBuild", nomProjet: "Building Construction", nomFichierImporte: "kappa_building_construction.glb", statut: "FILE IMPORTED" },
// { id: 10, nomClient: "Lambda Landscape", nomProjet: "Landscape Planning", nomFichierImporte: "lambda_landscape_plan.obj", statut: "SHARED" },
// { id: 11, nomClient: "MuProjects", nomProjet: "Construction Management", nomFichierImporte: "mu_construction_management.step", statut: "NOT-SHARED" },
// { id: 12, nomClient: "NuBIM", nomProjet: "BIM Training", nomFichierImporte: "nu_bim_training.ifc", statut: "FILE IMPORTED" },
// { id: 13, nomClient: "XiDesign", nomProjet: "Residential Building Design", nomFichierImporte: "xi_residential_building.obj", statut: "SHARED" },
// { id: 14, nomClient: "OmicronConstruction", nomProjet: "Product Development", nomFichierImporte: "omicron_product_development.stl", statut: "NOT-SHARED" },
// { id: 15, nomClient: "PiAnalysis", nomProjet: "Financial Analysis", nomFichierImporte: "pi_financial_analysis.sat", statut: "FILE IMPORTED" },
// { id: 16, nomClient: "RhoResearch", nomProjet: "Research Report", nomFichierImporte: "rho_research_report.step", statut: "SHARED" },
// { id: 17, nomClient: "SigmaMarketing", nomProjet: "Marketing Plan", nomFichierImporte: "sigma_marketing_plan.obj", statut: "NOT-SHARED" },
// { id: 18, nomClient: "TauContent", nomProjet: "Content Strategy", nomFichierImporte: "tau_content_strategy.ifc", statut: "FILE IMPORTED" },
// { id: 19, nomClient: "UpsilonDevelopers", nomProjet: "Site Development", nomFichierImporte: "upsilon_site_development.stl", statut: "SHARED" },
// { id: 20, nomClient: "PhiMarkets", nomProjet: "Market Analysis", nomFichierImporte: "phi_market_analysis.3ds", statut: "NOT-SHARED" },
// { id: 21, nomClient: "ChiAudit", nomProjet: "Audit Report", nomFichierImporte: "chi_audit_report.obj", statut: "FILE IMPORTED" },
// { id: 22, nomClient: "PsiProjects", nomProjet: "Project Planning", nomFichierImporte: "psi_project_planning.step", statut: "SHARED" },
// { id: 23, nomClient: "OmegaBrands", nomProjet: "Brand Strategy", nomFichierImporte: "omega_brand_strategy.glb", statut: "NOT-SHARED" }

// ]
//     }, 333);
});
// Filters and options
const filters = ref();

const statuses = ref(["SHARED", "NOT-SHARED", "FILE IMPORTED"]);

// Methods for actions
const editProject = (project) => {
    console.log("Editing project:", project);
};

const shareProject = (project) => {
    console.log("Sharing project:", project);
};

const deleteProject = (project) => {
    console.log("Deleting project:", project);
};

const openProject = (project) => {

    // Navigate to the Model page with the query param
    router.push({ name: 'Model', query: { from: 'dashboard', modelName: 'DemoModel' } });
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
<!-- construction du datatable avec primevue -->
<!-- #Id  ||  Nom Client  ||  Nom Projet  ||  Nom Fichier Importé  ||  Statut (SHARED, NOT-SHARED, FILE IMPORTED) ||  [Boutons] -> edit / share / delete -->
<template>
    <div class="w-fill max-h-screen">
        <!-- DataTable with Filters and Action Buttons -->
        <DataTable class="w-fill" v-model:filters="filters" :value="projects" dataKey="id"
            scrollable scrollHeight="flex" tableStyle="min-width: 50rem"   :loading="loading"
            filterDisplay="menu" :globalFilterFields="['nomClient', 'nomProjet', 'nomFichierImporte', 'statut']">
            <!-- Header Template -->
            <template #header>
                <div class="flex justify-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search mr-3" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>

            <!-- Empty and Loading Templates -->
            <template #empty>No projects found.</template>
            <template #loading>Loading project data. Please wait.</template>

            <!-- Columns -->
            <Column field="nomProjet" header="Nom Projet" style="min-width: 12rem">
                <template #body="{ data }">{{ data.nomProjet }}</template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by project name" />
                </template>
            </Column>

            <Column field="nomFichierImporte" header="Nom Fichier Importé" style="min-width: 12rem">
                <template #body="{ data }">{{ data.nomFichierImporte }}</template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by file name" />
                </template>
            </Column>

            <Column field="statut" header="Statut" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
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
            </Column>

            <!-- Action Buttons Column -->
            <Column header="Actions" bodyClass="p-text-center">
                <template #body="slotProps">
           
                    <Button icon="pi pi-eye" class="p-button-rounded p-button-secondary mr-2"
                        @click="openProject(slotProps.data)" />
                    
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2"
                        @click="editProject(slotProps.data)" />
                    <Button icon="pi pi-share-alt" class="p-button-rounded p-button-info mr-2"
                        @click="shareProject(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                        @click="deleteProject(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { FilterMatchMode, FilterOperator } from '@primevue/core/api'; // Correct import for PrimeVue API filters

const router = useRouter();

// Project data
const projects = ref([]);

const loading = ref(true);
onMounted(() => {
    setTimeout(() => {

        loading.value = false;
        projects.value = [
    { id: 1, nomClient: "Société Alpha", nomProjet: "Développement Web", nomFichierImporte: "specifications_alpha.pdf", statut: "SHARED" },
    { id: 2, nomClient: "Entreprise Beta", nomProjet: "Analyse de Données", nomFichierImporte: "data_report_beta.xlsx", statut: "FILE IMPORTED" },
    { id: 3, nomClient: "Client Gamma", nomProjet: "Audit de Sécurité", nomFichierImporte: "audit_gamma.docx", statut: "NOT-SHARED" },
    { id: 4, nomClient: "Organisation Delta", nomProjet: "Marketing Digital", nomFichierImporte: "campaign_delta.pptx", statut: "SHARED" },
    { id: 5, nomClient: "Agence Epsilon", nomProjet: "Création de Contenu", nomFichierImporte: "content_plan_epsilon.doc", statut: "NOT-SHARED" },
    { id: 6, nomClient: "Société Zeta", nomProjet: "Développement Mobile", nomFichierImporte: "zeta_mobile_spec.pdf", statut: "FILE IMPORTED" },
    { id: 7, nomClient: "Client Theta", nomProjet: "Optimisation SEO", nomFichierImporte: "seo_plan_theta.xlsx", statut: "SHARED" },
    { id: 8, nomClient: "Entreprise Iota", nomProjet: "Refonte de Site", nomFichierImporte: "iota_website_design.pdf", statut: "NOT-SHARED" },
    { id: 9, nomClient: "Société Kappa", nomProjet: "Développement d'Application", nomFichierImporte: "kappa_app_plan.docx", statut: "FILE IMPORTED" },
    { id: 10, nomClient: "Entreprise Lambda", nomProjet: "Planification Stratégique", nomFichierImporte: "strategy_lambda.pptx", statut: "SHARED" },
    { id: 11, nomClient: "Client Mu", nomProjet: "Gestion de Projet", nomFichierImporte: "project_mu.xlsx", statut: "NOT-SHARED" },
    { id: 12, nomClient: "Organisation Nu", nomProjet: "Formation en Ligne", nomFichierImporte: "nu_training.pdf", statut: "FILE IMPORTED" },
    { id: 13, nomClient: "Agence Xi", nomProjet: "Conception de Logo", nomFichierImporte: "xi_logo_design.doc", statut: "SHARED" },
    { id: 14, nomClient: "Société Omicron", nomProjet: "Développement de Produit", nomFichierImporte: "omicron_product_plan.pptx", statut: "NOT-SHARED" },
    { id: 15, nomClient: "Entreprise Pi", nomProjet: "Analyse Financière", nomFichierImporte: "financial_analysis_pi.xlsx", statut: "FILE IMPORTED" },
    { id: 16, nomClient: "Client Rho", nomProjet: "Rapport de Recherche", nomFichierImporte: "research_report_rho.docx", statut: "SHARED" },
    { id: 17, nomClient: "Organisation Sigma", nomProjet: "Plan Marketing", nomFichierImporte: "sigma_marketing_plan.pdf", statut: "NOT-SHARED" },
    { id: 18, nomClient: "Agence Tau", nomProjet: "Stratégie de Contenu", nomFichierImporte: "content_strategy_tau.doc", statut: "FILE IMPORTED" },
    { id: 19, nomClient: "Société Upsilon", nomProjet: "Développement de Site", nomFichierImporte: "upsilon_website_plan.pptx", statut: "SHARED" },
    { id: 20, nomClient: "Entreprise Phi", nomProjet: "Analyse de Marché", nomFichierImporte: "market_analysis_phi.xlsx", statut: "NOT-SHARED" },
    { id: 21, nomClient: "Client Chi", nomProjet: "Rapport d'Audit", nomFichierImporte: "audit_report_chi.docx", statut: "FILE IMPORTED" },
    { id: 22, nomClient: "Organisation Psi", nomProjet: "Planification de Projet", nomFichierImporte: "psi_project_plan.pdf", statut: "SHARED" },
    { id: 23, nomClient: "Agence Omega", nomProjet: "Stratégie de Marque", nomFichierImporte: "brand_strategy_omega.doc", statut: "NOT-SHARED" },
    { id: 24, nomClient: "Société Alpha", nomProjet: "Développement Web", nomFichierImporte: "specifications_alpha.pdf", statut: "SHARED" },
    { id: 25, nomClient: "Entreprise Beta", nomProjet: "Analyse de Données", nomFichierImporte: "data_report_beta.xlsx", statut: "FILE IMPORTED" },
    { id: 26, nomClient: "Client Gamma", nomProjet: "Audit de Sécurité", nomFichierImporte: "audit_gamma.docx", statut: "NOT-SHARED" },
    { id: 27, nomClient: "Organisation Delta", nomProjet: "Marketing Digital", nomFichierImporte: "campaign_delta.pptx", statut: "SHARED" },
    { id: 28, nomClient: "Agence Epsilon", nomProjet: "Création de Contenu", nomFichierImporte: "content_plan_epsilon.doc", statut: "NOT-SHARED" },
    { id: 29, nomClient: "Société Zeta", nomProjet: "Développement Mobile", nomFichierImporte: "zeta_mobile_spec.pdf", statut: "FILE IMPORTED" },
    { id: 30, nomClient: "Client Theta", nomProjet: "Optimisation SEO", nomFichierImporte: "seo_plan_theta.xlsx", statut: "SHARED" },
    { id: 31, nomClient: "Entreprise Iota", nomProjet: "Refonte de Site", nomFichierImporte: "iota_website_design.pdf", statut: "NOT-SHARED"},
    { id: 32, nomClient: "Société Kappa", nomProjet: "Développement d'Application", nomFichierImporte: "kappa_app_plan.docx", statut: "FILE IMPORTED" },
    { id: 33, nomClient: "Entreprise Lambda", nomProjet: "Planification Stratégique", nomFichierImporte: "strategy_lambda.pptx", statut: "SHARED" },
    { id: 34, nomClient: "Client Mu", nomProjet: "Gestion de Projet", nomFichierImporte: "project_mu.xlsx", statut: "NOT-SHARED" },
    { id: 35, nomClient: "Organisation Nu", nomProjet: "Formation en Ligne", nomFichierImporte: "nu_training.pdf", statut: "FILE IMPORTED" },
    { id: 36, nomClient: "Agence Xi", nomProjet: "Conception de Logo", nomFichierImporte: "xi_logo_design.doc", statut: "SHARED" },
    { id: 37, nomClient: "Société Omicron", nomProjet: "Développement de Produit", nomFichierImporte: "omicron_product_plan.pptx", statut: "NOT-SHARED" },
    { id: 38, nomClient: "Entreprise Pi", nomProjet: "Analyse Financière", nomFichierImporte: "financial_analysis_pi.xlsx", statut: "FILE IMPORTED" },
    { id: 39, nomClient: "Client Rho", nomProjet: "Rapport de Recherche", nomFichierImporte: "research_report_rho.docx", statut: "SHARED" },
    { id: 40, nomClient: "Organisation Sigma", nomProjet: "Plan Marketing", nomFichierImporte: "sigma_marketing_plan.pdf", statut: "NOT-SHARED" },
    { id: 41, nomClient: "Agence Tau", nomProjet: "Stratégie de Contenu", nomFichierImporte: "content_strategy_tau.doc", statut: "FILE IMPORTED" },
    { id: 42, nomClient: "Société Upsilon", nomProjet: "Développement de Site", nomFichierImporte: "upsilon_website_plan.pptx", statut: "SHARED" },
    { id: 43, nomClient: "Entreprise Phi", nomProjet: "Analyse de Marché", nomFichierImporte: "market_analysis_phi.xlsx", statut: "NOT-SHARED" },
    { id: 44, nomClient: "Client Chi", nomProjet: "Rapport d'Audit", nomFichierImporte: "audit_report_chi.docx", statut: "FILE IMPORTED" },
    { id: 45, nomClient: "Organisation Psi", nomProjet: "Planification de Projet", nomFichierImporte: "psi_project_plan.pdf", statut: "SHARED" },
    { id: 46, nomClient: "Agence Omega", nomProjet: "Stratégie de Marque", nomFichierImporte: "brand_strategy_omega.doc", statut: "NOT-SHARED" }
]
    }, 333);
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

    // Navigate to the viewer page with the query param
    router.push({ name: 'Viewer', query: { from: 'dashboard', modelName: 'demo' } });
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
</style>
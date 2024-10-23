<template>
    <div class="card">
        <DataTable :value="projects" tableStyle="min-width: 50rem">
            <Column field="id" header="Project ID"></Column>
            <Column field="project_name" header="Project Name"></Column>
            <Column field="file3d_link" header="3D File Link">
                <template #body="{ data }">
                    <a :href="data.file3d_link" target="_blank">View 3D File</a>
                </template>
            </Column>
            <Column field="created_at" header="Created At">
                <template #body="{ data }">
                    {{ new Date(data.created_at).toLocaleString() }}
                </template>
            </Column>
            <Column field="updated_at" header="Updated At">
                <template #body="{ data }">
                    {{ new Date(data.updated_at).toLocaleString() }}
                </template>
            </Column>
            <Column field="actions" header="Actions">
                <template #body="{ data }">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteProject(data)"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import api from '@/services/api';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const projects = ref([]);

onMounted(() => {
    api.get('/projects_all').then((res) => {
        projects.value = res.data.projects;
    });
});

function deleteProject(data) {
    try {
        api.delete(`/projects/${data.id}`).then((res) => {
            if (res.status === 200) {
                projects.value = projects.value.filter((project) => project.id !== data.id);
                toast.add({ severity: 'success', summary: 'Success', detail: 'Project Deleted', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Project Not Deleted', life: 3000 });
            }
        });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Project Not Deleted', life: 3000 });
    }
}
</script>
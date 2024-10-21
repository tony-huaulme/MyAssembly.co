<template>
    <div class="card">
        <DataTable :value="users" tableStyle="min-width: 50rem">
            <Column field="id" header="Id"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="username" header="User Name"></Column>
            <Column field="actions" header="Actions">
                <template #body="{ data }">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deletUser(data)"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const users = ref([
 
]);

import api from '@/services/api';
import { useToast } from "primevue/usetoast";

const toast = useToast();



onMounted(() => {
    api.get('/users').then((res) => {
      users.value = res.data;
    });
});

function deletUser(data) {

  try {
    api.get(`users/${data.id}`).then((res) => {
      if (res.status === 200) {
        users.value = users.value.filter((user) => user.id !== data.id);
        toast.add({ severity: 'success', summary: 'Success', detail: 'User Deleted', life: 3000 });
      }else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'User Not Deleted', life: 3000 });
      }
    });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'User Not Deleted', life: 3000 });
  }
 
}

</script>
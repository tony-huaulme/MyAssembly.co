<template>
    <div class="min-w-72 mr-5">
        <Menu :model="items" class="w-full md:w-60">
            <template #start>
                <span class="inline-flex items-center gap-1 px-2 py-2">
                        <span class="text-xl font-semibold">DASHBOARD</span>
                </span>
            </template>
            <template #submenulabel="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <RouterLink v-if="item.to" :to="`/dashboard/${item.to}`" class="flex items-center" v-bind="props.action"  >
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                   
                </RouterLink>
                <a v-else class="flex items-center" v-bind="props.action" @click="handleItemClick(item.label)">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                </a>
            </template>
            <template #end>
                <button class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
                    <span class="inline-flex flex-col items-start">
                        <span class="font-bold">Amy Elsner</span>
                        <span class="text-sm">Admin</span>
                    </span>
                </button>
            </template>
        </Menu>
    </div>

    <Dialog v-model:visible="visible" modal header="Create a new preject" :style="{ width: '25rem' }">
        <div class="flex items-center gap-4 mb-4">
            <label for="project_name" class="font-semibold w-24">Project Name</label>
            <InputText id="project_name" class="flex-auto" autocomplete="off" />
        </div>
        <div class="card flex flex-col gap-6 items-center justify-center">
            <Toast />
            <FileUpload ref="fileupload" mode="basic" name="demo[]" :maxFileSize="1000000" @input="onUpload" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" ></Button>
        </div>
    </Dialog>

</template>

<script setup>
import { ref } from "vue";
// PrimeVue Components
import Menu from "primevue/menu";
import Badge from "primevue/badge";
import Avatar from "primevue/avatar";

import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";
import Toast from "primevue/toast";



const items = ref([
    {
        separator: true
    },
    {
        label: 'Assemblies',
        items: [
            {
                label: 'New',
                icon: 'pi pi-plus', 
                // shortcut: '⌘+N'
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                // shortcut: '⌘+S'
            },
            {
                label: 'Stats',
                icon: 'pi pi-chart-bar',
                // shortcut: '⌘+T',
                to: 'statistics'
            }
        ]
    },
    {
        label: 'Profile',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                // shortcut: '⌘+O'
            },
            {
                label: 'Messages',
                icon: 'pi pi-inbox',
                badge: 2
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                // shortcut: '⌘+Q'
            }
        ]
    },
    {
        separator: true
    }
]);

const visible = ref(false);

function handleItemClick(label) {
    if (label === 'New') {
        visible.value = true;
    }
}

import { useToast } from "primevue/usetoast";
const toast = useToast();
const fileupload = ref();

const upload = () => {
    fileupload.value.upload();
};

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

</script>
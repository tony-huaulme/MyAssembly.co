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

    <Dialog v-model:visible="visible" modal header="Create a project" :style="{ width: '45rem' }">
        <div class="card border-none mb-0">
        <!-- <Toast /> -->
        <h4 class="mt-0 mb-1">Project Name :</h4>

        <div class="flex items-center gap-4">
            <InputText id="project_name" class="flex-auto" autocomplete="off" />
        </div>
        <h4 class="mb-1">3D Model :</h4>
        <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="false"  :maxFileSize="1000000000000" @select="onSelectedFiles" class="border-dashed">
            <template #header="{ chooseCallback }">
                <Button v-show="files.length < 1" @click="chooseCallback()" label="Chose File" icon="pi pi-plus"/>
            </template>
            <template #content="{ files, removeFileCallback }">
                <div class="flex flex-col">
                    <div v-if="files.length > 0">
                        <div class="flex flex-row justify-center">
                            <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class=" rounded-border flex flex-col border border-surface items-center gap-4">
                                <div>
                                    <span class="pi pi-file text-7xl"></span>
                                </div>
                                <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded severity="danger" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="flex items-center justify-center flex-col">
                    <i class="pi pi-cloud-upload !border-2 !rounded-full !text-4xl !text-muted-color" />
                    <p class="mt-6 mb-0">Drag and drop a file here to upload.</p>
                </div>
            </template>
 
        </FileUpload>
        <div class="flex justify-end gap-2 mt-5">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Create" ></Button>
            </div>
    </div>

        <!-- <slot name="header">
            <h1 class="mb-7">Create a new preject</h1>
        </slot>

        <div class="card flex flex-col gap-6 items-center justify-center">
            <Toast />
            <FileUpload ref="fileupload" mode="basic" name="demo[]" :maxFileSize="100000000" @input="onUpload" />
        </div>

        <div class="flex items-center gap-4 mb-4">
            <label for="project_name" class="font-semibold w-35">Project Name :</label>
            <InputText id="project_name" class="flex-auto" autocomplete="off" />
        </div>
        
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Create" ></Button>
        </div> -->
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






// Custom file input PrimeVue stuff
import { usePrimeVue } from 'primevue/config';

const $primevue = usePrimeVue();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = () => {
    toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
</script>
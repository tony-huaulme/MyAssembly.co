<template>
    <div class="min-w-72 md:mr-5">
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
                    <span class="ml-2" >
                        {{ item.label }}
                    </span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                   
                </RouterLink>
                <a v-else class="flex items-center" :id="item.label == 'New' ? 'createProjectButton' : ''" v-bind="props.action" @click="handleItemClick(item.label)">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                </a>
            </template>
            <template #end>
                <button class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                    <Avatar v-if="userImageUrl" :image="userImageUrl" class="mr-2" shape="circle" />
                    <span class="inline-flex flex-col items-start">
                        <span class="font-bold">{{ userEmail }}</span>
                        <span class="text-sm">Admin</span>
                    </span>
                </button>
            </template>
        </Menu>
        <RouterLink :to="'/demo'" class="get-started-btn" style="border: none; ">       
        
            <Button class="mt-2 w-full" outlined severity="contrast">
                <slot>
                    <p class="m-0" style=" margin-right: 1ch">Open Demo</p>
                </slot>
            </Button>
            
        </RouterLink>
        <RouterLink :to="'/contact'" class="get-started-btn" style="border: none;">       
            
            <Button class="mt-2 w-full mb-5" style="background-color: var(--p-content-color); border: none; ">
                <slot>
                    <p class="m-0" style=" margin-right: 1ch; color: var(--p-content-background);"><b>Contact Us</b></p>
                </slot>
            </Button>
            
        </RouterLink>
        <Button @click="visibleBookDemo = true">
            <p class="m-0" style=" margin-right: 1ch;" >Book Full Demo</p>
        </Button>
    </div>

    <Dialog v-model:visible="visible" modal header="Create a project" :style="{ width: '45rem' }">
        <div class="card border-none mb-0">
            <!-- <Toast /> -->
            <h4 class="mt-0 mb-1">Project Name :</h4>

            <div class="flex items-center gap-4">
                <InputText v-model="projectName" id="project_name" class="flex-auto" autocomplete="off" />
            </div>
            <h4 class="mb-1">3D Model ( .glb or .ifc ) : <a href="https://imagetostl.com/convert/file/ifc/to/glb#convert" target="_blank" >Convert 3D File</a></h4>
            <FileUpload 
                name="demo[]" 
                url="/api/upload" 
                @upload="onTemplatedUpload($event)" 
                :multiple="false"  
                :maxFileSize="1000000000000" 
                @select="onSelectedFiles" 
                class="border-dashed"
                accept=".glb,.ifc"    
            >
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
                        <p class="mt-6 mb-0">Drag and drop your model here to upload.</p>
                    </div>
                </template>
    
            </FileUpload>

            <div v-if="files.length">
                <!-- using prime vue, make a drop down for model_structure_identification with choice "Piece Description" "IfcElementAssembly" "No Identification" -->
                
                <h4 class="mb-1">Identify Model Structure by :</h4>
                <Dropdown 
                    v-model="model_structure_identification" 
                    :options="model_structure_identification_options" 
                    placeholder="Select a Model Structure Identification" 
                    class="w-full" 
                />

                <div v-if="loadingCreatingProject">
                    <div class="flex justify-center mt-5">
                        <p><b>{{ getWaitingMessage(files[0].size) }}</b></p>
                    </div>
                </div>

            </div>

            <div class="flex justify-end gap-2 mt-5">
                    <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                    <Button type="button" :label="loadingCreatingProject ? 'Creating':'Create'" @click="createNewProject" :loading="loadingCreatingProject"></Button>
                </div>
        </div>

    </Dialog>


    <Dialog v-model:visible="visibleBookDemo" modal header="Book a meeting !">
        <iframe async
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3BBl6hO-4SVKvUYaPT5TvGpLz047dGtzt1uKhqxVkzZvfteleCdVvd0n9KSz5omhT677TuvStu?gv=true"
        style="border: 0; width: 80vw !important;" height="600" frameborder="0"></iframe>
    </Dialog>


</template>

<script setup>
import { onMounted, ref } from "vue";
// PrimeVue Components
import Menu from "primevue/menu";
import Badge from "primevue/badge";
import Avatar from "primevue/avatar";

import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";
import Dropdown from "primevue/dropdown";

const userEmail = ref('');
const userImageUrl = ref('');
const loadingCreatingProject = ref(false);

const model_structure_identification = ref('description');
const model_structure_identification_options = [ 'description' , 'NA' ]; //, 'ifcelementassembly' 

const projectName = ref('');

onMounted(() => {
    userEmail.value = JSON.parse(localStorage.getItem('user_email'));
    userImageUrl.value = JSON.parse(localStorage.getItem('user_picture'))|| false;
    console.log('userImageUrl:', userImageUrl.value);
});

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
            }
        ]
    },
    {
        label: 'Profile',
        items: [
           
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
const visibleBookDemo = ref(false);
function handleItemClick(label) {
    if (label === 'New') {
        visible.value = true;
        sendWebhookCREATING_PROJECT();
    }

    if (label === 'Logout') {
        try {
            api.get('logout');
            toast.add({ severity: 'info', summary: 'Success', detail: 'Logged Out', life: 3000 });
            localStorage.removeItem('user');
            localStorage.removeItem('user_email');
            router.push({ name: 'Authenticate' });
        }catch (error) {
            console.error('Error:', error);
        }

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

import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isFromDemo = ref(route.query.from === 'demo');


import api from '@/services/api';

const createNewProject = async () => {
    // Checking input fields (file and project name)
    if (!projectName.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter a project name', life: 3000 });
        return;
    }

    // Assuming `files` contains the file selected by the user
    if (files.length < 1) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please select a file', life: 3000 });
        return;
    }

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append('file', files.value[0]);  // Attach the first file (files[0])
    // Display loading message
    toast.add({ severity: 'info', summary: 'Loading...', detail: 'Creating your project', life: 3000 });
    loadingCreatingProject.value = true;

    try {

        if (files.value[0].name.endsWith('.ifc')) {
           
            // do same logic as else statement but use this endpoint : /files/convert_getsettings_upload and note tthat you will receive a response with a file_url and a settings_json_stringfyed
            if(model_structure_identification.value == 'description' || model_structure_identification.value == 'NA') {
                const { data: fileUploadResponse } = await api.post('/files/convert_getsettings_upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                // Assuming the backend returns `file_url` in response as the S3 URL
                const file3dLink = fileUploadResponse.file_url;
                console.log('File uploadeResponse:', fileUploadResponse);
                // 2. Create the project by sending the project name and file3D link to '/projects'

                const payload = new URLSearchParams();  // Using URLSearchParams to simulate form encoding
                payload.append('project_name', projectName.value);
                payload.append('file3d_link', file3dLink);
                payload.append('file_name', files.value[0].name);
                payload.append('model_structure', JSON.stringify(fileUploadResponse.model_structure));
                payload.append('model_structure_identification', "description");
                
                const { data: projectResponse } = await api.post('/projects', payload, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'  // Set content type to simulate form submission
                    }
                });

                // Success response
                toast.add({ severity: 'success', summary: 'Success', detail: 'Project created successfully', life: 3000 });
                sendWebhookProject_Created(projectResponse.id, projectResponse.project_name);
                visible.value = false;
                document.getElementById('refreshProjectsButton').click();
                
                console.log('Project created:', projectResponse);
            }else if(model_structure_identification == 'ifcelementassembly') {
                // implement enpoint converting with blender to get the settings
            }

        }else {


            // 1. Upload the file to your backend (assuming '/files/upload' is your upload endpoint)
            const { data: fileUploadResponse } = await api.post('/files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Assuming the backend returns `file_url` in response as the S3 URL
            const file3dLink = fileUploadResponse.file_url;
            console.log('File uploadeResponse:', fileUploadResponse);
            // 2. Create the project by sending the project name and file3D link to '/projects'

            const payload = new URLSearchParams();  // Using URLSearchParams to simulate form encoding
            payload.append('project_name', projectName.value);
            payload.append('file3d_link', file3dLink);
            payload.append('file_name', files.value[0].name);
        
            payload.append('model_structure', JSON.stringify({"panels" : []}));
            payload.append('model_structure_identification', "noidentification");

            const { data: projectResponse } = await api.post('/projects', payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'  // Set content type to simulate form submission
                }
            });

            // Success response
            toast.add({ severity: 'success', summary: 'Success', detail: 'Project created successfully', life: 3000 });
            sendWebhookProject_Created(projectResponse.id, projectResponse.project_name);
            visible.value = false;
            document.getElementById('refreshProjectsButton').click();
            
            console.log('Project created:', projectResponse);
        }


    } catch (error) {
        // Error handling
        toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.message || 'Project creation failed', life: 3000 });
        console.error('Error:', error);
    } finally {
        // Reset loading state
        loadingCreatingProject.value = false;
    }
};



async function sendWebhookCREATING_PROJECT() {
   const webhookUrl = 'https://discord.com/api/webhooks/1300515818399858780/-gn8HVjVh1h7c6h1X_lHC5g0CNzFxoah7htfcC9R7GnXbz4ObhGgd6BpzdortaAjsmWG';
   

   const payload = {
   embeds: [{
    title: `Creating a new project...`,

    color: 8454143, // Green color in decimal
      fields: [
            {
               name: 'Email :',
               value: userEmail.value,
               inline: false
            }
         ]
   }]
   };
   
   try {
   const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
   });

   } catch (error) {
      console.error('nohk');
   }
}



async function sendWebhookProject_Created(projectId, projectName) {
   const webhookUrl = 'https://discord.com/api/webhooks/1300515818399858780/-gn8HVjVh1h7c6h1X_lHC5g0CNzFxoah7htfcC9R7GnXbz4ObhGgd6BpzdortaAjsmWG';
   

   const payload = {
   embeds: [{
    title: `Project Created ! `,

    color: 8454143, // Green color in decimal
      fields: [
            {
               name: 'Email :',
               value: userEmail.value,
               inline: false
            },
            {
               name: 'projectName :',
               value: projectName,
               inline: false
            },
            {
               name: 'Project Link :',
               value: `https://www.myassembly.co/ModelFromProjectId?projectId=${projectId}`,
               inline: false
            }
         ]
   }]
   };
   
   try {
   const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
   });

   } catch (error) {
      console.error('nohk');
   }
}


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
    const dm = 2;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};

const getWaitingMessage = (bytes) => {
    const k = 1024;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `Estimated time for file processing: 0s ( No File )`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Static reference: 2MB = 4 seconds
    const referenceBytes = 2 * k * k; // 2MB in bytes
    const referenceTime = 4; // 4 seconds
    const timeInSeconds = Math.ceil((bytes / referenceBytes) * referenceTime); // Scaled time
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    if (minutes > 0) {
        return `Estimated time for file processing: ${minutes}:${seconds < 10 ? '0' : ''}${seconds} min.`;
    } else {
        return `Estimated time for file processing:  ${seconds} s.`;
    }
};

</script>
<style>

.p-dialog-content{
    overflow: hidden !important;
}

.blink {
    animation: blink-animation 1.8s infinite ease-in-out;
}

@keyframes blink-animation {
    0% { opacity: 1; }
    70% { opacity: 0.2; }
    100% { opacity: 1; }
}
</style>

<template>
       <div class="card">
         <div>
        <p>Enter "date" to display the current date, "greet {0}" for a message and "random" to get a random number.</p>
        <Terminal
            welcomeMessage="Welcome to PrimeVue"
            prompt="primevue $"
            aria-label="PrimeVue Terminal Service"
        />
    </div>
       </div>
       <div class="card">
        <div class="flex flex-wrap">
            <div class="w-full xl:w-1/2 p-4">
                <h5>Rectangle</h5>
                <Skeleton class="mb-2"></Skeleton>
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height="2rem" class="mb-2"></Skeleton>
                <Skeleton width="10rem" height="4rem"></Skeleton>
            </div>
            <div class="w-full xl:w-1/2 p-4">
                <h5>Rounded</h5>
                <Skeleton class="mb-2" borderRadius="2rem"></Skeleton>
                <Skeleton width="10rem" class="mb-2" borderRadius="2rem"></Skeleton>
                <Skeleton width="5rem" borderRadius="2rem" class="mb-2"></Skeleton>
                <Skeleton height="2rem" class="mb-2" borderRadius="2rem"></Skeleton>
                <Skeleton width="10rem" height="4rem" borderRadius="2rem"></Skeleton>
            </div>
            <div class="w-full xl:w-1/2 p-4">
                <h5 class="mt-4">Square</h5>
                <div class="flex items-end">
                    <Skeleton size="2rem" class="mr-2"></Skeleton>
                    <Skeleton size="3rem" class="mr-2"></Skeleton>
                    <Skeleton size="4rem" class="mr-2"></Skeleton>
                    <Skeleton size="5rem"></Skeleton>
                </div>
            </div>
            <div class="w-full xl:w-1/2 p-4">
                <h5 class="mt-4">Circle</h5>
                <div class="flex items-end">
                    <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="5rem"></Skeleton>
                </div>
            </div>
        </div>
    </div>
   
   <div class="card">
       <div class="flex justify-center mb-6">
           <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
       </div>
       <DataTable :value="products" :size="size.value" tableStyle="min-width: 50rem">
           <Column field="code" header="Code"></Column>
           <Column field="name" header="Name"></Column>
           <Column field="category" header="Category"></Column>
           <Column field="quantity" header="Quantity"></Column>
       </DataTable>
   </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import SelectButton from 'primevue/selectbutton';

import Skeleton from 'primevue/skeleton';

import Terminal from 'primevue/terminal';


const products = ref([
   { code: 'A1', name: 'Apple', category: 'Fruit', quantity: 10 },
   { code: 'B1', name: 'Banana', category: 'Fruit', quantity: 20 },
   { code: 'C1', name: 'Carrot', category: 'Vegetable', quantity: 30 },
   { code: 'D1', name: 'Tomato', category: 'Vegetable', quantity: 40 },
   { code: 'E1', name: 'Potato', category: 'Vegetable', quantity: 50 }
]);
const size = ref({ label: 'Normal', value: 'null' });
const sizeOptions = ref([
   { label: 'Small', value: 'small' },
   { label: 'Normal', value: 'null' },
   { label: 'Large', value: 'large' }
]);

import { onMounted, onBeforeUnmount } from 'vue';
import TerminalService from "primevue/terminalservice";

onMounted(() => {
    TerminalService.on('command', commandHandler);
})

onBeforeUnmount(() => {
    TerminalService.off('command', commandHandler);
})

const commandHandler = (text) => {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch(command) {
        case "date":
            response = 'Today is ' + new Date().toDateString();
            break;

        case "greet":
            response = 'Hola ' + text.substring(argsIndex + 1);
            break;

        case "random":
            response = Math.floor(Math.random() * 100);
            break;

        default:
            response = "Unknown command: " + command;
    }
    
    TerminalService.emit('response', response);
}

</script>

<style>
.card {
   background: var(--card-background);
    border: var(--card-border);
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 2rem;
}
</style>

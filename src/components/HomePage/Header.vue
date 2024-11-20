
<template>
    <div>
        <Menubar :model="items">
            <template #start>
                <div>
                    <!-- Display text on large screens and above -->
                    <p class="hidden lg:block text-2xl font-black">MyAssembly.co</p>

                    <!-- Display image on small screens and below -->
                    <p class="block lg:hidden text-xl font-black">MyAssembly.co</p>
                </div>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                </a>
            </template>
            <template #end>
                <RouterLink v-if="!sessionActive" :to="'/dashboard/projects'"  @click="sendWebhookCTA()">       
        
                    <Button>
                            <p class="m-0">My Dashboard</p>
                    </Button>
                        
                </RouterLink>
                <GetStartedButton v-else class="header-get-started" ><p class="m-0 ">Start Building</p></GetStartedButton>
                <!-- <Button ><p style="font-weight: bold; margin-right: 1ch; margin: 0;">Get Started</p><p style="margin: 0" class="lg:block hidden"> — it's free</p></Button> -->
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Menubar from "primevue/menubar";
import Badge from "primevue/badge";
import GetStartedButton from "./GetStartedButton.vue";
// import and initialize the router
import { useRouter } from "vue-router";
const router = useRouter();


const sessionActive = ref(false);

import api from '@/services/api';
onMounted(() => {

    api.get('auth/check').then(({ data }) => {
        if (data.authenticated) {
            sessionActive.value = true;
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
})


const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push('/');
        }
    },
    // {
    //     label: 'Features',
    //     icon: 'pi pi-star',
    //     command: () => {
    //         router.push('/introduction');
    //     }
    // },
    // {
    //     label: 'Projects',
    //     icon: 'pi pi-search',
    //     items: [
    //         {
    //             label: 'Core',
    //             icon: 'pi pi-bolt',
    //             shortcut: '⌘+S'
    //         },
    //         {
    //             label: 'Blocks',
    //             icon: 'pi pi-server',
    //             shortcut: '⌘+B'
    //         },
    //         {
    //             label: 'UI Kit',
    //             icon: 'pi pi-pencil',
    //             shortcut: '⌘+U'
    //         },
    //         {
    //             separator: true
    //         },
    //         {
    //             label: 'Templates',
    //             icon: 'pi pi-palette',
    //             items: [
    //                 {
    //                     label: 'Apollo',
    //                     icon: 'pi pi-palette',
    //                     badge: 2
    //                 },
    //                 {
    //                     label: 'Ultima',
    //                     icon: 'pi pi-palette',
    //                     badge: 3
    //                 }
    //             ]
    //         }
        // ]
    // },
    {
        label: 'Contact',
        icon: 'pi pi-envelope',
        command: () => {
            router.push('/contact');
        }
        // badge: 3
    }
]);
</script>
<style scoped>
.p-menubar {
    border: none;
    border-radius: 0;
    background-color: var(--surface);
    padding: 0;
}

@media screen and (max-width: 968px) {
    .header-get-started {
        display: none;
    }

}
.p-button {
    padding: 1em 1.5em;
    box-shadow: 0 4px 4px #08080814, 0 1px 2px #08080833, inset 0 6px 12px #ffffff1f, inset 0 1px 1px #fff3;
    font-weight: 600 !important;
    border: none;
}

.p-button:hover {
    box-shadow: 0 4px 4px #08080814, 0 1px 2px #08080833, inset 0 6px 12px #ffffff1f, inset 0 1px 1px #fff3;
    background-color: var(--p-button-primary-hover-background);
}
</style>
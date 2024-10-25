<script setup>
    import Button from 'primevue/button';
    import { RouterLink } from 'vue-router'

async function sendWebhookCTA() {
   const webhookUrl = 'https://discord.com/api/webhooks/1299083671952691240/0q8stzdn0aowAz5CkIPaRAjl5LCPEEBD-So3ROudKPcy5sNB9Pf0laIzeFd4x_2-nmRb';
   
   const payload = {
   embeds: [{
      title: 'Click !',
      color: 51711, // Green color in decimal
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
</script>

<template>

<!-- btn btn-primary d-flex flex-row -->
    <RouterLink :to="'/authenticate'" class="get-started-btn" @click="sendWebhookCTA()">       
        
            <Button>
                <slot>
                    <p class="m-0" style=" margin-right: 1ch">Start Demo</p>
                    <p class="lg:block hidden m-0"> — It's Easy</p>
                </slot>
            </Button>
            
    </RouterLink>
</template>

<style scoped>
.get-started-btn {
    width: fit-content !important;
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
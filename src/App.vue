<template>
   <Toast />
   <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Toast from "primevue/toast";
import { onMounted } from 'vue';

async function sendWebhook() {
   const webhookUrl = 'https://discord.com/api/webhooks/1296183137587433564/g8D7euIKzA6gmS5fTW0rylDyQmzu4xYlZNdi8fk6GqEUe8SJpHBEjuBSy7OGg3gcpNTI';
   
   const payload = {
   embeds: [{
      title: 'New Visitor!',
      color: 3066993, // Green color in decimal
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

onMounted(() => {
   if (!localStorage.getItem('webhookTriggered')) {
      sendWebhook(); // Trigger webhook only once
      localStorage.setItem('webhookTriggered', 'true'); // Set the flag to prevent future triggers
    }
});

</script>
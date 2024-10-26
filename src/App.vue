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

    // Determine if the user is on a PC or mobile
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const deviceType = isMobile ? 'Phone' : 'PC';

    const payload = {
        embeds: [{
            title: 'New Visitor!',
            description: `Visitor is using a ${deviceType}.`, // Include device type in the message
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

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log('Webhook sent successfully.');
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}


onMounted(() => {
   if (!localStorage.getItem('webhookTriggered')) {
      sendWebhook(); // Trigger webhook only once
      localStorage.setItem('webhookTriggered', 'true'); // Set the flag to prevent future triggers
    }
});

</script>
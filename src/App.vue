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


    const userAgent = navigator.userAgent;
    const screenResolution = `${screen.width}x${screen.height}`;
    const colorDepth = screen.colorDepth;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    
    const fingerprint = `${screenResolution}-${colorDepth}-${timezone}-${language}`;
    

    const payload = {
        embeds: [{
            title: `New Visitor on ${deviceType}.`,
            description: fingerprint, // Include device type in the message
            // add a field for the the url where user landed
            fields: [
                {
                    name: 'Landing URL',
                    value: window.location.href,
                    inline: true
                },
            ],
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
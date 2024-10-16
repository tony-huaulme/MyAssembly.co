<template>
    <div class="h-screen">
        <div class="container position-fixed h-container" style="
            z-index: 1;
            background: #18181bc7;
            backdrop-filter: blur(24px);
            width: 100vw;
        ">
            <Header></Header>
        </div>

        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md ">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
            <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
            <form action="#" class="space-y-8">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                    <InputText v-model="email"></InputText>
                </div>
                <div>
                    <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                    <InputText v-model="subject"></InputText>
                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                    <Textarea v-model="message" style="width: 100%;"></Textarea>
                </div>
                <Button @click="submit">Send message</Button>
            </form>
        </div>
    </div>


</template>
<script setup>
import { ref } from 'vue';
import Header from "../components/HomePage/Header.vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea  from 'primevue/textarea';
import { useToast } from "primevue/usetoast";

const toast = useToast();



const email = ref('');
const subject = ref('');
const message = ref('');

const submit = () => {
  // Replace with your Discord webhook URL
  const webhookUrl = 'https://discord.com/api/webhooks/1296176420837527643/_u_w0Z64by58srUkPuBKNRkLeTC7eRyWA3ly0yCEd71NggPOP01mOXu1N25WlchpWSrH';

  // Construct the payload to be sent to the webhook
  const payload = {
    embeds: [{
      title: 'New Form Submission',
      color: 5814783, // Optional, sets the color of the embed (in decimal, this is light blue)
      fields: [
        { name: 'Email', value: email.value || 'N/A', inline: true },
        { name: 'Subject', value: subject.value || 'N/A', inline: false },
        { name: 'Message', value: message.value || 'N/A', inline: false }
      ],
      footer: {
        text: 'Form Submission',
      },
      timestamp: new Date() // Adds a timestamp to the embed
    }]
  };

  // Send the data using fetch
  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      toast.add({ severity: 'success', summary: 'Submitted', detail: 'Your message has been sent!', life: 3000 });
    } else {
      throw new Error('Failed to submit');
    }
  })
  .catch(error => {
    toast.add({ severity: 'error', summary: 'Failed', detail: 'Please try again later.', life: 3000 });
  });
};


</script>
<style>

@media screen and (max-width: 1380px) {
    .h-container {
        padding-left: 5%;
        padding-right: 5%;
    }
}

.container {
    width: 90%;
    max-width: 1380px;
    margin-left: auto;
    margin-right: auto;
}

</style>
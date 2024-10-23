<template>
{{ email }}
{{ username }}
{{ new_user }}
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Assuming you're using vue-router
import { useRouter } from 'vue-router';

const email = ref('');
const username = ref('');
const new_user = ref(false);
const user_picture = ref('');
// Use vue-router's useRoute to get query params
const route = useRoute();
const $router = useRouter();

async function sendWebhook(email) {
   const webhookUrl = 'https://discord.com/api/webhooks/1298363498828664918/lb-HObNM5pptjnRRXr_LCe2GfeeBAGrrJdA-Kgam9VAfW_lVBqBTszQ3xRbvqJ7R7ZEM';
   
   const payload = {
   embeds: [{
      title: 'New Account Created',
      color: 3066993, // Green color in decimal
      fields: [
            {
               name: 'Email',
               value: email,
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

onMounted(() => {
  email.value = route.query.user_email || '';
  username.value = route.query.user_name || '';
  user_picture.value = route.query.picture || '';
  localStorage.setItem('user_email', JSON.stringify(email.value));
  localStorage.setItem('user_picture', JSON.stringify(user_picture.value));
  new_user.value = route.query.new_user || false;

  // If new_user is true, show a welcome message
  if (new_user.value == true || new_user.value == 'True' || new_user.value == 'true') {
      $router.push("/model?from=signup&modelName=DemoModel");
      try {
         sendWebhook(email.value);
      } catch (error) {
         console.error('Error sending webhook:', error);
      }
  }else{
    // $router.push("/model?from=signup&modelName=DemoModel");
    $router.push("/dashboard/projects");
  }
});
</script>
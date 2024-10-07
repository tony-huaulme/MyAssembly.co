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

// Use vue-router's useRoute to get query params
const route = useRoute();
const $router = useRouter();


onMounted(() => {
  email.value = route.query.user_email || '';
  username.value = route.query.user_name || ''; 
  localStorage.setItem('user_email', email)
  new_user.value = route.query.new_user || false;

  // If new_user is true, show a welcome message
  if (new_user.value == true || new_user.value == 'True' || new_user.value == 'true') {
    $router.push("/model?from=signup&modelName=DemoModel");
  }else{
    $router.push("/dashboard");
  }
});
</script>
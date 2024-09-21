<template>
{{ email }}
{{ username }}
{{ new_user }}
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Assuming you're using vue-router

const email = ref('');
const username = ref('');
const new_user = ref(false);

// Use vue-router's useRoute to get query params
const route = useRoute();

onMounted(() => {
  email.value = route.query.user_email || '';
  username.value = route.query.user_name || ''; 
  new_user.value = route.query.new_user || false;
});
</script>
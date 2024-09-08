<template>
    <!-- Full-screen container -->
    <div class="flex h-screen justify-center md:p-5">

        <!-- Right Section: Placeholder for Login Form -->
        <div class="md:w-1/2 h-fill w-fill md:max-w-xl flex justify-center relative" style="background-color: var(--p-content-background);">
            <!-- Replace this with your login form -->
            <div class="w-2/3 max-w-md mt-10 flex flex-column justify-center ">
                <i class="pi pi-box text-8xl self-center mb-5"></i>
                <h1 class="text-2xl font-semibold text-gray-700 text-center mb-6">Welcome to MyAssembly.co!</h1>

                <div v-if="signupIndex == 0" class="flex flex-col gap-2">
                    <label for="username">Work email address</label>
                    <InputText id="username" v-model="email" />
                    <small v-if="emailWarn" class="p-error">Invalid email format</small>
                </div>

                <div v-else class="flex flex-col gap-2">
                    <label for="username">Create new password</label>
                    <InputText id="username" v-model="password" type="password" />
                </div>


                <Button :label="signupIndex === 0 ? 'Continue' : 'Create Account'" @click="goToNextSignupStep"
                    class="mt-6 w-fill"></Button>
                <div v-if="signupIndex == 0">
                    <Divider align="center" type="solid" style="margin: 48px 0px;">
                        <RouterLink :to="'/dashboard/Projects'"><b>OR</b></RouterLink>
                    </Divider>

                    <div>
                        <div id="g_id_onload"
                            data-client_id="93244253552-q2qn4t6vjerpf6mj1qgfduf69agfulas.apps.googleusercontent.com"
                            data-callback="handleCredentialResponse">
                        </div>
                        <div class="g_id_signin" data-type="standard"></div>
                    </div>
                </div>

                <!-- Navigation -->
                <i class="pi pi-times absolute top-5 right-5 cursor-pointer text-xl" @click="$router.push('/')"></i>
                <i v-if="signupIndex > 0" @click="signupIndex = signupIndex - 1"
                    class="pi pi-angle-left absolute top-5 left-5 cursor-pointer text-xl">
                </i>

                <p>Have an accout? <RouterLink :to="'/signin'">SignIn</RouterLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const signupIndex = ref(0);
const emailWarn = ref(false);

function goToNextSignupStep() {
    if (signupIndex.value === 0 && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
        signupIndex.value = signupIndex.value + 1;
        emailWarn.value = false;
        return;
    } else {
        emailWarn.value = true;
    }
    // Call your API to create a new user account
    console.log('Creating new user account with email:', email.value, 'and password:', password.value);
}


// Google Sign-In
function parseJwt(token) {
  // Decode the JWT token to extract user information
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {
  const idToken = response.credential;
  const userInfo = parseJwt(idToken);

  // Store userInfo in Pinia store
  userStore.setUserInfo(userInfo);
  storeUserInfo(userInfo);

  // Redirect the user to the /dashboard route
  router.push('/demo');
}

onMounted(() => {

    // Google Sign-In

    // Initialize the Google sign-in button
    window.google.accounts.id.initialize({
    client_id: '93244253552-q2qn4t6vjerpf6mj1qgfduf69agfulas.apps.googleusercontent.com',
    callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
    document.querySelector('.g_id_signin'),
    { theme: 'outline', size: 'large' } // Custom button options
    );
});
</script>
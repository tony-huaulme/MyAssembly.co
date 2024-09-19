<template>
    <!-- Full-screen container -->
    <div class="flex h-screen justify-center md:p-5">

        <!-- Right Section: Placeholder for Login Form -->
        <div class="md:w-1/2 h-fill w-fill md:max-w-xl flex flex-column justify-center relative">

            <div class="w-fill flex flex-column items-center">

                <!-- Replace this with your login form -->
                <div class="w-2/3 max-w-md mt-10 flex flex-column justify-center ">
                    <i class="pi pi-box text-8xl self-center mb-5"></i>
                    <h1 class="text-2xl font-semibold text-gray-700 text-center mb-6">{{ signupPage ? 'Welcome to MyAssembly.co!' : 'Log into my account' }}</h1>

                    <div v-if="signupIndex == 0" class="flex flex-col gap-2">

                        <InputText @keydown.enter="goToNextSignupStep" id="username" v-model="email"
                            placeholder="Work email address" />
                        <small v-if="emailWarn" class="p-error">Invalid email format</small>
                    </div>

                    <div v-else class="flex flex-col gap-2">
                        <label for="password">{{ signupPage ? 'Create new password' : 'Password' }}</label>
                        <InputText @keydown.enter="goToNextSignupStep" id="password" v-model="password"
                            type="password" />
                    </div>


                    <Button :label="signupIndex === 0 ? 'Continue' : signupPage ? 'Create Account' : 'Login'"
                        @click="goToNextSignupStep" class="mt-3 w-fill"></Button>

                    <div>
                        <Divider align="center" type="solid" style="margin: 48px 0px;">
                            <p class="m-0 text-xl">or</p>
                        </Divider>

                        <div>
                            <div id="g_id_onload"
                                data-client_id="93244253552-q2qn4t6vjerpf6mj1qgfduf69agfulas.apps.googleusercontent.com"
                                data-callback="handleCredentialResponse">
                            </div>
                            <div class="g_id_signin" data-type="standard"></div>
                        </div>
                    </div>
                    <p class="flex flex-row gap-2 justify-center cursor-pointer">{{ signupPage ? 'Have an accout? ' :
                        "Don't have an account? " }}<a class="underline" @click="signupPage = !signupPage">{{ signupPage
                            ? ' SignIn' : ' SignUp' }}</a></p>


                </div>
            </div>



        </div>
        <!-- Navigation -->
        <i class="pi pi-times absolute top-5 right-5 cursor-pointer text-xl" @click="$router.push('/')"></i>
        <i v-if="signupIndex > 0" @click="signupIndex = signupIndex - 1"
            class="pi pi-angle-left absolute top-5 left-5 cursor-pointer text-xl">
        </i>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { ref } from 'vue';

const signupPage = ref(1);

const email = ref('');
const password = ref('');
const signupIndex = ref(0);
const emailWarn = ref(false);


const passwordInputElement = document.getElementById('password');

function goToNextSignupStep() {
    if (signupIndex.value === 0 && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
        signupIndex.value = signupIndex.value + 1;
        passwordInputElement.focus();
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
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {
    const idToken = response.credential;
    const userInfo = parseJwt(idToken);

    // Store userInfo in Pinia store
    //userStore.setUserInfo(userInfo);
    //storeUserInfo(userInfo);
    console.log(userInfo);

    // Redirect the user to the /dashboard route
    router.push('/demo');
}

onMounted(() => {

    // Google Sign-In
    const emailInputElement = document.getElementById('username');

    emailInputElement.focus();
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
<style>
.S9gUrf-YoZ4jf {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>
<template>
    <!-- Full-screen container -->
    <div class="flex h-screen justify-center md:p-5">

        <!-- Right Section: Placeholder for Login Form -->
        <div class="md:w-1/2 h-fill w-fill md:max-w-xl flex flex-column relative">

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
                        <InputText ref="pwInput" @keydown.enter="goToNextSignupStep" id="password" v-model="password"
                            type="password" focus/>
                    </div>


                    <Button :label="signupIndex === 0 ? 'Continue' : signupPage ? 'Create Account' : 'Login'"
                        @click="goToNextSignupStep" class="mt-3 w-fill">
                    </Button>   

                    <div>
                        <Divider align="center" type="solid" style="margin: 48px 0px;">
                            <p class="m-0 text-xl">or</p>
                        </Divider>

                        <Button :label="`${signupPage ? 'Sign Up' : 'Sign In'} with Google`" icon="pi pi-google" iconPos="left" @click="googleAuth"
                            class="w-fill" />
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
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { ref, watch, nextTick } from 'vue';

const signupPage = ref(1);
const email = ref('');
const password = ref('');
const signupIndex = ref(0);
const emailWarn = ref(false);
const pwInput = ref(null);


const passwordInputElement = document.getElementById('password');

function goToNextSignupStep() {

    if(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value) === false) {
        emailWarn.value = true;
        return;
    }

    if (signupIndex.value === 0) {
        console.log('next step');

        signupIndex.value = signupIndex.value + 1;
        passwordInputElement.focus();
        emailWarn.value = false;
        return;
    } else if(signupIndex.value === 1) {
        signupPage.value ? signup() : login();
    }
    // Call your API to create a new user account
    console.log('Creating new user account with email:', email.value, 'and password:', password.value);
}

watch(pwInput, async (newVal) => {
    if (newVal) {
        await nextTick()
        pwInput.value.focus();
    }
});

import api from '@/services/api';

const login = async () => {
    console.log('Logging in with email:', email.value, 'and password:', password.value);
  try {
    const { data } = await api.post('login_emailpw', { email: email.value, password: password.value });
    console.log('Login Success:', data);
    // Handle success, redirect to dashboard or store user data
  } catch (error) {
    console.error('Login Error', error);
    // Handle error (e.g., display error message)
  }
};


const signup = async () => {
    console.log('Logging in with email:', email.value, 'and password:', password.value);

  try {
    const { data } = await api.post('signup_emailpw', { email: email.value, password: password.value });
    console.log('Signup Success:', data);
    // Handle success, redirect to dashboard or store user data
    } catch (error) {
    console.error('Signup Error', error);
    // Handle error (e.g., display error message)
    }
};

const googleAuth = async () => {
    await api.get('google_auth');
};

</script>

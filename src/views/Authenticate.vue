<template>
    <!-- Full-screen container -->
    <div class="flex h-screen justify-center md:align-items-center md:p-0 w-fill">
        <!-- Right Section: Placeholder for Login Form -->
                 <!-- other side 2/3 is an image -->
        <div class="hidden md:flex md:w-2/3 h-fill p-4">
            <img src="../assets/SignUpReAssurance.png" alt="App Features" class="object-cover w-full" style="opacity: 0.7;">
        </div>
        <div class="md:w-1/3 h-fill flex flex-column relative">

            <div class="w-fill flex flex-column items-center">
                <!-- Replace this with your login form -->
                <div class="md:w-2/3 max-w-md mt-10 flex flex-column justify-center w-100 pl-4 pr-4 md:pl-0 md:pr-0">
                    <img v-if="isDarkMode" src="../assets/logo_darkmode.png" alt="MyAssembly.co Icon" class="p-3 w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem]" style="align-self: center;">
                    <img v-else src="../assets/logo_lightmode.png" alt="MyAssembly.co Icon" class="p-3 w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem]" style="align-self: center;">   

                    <h1 class="text-2xl font-semibold text-gray-700 text-center mb-6">{{ signupPage ? 'Welcome to MyAssembly.co!' : 'Log into my account' }}</h1>
                    <Button iconPos="left" @click="googleAuth" class="w-fill" style="background-color: white; color: #3c4043; border: none;"> 
                            <img src="https://img.icons8.com/?size=24&id=17949&format=png" alt="">    
                            {{`${signupPage ? 'Sign Up' : 'Sign In'} with Google`}}
                        </Button>


                        <Divider align="center" type="solid" style="margin: 18px 0px; background-color: transparent" class="backgroundG">
                            <p class="m-0 text-l backgroundG">or</p>
                        </Divider>

                    <div v-if="signupIndex == 0" class="flex flex-col gap-2">

                        <InputText @keydown.enter="goToNextSignupStep" id="username" v-model="email"
                            placeholder="Work email address"/>
                        <small v-if="emailWarn" class="p-error">Invalid email format</small>
                    </div>

                    <div v-else class="flex flex-col gap-2">
                        <label for="password">{{ signupPage ? 'Create new password' : 'Password' }}</label>
                        <InputText ref="pwInput" @keydown.enter="goToNextSignupStep" id="password" v-model="password"
                            type="password" :class="wrongPw ? 'blink-border' : ''"/>
                    </div>

           
                    <Button :loading="loading" :label="signupIndex === 0 ? 'Continue' : signupPage ? 'Create Account' : 'Login'"
                        @click="goToNextSignupStep" class="mt-3 w-fill" style="border: none;">
                    </Button>   

                    <div>


                    </div>
                    <p class="flex flex-row gap-2 justify-center cursor-pointer">{{ signupPage ? 'Have an accout? ' :
                        "Don't have an account? " }}<a class="underline" @click="signupPage = !signupPage">{{ signupPage
                            ? ' SignIn' : ' SignUp' }}</a></p>


                </div>

                <div class="md:hidden">
                    <img src="../assets/SignUpReAssurance-Vertical.png" alt="App Features" class="object-cover w-full" style="opacity: 0.7;">
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
import { computed, onMounted, ref, watch } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';

const $router = useRouter();

// get in the url /authenticate?signup=false the sign up
const toast = useToast();
const signupPage = ref($router.currentRoute.value.query.signup == 'true' || false);
const email = ref('');
const password = ref('');
const signupIndex = ref(0);
const emailWarn = ref(false);
const pwInput = ref(null);
const wrongPw = ref(false);

const loading = ref(false);

watch(signupPage, () => {
    signupIndex.value = 0;
    email.value = '';
    password.value = '';
    emailWarn.value = false;
    wrongPw.value = false;
});

const isDarkMode = computed(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) 


function goToNextSignupStep() {

    if(/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email.value) === false) {
        emailWarn.value = true;
        return;
    }

    if (signupIndex.value === 0) {
        console.log('next step');

        signupIndex.value = signupIndex.value + 1;
        emailWarn.value = false;
        return;
    } else if(signupIndex.value === 1) {
        signupPage.value ? signup() : login();
        return;
    }
}


import api from '@/services/api';

const login = async () => {
    loading.value = true;
    console.log('Logging in with email:', email.value, 'and password:', password.value);

    try {
        const { data } = await api.post('login/emailpw', { email: email.value, password: password.value });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Logged In', life: 3000 });
        console.log('Login Success:', data);
        loading.value = false;
        localStorage.setItem('user', JSON.stringify(data));

        $router.push(`/dashboard/projects`);
        // redirect to the URL returned by the server : ?user_email=raichounoscope@gmail.com&user_name=LEESINGOOD&new_user=<AppUser%20LEESINGOOD>
        // Handle success, redirect to dashboard or store user data
    } catch (error) {
        loading.value = false;
        console.error('Login Error:', error.response.data.error);
        if (error.response && error.response.status === 401) {
            toast.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials', life: 3000 });
            sendWebhookERROR('login/emailpw Invalid credentials');
        } else {
            toast.add({ severity: 'error', summary: 'Login Failed', detail: error.code, life: 3000 });
            sendWebhookERROR('login/emailpw Failed');
        }
    }
};


const signup = async () => {

    try {
        const  { data }  = await api.post('signup/emailpw', { email: email.value, password: password.value });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Signed Up', life: 3000 });
        
        console.log('Signup Success:', data);

        $router.push(`/dashboard/projects`);


    // redirect to the URL returned by the server : ?user_email=raichounoscope@gmail.com&user_name=LEESINGOOD&new_user=<AppUser%20LEESINGOOD>
    // Handle success, redirect to dashboard or store user data
    } catch (error) {
        console.log('Signup Error:', error.response.data.error);
        if(error.response.status === 409) {
            toast.add({ severity: 'warn', summary: 'Signup Failed', detail: 'User already exists', life: 3000 });
            return;
        }

        if(error.response.status === 400) {
            toast.add({ severity: 'error', summary: 'Signup Failed', detail: 'Missing username, email, or password', life: 3000 });
            return;
        }

        toast.add({ severity: 'error', summary: 'Signup Failed', detail: error.response.data.error, life: 3000 });
        console.error('Signup Error:', error.response.data.error);
        sendWebhookERROR('signup/emailpw Failed');
    // Handle error (e.g., display error message)
    }
};

const googleAuth = async () => {
    try {
        const { data } = await api.get('google_auth');
        console.log('Signup Success:', data);

        if (data.redirect_url) {
            window.location.href = data.redirect_url; // Redirects the client
            // redirect to the URL returned by the server : ?user_email=raichounoscope@gmail.com&user_name=LEESINGOOD&new_user=<AppUser%20LEESINGOOD>
            return;
        }
        toast.add({ severity: 'error', summary: 'Google Auth Failed', detail: 'Failed to get redirect URL', life: 3000 });
        
    } catch (error) {
        console.error('Google Auth Error:', error);
        toast.add({ severity: 'error', summary: 'Google Auth Failed', detail: error.response?.data?.error, life: 3000 });
        sendWebhookERROR('Google Auth Failed');
    }
};


    async function sendWebhookERROR(message) {
        const webhookUrl = 'https://discord.com/api/webhooks/1299083671952691240/0q8stzdn0aowAz5CkIPaRAjl5LCPEEBD-So3ROudKPcy5sNB9Pf0laIzeFd4x_2-nmRb';

        const payload = {
            embeds: [{
                title: message,
                color: 15404573, // Green color in decimal
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
            console.error('Error sending webhook:', error);
        }
    }

// onMounted(() => {
//     api.get('auth/check').then(({ data }) => {
//         console.log('User:', data);
//         if (data.authenticated) {
//             $router.push('/dashboard/projects');
//         }
//     }).catch((error) => {
//         console.error('Error:', error);
//     });
// });

</script>
<style>
.blink-border {
    border: 2px solid transparent;
    animation: blink 1s ease 2; /* Blinks twice */
}

@keyframes blink {
    0%, 100% {
        border-color: transparent; /* Start and end with no border */
    }
    50% {
        border-color: rgb(255, 60, 60); /* Middle point with red border */
    }
}

.p-divider-content {
    background-color: var(--p-content-background) !important;
}



@media screen and (min-width: 768px) {
    .grayBg{
        height: 100vh !important;
    }



}

</style>
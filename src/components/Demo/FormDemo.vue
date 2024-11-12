<template>
  <div
    v-if="visible"
    class="bg-blur" 
    style="z-index: 10004;"
    
  ></div>
  <div class="h-screen w-screen absolute top-0 left-0 flex justify-center items-center" style="z-index: 10005; "
    v-if="visible">
    <div class="onboarding-form" style="width: 60vw; height: 80vh; background-color: var(--p-content-background)" :class="{'w-screen' : mobile}">
      <div v-if="step === 0" class="p-6 rounded-lg shadow-lg formSlide">
        <div>
          <h4 class="text-2xl font-semibold mb-2">What’s your name?</h4>
          <p class="mb-4">Tell us how we should greet you.</p>
        </div>

        <div class="flex flex-col mb-4">
          <InputText v-model="answers.firstName" placeholder="First Name" class="mb-2 p-2" />
          <InputText v-model="answers.lastName" placeholder="Last Name" class="p-2" />
        </div>

        <div class="flex justify-between mt-6 w-fill">
          <span></span>
          <Button :disabled="answers.firstName == '' || answers.lastName == ''" label="Continue" @click="nextStep"
            class="mt-3 transition duration-200 ease-in-out px-4 py-2 rounded" style="border: none;" />
        </div>
      </div>

      <div v-else-if="step === 1" class="p-6 rounded-lg shadow-lg formSlide">
        <div>
          <h4 class="text-2xl font-semibold mb-2 mt-0">Who do you want to build an assembly for?</h4>
          <p class="mb-6">Select all the options that apply to you.</p>
        </div>

        <div class="answerContainer">
          <div v-for="(option, index) in optionsForStep1" :key="index" class="flex items-center mb-2">
            <Checkbox :inputId="'choice' + index" v-model="answers.assemblyFor" :value="option.value"
              class="mr-2 hidden" />
            <label :for="'choice' + index" class="text-gray-800"
              :class="{ 'selected-option': answers.assemblyFor.includes(option.value) }">{{ option.label }}</label>
          </div>
        </div>

        <div class="flex justify-between mt-6 w-fill">
          <Button severity="secondary" label="Back" @click="previousStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded"
            style="background-color: var(--p-content-background) !important;" />
          <Button :disabled="answers.assemblyFor == ''" severity="primary" label="Continue" @click="nextStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded" style="border: none;" />
        </div>

      </div>

      <div v-else-if="step === 2" class="p-6 rounded-lg shadow-lg formSlide">
        <h4 v-if="answers.assemblyFor.includes('Company')" class="text-2xl font-semibold mb-6 mt-0">What best describes
          your workplace?</h4>
        <h4 v-else-if="answers.assemblyFor.includes('Myself')" class="text-2xl font-semibold mb-6 mt-0">Are you a
          student?</h4>
        <h4 v-else-if="answers.assemblyFor.includes('Clients')" class="text-2xl font-semibold mb-6 mt-0">What best
          describes how you work with clients?</h4>

        <div class="answerContainer">
          <div v-for="(option, index) in getOptionsForStep2" :key="index" class="flex items-center mb-2">
            <Checkbox :inputId="'option' + index" v-model="answers.step2" :value="option.value" class="mr-2 hidden" />
            <label :for="'option' + index" class="text-gray-800"
              :class="{ 'selected-option': answers.step2.includes(option.value) }">{{ option.label }}</label>
          </div>
        </div>

        <div class="flex justify-between mt-6 w-fill">
          <Button severity="secondary" label="Back" @click="previousStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded"
            style="background-color: var(--p-content-background) !important;" />
          <Button :disabled="answers.step2 == ''" severity="primary" label="Continue" @click="nextStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded" style="border: none;" />
        </div>
      </div>

      <div v-else-if="step === 3" class="p-6 rounded-lg shadow-lg formSlide">
        <h4 class="text-2xl font-semibold mb-2 mt-0">How many people are employed at your workplace?</h4>

        <div class="answerContainer">
          <div v-for="(option, index) in optionsForEmployees" :key="index" class="flex items-center mb-2">
            <RadioButton :inputId="'employee' + index" v-model="answers.employees" :value="option.value"
              class="mr-2 hidden" />
            <label :for="'employee' + index" class="text-gray-800"
              :class="{ 'selected-option': answers.employees == option.value }">{{ option.label }}</label>
          </div>
        </div>

        <div class="flex justify-between mt-6 w-fill">
          <Button severity="secondary" label="Back" @click="previousStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded"
            style="background-color: var(--p-content-background) !important;" />
          <Button :disabled="answers.employees == ''" severity="primary" label="Continue" @click="nextStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded" style="border: none;" />
        </div>
      </div>

      <div v-else-if="step === 4" class="p-6 rounded-lg shadow-lg formSlide">
        <div>
          <h4 class="text-2xl font-semibold mb-2 mt-0">What are your 3D models about?</h4>
          <p class="mb-4">Tell us about your project.</p>
        </div>

        <div class="answerContainer">
          <div v-for="(option, index) in projectCategories" :key="index" class="flex items-center mb-2">
            <Checkbox :inputId="'project' + index" v-model="answers.projectType" :value="option.value"
              class="mr-2 hidden" />
            <label :for="'project' + index" class="text-gray-800"
              :class="{ 'selected-option': answers.projectType.includes(option.value) }">{{ option.label }}</label>
          </div>
        </div>

        <div class="flex justify-between mt-6 w-fill">
          <Button severity="secondary" label="Back" @click="previousStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded"
            style="background-color: var(--p-content-background) !important;" />
          <Button :disabled="answers.projectType == ''" severity="primary" label="Continue" @click="nextStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded" style="border: none;" />
        </div>
      </div>

      <div v-else-if="step === 5" class="p-6 rounded-lg shadow-lg formSlide">
        <h4 class="text-2xl font-semibold mb-2 mt-0">What would be the usage of the assembly?</h4>
        <div class="answerContainer">
          <div v-for="(option, index) in usageOptions" :key="index" class="flex items-center mb-2">
            <Checkbox :inputId="'usage' + index" v-model="answers.usage" :value="option.value" class="mr-2 hidden" />
            <label :for="'usage' + index" class="text-gray-800"
              :class="{ 'selected-option': answers.usage.includes(option.value) }">{{ option.label }}</label>
          </div>
        </div>

        <div class="flex justify-between mt-6 w-fill">
          <Button severity="secondary" label="Back" @click="previousStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded"
            style="background-color: var(--p-content-background) !important;" />
          <Button :disabled="answers.usage == ''" severity="primary" label="Continue" @click="nextStep"
            class="transition duration-200 ease-in-out px-4 py-2 rounded" style="border: none;" />
        </div>
      </div>

      <div v-else-if="step === 6" class="p-6 rounded-lg shadow-lg formSlide">
        <h4 class="text-2xl font-semibold mb-2 mt-0">Thank you for providing the information!</h4>
        <Button severity="primary" label="Dive in the Demo" @click="demoSummited"
          class="transition duration-200 ease-in-out px-4 py-2 rounded" style="border: none;" />
        <p class="text-gray-700">Your answers have been saved.</p>
      </div>


    </div>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import { styleText } from 'util';


const visible = ref(true);
const step = ref(0);
const answers = ref({
  firstName: '',
  lastName: '',
  assemblyFor: [],
  step2: '',
  employees: '',
  projectType: [],
  usage: ''
});

const optionsForStep1 = [
  { label: 'My Company', value: 'Company' },
  { label: 'Myself', value: 'Myself' },
  { label: 'Clients', value: 'Clients' },
];

const optionsForEmployees = [
  { label: '1-5', value: '1-5' },
  { label: '6-10', value: '6-10' },
  { label: '11-50', value: '11-50' },
  { label: '51-200', value: '51-200' },
  { label: '201-500', value: '201-500' },
  { label: '+501', value: '+501' },
];

const projectCategories = [
  { label: 'Architecture', value: 'Architecture' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Construction', value: 'Construction' },
  { label: 'Manufacturing', value: 'Manufacturing' },
  { label: 'Other', value: 'Other' },
];

const usageOptions = [
  { label: 'Collaborative', value: 'Collaborative' },
  { label: 'Sales', value: 'Sales' },
  { label: 'On-Site Guide', value: 'On-Site Guide' },
];

const getOptionsForStep2 = computed(() => {
  if (answers.value.assemblyFor.includes('Company')) {
    return [
      { label: 'Startup', value: 'Startup' },
      { label: 'Small Business', value: 'Small Business' },
      { label: 'Midsize Company', value: 'Midsize Company' },
      { label: 'Enterprise', value: 'Enterprise' },
    ];
  } else if (answers.value.assemblyFor.includes('Myself')) {
    return [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ];
  } else if (answers.value.assemblyFor.includes('Clients')) {
    return [
      { label: 'As a freelancer', value: 'Freelancer' },
      { label: 'In an agency', value: 'Agency' },
    ];
  }
  return [];
});

function nextStep() {
  if( ["Yes", "No"].includes(answers.value.step2[0]) && step.value == 2) {
    step.value+=2;
    localStorage.setItem('onboardingAnswers', JSON.stringify(answers.value));

  } else {
    step.value++;
  localStorage.setItem('onboardingAnswers', JSON.stringify(answers.value));

  }
}

function previousStep() {
  if (step.value > 0) step.value--;
}



async function demoSummited() {
   const webhookUrl = 'https://discord.com/api/webhooks/1303472816405872670/ppyUbqudY4ClhKmVB2W4DFv31V0myklZJ9xbmb-XZwe71PaZpYINxvV3qAQ6WYwR3kXK';
   
    const email = localStorage.getItem('user_email');

   // Preparing answers or any data you want to send
   const q = answers.value; // Replace with actual data
   // Define the payload with the correct structure for Discord
   const payload = {
      content: "A user submitted the demo form",
      embeds: [
         {
            title: `DEMO FORM ${email}`,
            color: 51711, // Green color in decimal
            fields: Object.keys(q).map((key) => ({
               name: key,
               value: q[key].toString(),
               inline: true
            }))
         }
      ]
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
         throw new Error(`Request failed with status ${response.status}`);
      }

      console.log('Webhook sent successfully!');
   } catch (error) {
      console.error('Failed to send webhook:', error);
   }

  localStorage.setItem('onboardingAnswers', JSON.stringify(answers.value));

   if (props.mobile) {
    window.location.href = '/demo';
  } else {
    visible.value = false;
  }

}

const props = defineProps({
  mobile: Boolean,
});

const emit = defineEmits(['formFilled']);
</script>

<style scoped>
.bg-blur {
  position: fixed; /* Fixes the overlay to the viewport */
  top: 0; /* Aligns it to the top */
  left: 0; /* Aligns it to the left */
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  z-index: 10004; /* Ensures it is above other content */
  background: rgba(64, 64, 64, 0.5); /* Semi-transparent background */
  backdrop-filter: blur(4px); /* Applies blur to everything behind */
}
.formSlide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  height: -webkit-fill-available;
}

.answerContainer {
  width: -webkit-fill-available;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.selected-option {
  background-color: var(--p-primary-color);
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

label {
  cursor: pointer;
  width: -webkit-fill-available;
  padding: 0.5rem;
  background-color: #29292f;
  border-radius: 5px;

}

.onboarding-form {
  max-width: 650px;
  max-height: 405px;
  background-color: var(--p-content-background);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 768px) {
  .onboarding-form {
    max-width: 100vw;
    max-height: 100vh;
    width: 100vw;
    height: 100vh;
  }
  
}
</style>



import { ref, watch } from 'vue';
import {
  setCameraPosition,
  setModelPosition,
} from '../ThreeJs/building/ModelAnimation.js';

export function useHomePageAnimation(camera, model, assemblyBuilding, animationTime = 1200) {
  const currentStep = ref(0);

  // Define the steps with their corresponding animations
  const steps = {
    0: () => {
      setCameraPosition(camera, {  "x": -10.349590810671197, "y": 1.1734950219156364, "z": 8.603326770502212}, animationTime);
      setModelPosition(model,  { "x": 3, "y": -3.5, "z": 0 }, animationTime);
      assemblyBuilding.showAllPanels();
    },
    1: () => {
      setCameraPosition(camera, { "x": -12.729960454702217, "y": 4.253643292056286, "z": 8.197330870006944 }, animationTime);
      setModelPosition(model, { "x": 3, "y": -3.5, "z": 0 }, animationTime);
      document.getElementById("HomePageModelContainer").style.opacity = 1;
    },
    2: () => {
      setCameraPosition(camera, {  "x": -10.349590810671197, "y": 1.1734950219156364, "z": 8.603326770502212}, animationTime);
      setModelPosition(model, { "x": 3, "y": -3.5, "z": 0 }, animationTime);
      document.getElementById("HomePageModelContainer").style.opacity = 1;
    },
    3: () => {
      document.getElementById("HomePageModelContainer").style.opacity = 0;
      setModelPosition(model, { "x": 20, "y": -3.5, "z": 0 }, animationTime);
      // add spinning and camrea movement
    },
    4: () => {
      
    },
    5: () => {
      
    },

  };

  // Automatically trigger the step animation when currentStep changes
  watch(currentStep, (newStep) => {
    if (steps[newStep]) {
      steps[newStep]();
    }
  });

  // Function to set the current step
  const setStep = (stepNumber) => {
    console.log('Setting step', stepNumber);
    if (steps[stepNumber]) {
      currentStep.value = stepNumber;
    } else {
      console.error('Invalid step number');
    }
  };

  return {
    currentStep,
    setStep
  };
}

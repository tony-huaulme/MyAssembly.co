

import { ref, watch } from 'vue';
import {
  setCameraPosition,
  OpeningAnimation,
  setModelPosition,
} from '../ThreeJs/building/ModelAnimation.js';

export function useHomePageAnimation(camera, building, animationTime = 1200) {
  const currentStep = ref(0);

  // Define the steps with their corresponding animations
  const steps = {
    0: () => {
        setCameraPosition(camera, { "x": -10.349590810671197, "y": 1.1734950219156364, "z": 5.603326770502212 }  , animationTime);
        setModelPosition(building, { "x": 1, "y": -3.5, "z": 0 }, animationTime);
      },
    1: () => {
        setCameraPosition(camera,  { "x": -12.729960454702217, "y": 4.253643292056286, "z": 8.197330870006944 }  , animationTime/2);
        setModelPosition(building, { "x": 1, "y": -3.5, "z": 0 }, animationTime);
        document.getElementById("HomePageModelContainer").style.opacity = 1;
      },
    2: () => {
        document.getElementById("HomePageModelContainer").style.opacity = 0;
        setModelPosition(building, { "x": 1, "y": -3.5, "z": 20 }, animationTime);
      },
    3: () => {
        document.getElementById("HomePageModelContainer").style.opacity = 1;
        setCameraPosition(camera,  { "x": -12.729960454702217, "y": 4.253643292056286, "z": 8.197330870006944 }  , animationTime);
        setModelPosition(building, { "x": 1, "y": -3.5, "z": 0 }, animationTime);
      },
    4: () => {
        setModelPosition(building, { "x": 1, "y": -3.5, "z": 0 }, animationTime);
      },
    5: () => {
        setModelPosition(building, { "x": 1, "y": -3.5, "z": 0 }, animationTime);
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

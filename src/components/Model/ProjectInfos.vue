
<template>
    
  <Dialog v-model:visible="visible" modal :header="projectName" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div v-html="projectDescription"></div>
    </Dialog>
    
    <!-- <Button @click="updateSettings()">UPDATE SETTIGNS</Button> -->
</template>

<script setup>
import { ref } from "vue";
import Dialog from 'primevue/dialog';

const visible = ref(false);

const props = defineProps({
    projectName: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
});

import api from '@/services/api';

const updateSettings = async () => {
    const settings =         {
  "description": `
  <h2><strong>Let's Build It Together!</strong></h2> 
<p><strong>We’re excited to support you in bringing your <u>unique project</u> to life!</strong> Before diving into the steps, please take a moment to review these essential guidelines to ensure a smooth, enjoyable, and successful building experience.</p>

<h3>Important Reminders:</h3> 
<ol> 
  <li><strong>Follow the provided recommendations:</strong> Our <span style="text-decoration: underline; color: blue; cursor: default;"><u>guidelines</u></span> are designed to guide you through each stage <strong>safely</strong> and <strong>efficiently</strong>. For the best results, please follow each step carefully and make sure to double-check details along the way.</li> 
  
  <li><strong>Avoid using fire-related tools:</strong> For your safety, <u>do not</u> use any open flames or fire-based tools during this project. Stick to the tools outlined in the <span style="text-decoration: underline; color: blue; cursor: default;"><u>recommended tools list</u></span> for the best outcome and safest experience.</li> 
  
  <li><strong>Contact us for support:</strong> If you have any questions or need guidance at any stage, our team is ready to help. <span style="text-decoration: underline; color: blue; cursor: default;"><u>Reach out to us via our support form</u></span> for prompt assistance and expert advice.</li> 
</ol> 

<h2>The Classic Method:</h2> 
<p>Below is an image illustrating the traditional <u>construction approach</u> for this project. This method provides reliable results for <strong>stability</strong>, <strong>durability</strong>, and <strong>optimum aesthetics</strong>. Please follow the outlined steps below closely, and take your time with each phase to ensure a high-quality finish.</p>

<h3>Ready to Start?</h3> 
<p>Once you've reviewed the guidelines and gathered all necessary materials, it's time to bring your vision to life. We’re here every step of the way, so don't hesitate to <span style="text-decoration: underline; color: blue; cursor: default;"><u>check our FAQ</u></span> or contact us if you need further assistance.</p>

`,
  "pannels": {
    "R8": {
      "description": "Installation guide for panel R8 - Ensure all fasteners are tightened.",
      "accordions": [
        {
          "title": "Positioning",
          "content": "Align R8 with the main frame to secure the left side.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Fastening",
          "content": "Use 10mm bolts along the frame intersections for R8.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "R9": {
      "description": "Guidelines for securing panel R9 - Verify measurements before installation.",
      "accordions": [
        {
          "title": "Pre-check",
          "content": "Ensure all edges are clear and aligned with other panels for R9.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Adjustment",
          "content": "Level the panel to match adjacent elements before fastening.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "R6": {
      "description": "Assembly instructions for panel R6 - Double-check screw alignments.",
      "accordions": [
        {
          "title": "Primary Anchoring",
          "content": "Attach R6 to adjacent framing sections with reinforced screws.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Secondary Fastening",
          "content": "Secure additional joints to ensure structural stability.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "R3": {
      "description": "Setup details for panel R3 - Attach to top frame brackets.",
      "accordions": [
        {
          "title": "Top Connections",
          "content": "Secure R3's top edge with brackets provided in the kit.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Lower Edge",
          "content": "Fasten the lower edge to align flush with the ground level.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W20": {
      "description": "Panel G-W20 setup - Check for flush alignment with adjacent panels.",
      "accordions": [
        {
          "title": "Flush Alignment",
          "content": "Ensure G-W20's edges are flush with the main structure.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Bolt Placement",
          "content": "Insert bolts at each corner to hold G-W20 firmly in place.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W1": {
      "description": "Installation instructions for panel G-W1 - Follow alignment guides carefully.",
      "accordions": [
        {
          "title": "Accordion 1",
          "content": "This is the content of the accordion 1",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Accordion 2",
          "content": "This is the content of the accordion 2",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W11": {
      "description": "Placement guide for G-W11 - Ensure sturdy mounting points are used.",
      "accordions": [
        {
          "title": "Preparation",
          "content": "Check all pre-drilled holes for G-W11 alignment.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Attachment",
          "content": "Secure G-W11 using heavy-duty bolts at top and bottom edges.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W5": {
      "description": "Panel G-W5 setup - Confirm load-bearing capacity before installation.",
      "accordions": [
        {
          "title": "Base Support",
          "content": "Attach G-W5 securely to base frame with reinforced screws.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Top Anchoring",
          "content": "Ensure top anchors are tight to avoid panel shifts.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W22": {
      "description": "Guide for installing G-W22 - Verify alignment with adjacent panels.",
      "accordions": [
        {
          "title": "Anchor Setup",
          "content": "Fasten G-W22 with anchors at designated frame points.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Checks",
          "content": "Confirm that G-W22 is level and aligned before moving on.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W13": {
      "description": "Guidelines for G-W13 placement - Verify structural stability.",
      "accordions": [
        {
          "title": "Mounting Points",
          "content": "Attach G-W13 to upper and lower structural members.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Secondary Supports",
          "content": "Add secondary screws for extra stability.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    }
    ,
    "G-W16": {
      "description": "Assembly instructions for G-W16 - Ensure structural integrity across all supports.",
      "accordions": [
        {
          "title": "Upper Connection",
          "content": "Align and secure G-W16 to the upper frame with heavy bolts.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Base Securing",
          "content": "Verify base is flush before finalizing lower screws.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W4": {
      "description": "Panel G-W4 installation - Check level alignment with surrounding panels.",
      "accordions": [
        {
          "title": "Alignment Check",
          "content": "Level G-W4 before securing to avoid misalignment.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Fastening",
          "content": "Tighten screws at top and bottom after alignment is verified.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W8": {
      "description": "Guide for panel 1F-W8 - Ensure all supports are in place.",
      "accordions": [
        {
          "title": "Initial Placement",
          "content": "Align 1F-W8 with the foundation points.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Screws",
          "content": "Use reinforced screws to secure 1F-W8 at all corners.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W11": {
      "description": "Setup instructions for panel 1F-W11 - Secure to adjacent panel joints.",
      "accordions": [
        {
          "title": "Edge Anchoring",
          "content": "Align 1F-W11's edges with adjacent panels and fasten securely.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Cross-Bracing",
          "content": "Add cross-bracing to stabilize 1F-W11 within the frame.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W14": {
      "description": "Assembly details for 1F-W14 - Confirm all points are secured tightly.",
      "accordions": [
        {
          "title": "Structural Check",
          "content": "Verify stability of 1F-W14 within the assembly frame.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Edge Fastening",
          "content": "Fasten all edges with heavy-duty bolts.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    }
    ,
    "1F-W2": {
      "description": "Assembly instructions for 1F-W2 - Ensure stability and alignment with adjacent panels.",
      "accordions": [
        {
          "title": "Primary Securing",
          "content": "Attach 1F-W2 to the main framework, focusing on top edge alignment.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Reinforcement Check",
          "content": "Verify all bolts are tight to maintain stability of 1F-W2.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W4": {
      "description": "Installation details for 1F-W4 - Position carefully for structural integrity.",
      "accordions": [
        {
          "title": "Lower Edge Fastening",
          "content": "Secure the lower edge of 1F-W4 to align with the base frame.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Bolt Check",
          "content": "Ensure all bolts are fully tightened before moving to the next panel.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W7": {
      "description": "Guidelines for panel 1F-W7 - Make sure alignment is consistent along the frame.",
      "accordions": [
        {
          "title": "Initial Placement",
          "content": "Align 1F-W7 carefully with adjacent panels before securing.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Anchor Tightening",
          "content": "Ensure anchors are tightened at all four corners of 1F-W7.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W12": {
      "description": "Installation steps for 1F-W12 - Confirm stability after each step.",
      "accordions": [
        {
          "title": "Side Connection",
          "content": "Attach 1F-W12's side edges to adjacent panels.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Top Securing",
          "content": "Fasten the top edge firmly to avoid gaps.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W1": {
      "description": "Setup instructions for panel 1F-W1 - Verify bolt positions during installation.",
      "accordions": [
        {
          "title": "Pre-Installation Check",
          "content": "Ensure all support points are clear for 1F-W1 installation.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Fastening",
          "content": "Tighten bolts along edges and center for maximum stability.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W10": {
      "description": "Placement guidelines for 1F-W10 - Align panel with structural points.",
      "accordions": [
        {
          "title": "Primary Positioning",
          "content": "Set 1F-W10 along the structural lines, ensuring alignment.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Securing",
          "content": "Use heavy-duty bolts to secure all corners and edges.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W9": {
      "description": "Installation guide for 1F-W9 - Ensure tight connections to prevent panel shifting.",
      "accordions": [
        {
          "title": "Bottom Anchoring",
          "content": "Fasten the bottom edge of 1F-W9 to the foundation frame.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Top Bracing",
          "content": "Secure top bracing screws to add stability.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W3": {
      "description": "Assembly instructions for panel 1F-W3 - Check all edges for flush alignment.",
      "accordions": [
        {
          "title": "Base Connection",
          "content": "Align 1F-W3 with base structure and secure tightly.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Side Brackets",
          "content": "Install side brackets to ensure lateral stability of 1F-W3.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W5": {
      "description": "Placement details for 1F-W5 - Verify screw tightness along edges.",
      "accordions": [
        {
          "title": "Initial Alignment",
          "content": "Set 1F-W5 in position and ensure alignment with nearby panels.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Bolting",
          "content": "Complete bolting at each corner to secure 1F-W5.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W6": {
      "description": "Guide for installing panel 1F-W6 - Ensure panel stability post-installation.",
      "accordions": [
        {
          "title": "Edge Fastening",
          "content": "Align and fasten the edges of 1F-W6 with heavy screws.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Cross-Support",
          "content": "Install cross-support for enhanced stability.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W13": {
      "description": "Setup guidelines for 1F-W13 - Confirm all bolts are tightened and flush.",
      "accordions": [
        {
          "title": "Initial Placement",
          "content": "Set 1F-W13 along designated points and check level alignment.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Edge Reinforcement",
          "content": "Secure edges with reinforcement screws for additional stability.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "1F-W15": {
      "description": "Assembly instructions for 1F-W15 - Confirm stability with adjacent panels.",
      "accordions": [
        {
          "title": "Corner Fastening",
          "content": "Attach 1F-W15 at each corner with reinforced bolts.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Stability Check",
          "content": "Ensure the panel is stable by testing light pressure along all edges.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },

    "G-W15": {
      "description": "Assembly instructions for panel G-W15 - Confirm stability and proper alignment.",
      "accordions": [
        {
          "title": "Alignment Check",
          "content": "Ensure G-W15 is level with adjacent panels before securing.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Fastening",
          "content": "Tighten screws along all edges after alignment is confirmed.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W17": {
      "description": "Guide for panel G-W17 - Make sure all corners are secure.",
      "accordions": [
        {
          "title": "Initial Placement",
          "content": "Align G-W17 with frame corners before fastening.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Anchor",
          "content": "Anchor bolts at each corner to complete the installation.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W18": {
      "description": "Instructions for G-W18 installation - Confirm fit with adjacent supports.",
      "accordions": [
        {
          "title": "Edge Securing",
          "content": "Attach G-W18's edges with reinforced bolts.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Stability Check",
          "content": "Verify the stability of G-W18 with gentle pressure after securing.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W10": {
      "description": "Installation steps for G-W10 - Ensure level and secure installation.",
      "accordions": [
        {
          "title": "Lower Bracing",
          "content": "Secure the bottom edge of G-W10 to the frame.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Top Fastening",
          "content": "Fasten the top edge to ensure no movement between panels.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W8": {
      "description": "Guide for installing G-W8 - Confirm all bolts are tight before moving on.",
      "accordions": [
        {
          "title": "Primary Securing",
          "content": "Align and attach G-W8 to main supports.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Stability Check",
          "content": "Inspect all screws for tightness.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W7": {
      "description": "Assembly instructions for panel G-W7 - Tighten all bolts along the frame.",
      "accordions": [
        {
          "title": "Edge Placement",
          "content": "Ensure G-W7 is flush with adjacent panels.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Anchor Reinforcement",
          "content": "Double-check all anchors for added stability.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W6": {
      "description": "Placement guide for G-W6 - Check alignment with the surrounding structure.",
      "accordions": [
        {
          "title": "Bottom Fastening",
          "content": "Attach the bottom edge of G-W6 securely to the frame.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Top Securing",
          "content": "Complete the installation by tightening the top edge screws.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W19": {
      "description": "Assembly instructions for G-W19 - Verify all edges are aligned.",
      "accordions": [
        {
          "title": "Initial Placement",
          "content": "Align G-W19 carefully along the frame.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Screw Tightening",
          "content": "Ensure each screw is fully tightened after alignment.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W21": {
      "description": "Guide for G-W21 installation - Ensure stability before securing.",
      "accordions": [
        {
          "title": "Primary Alignment",
          "content": "Check alignment of G-W21 with the rest of the frame.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Edge Fastening",
          "content": "Secure edges with reinforced bolts for stability.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W9": {
      "description": "Panel G-W9 setup - Verify connections for structural strength.",
      "accordions": [
        {
          "title": "Edge Securing",
          "content": "Secure G-W9’s edges to prevent movement.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Inspection",
          "content": "Inspect all connections for a secure fit.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W12": {
      "description": "Instructions for G-W12 - Ensure alignment with other panels.",
      "accordions": [
        {
          "title": "Bottom Fastening",
          "content": "Attach bottom edge of G-W12 to maintain alignment.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Upper Screwing",
          "content": "Complete by securing upper edge.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W14": {
      "description": "Setup guide for G-W14 - Ensure screws are tight along all edges.",
      "accordions": [
        {
          "title": "Initial Securing",
          "content": "Fasten G-W14's lower edge first.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Top Screwing",
          "content": "Finish by securing the top edge.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "R1": {
      "description": "Assembly instructions for R1 - Make sure panel is stable.",
      "accordions": [
        {
          "title": "Base Connection",
          "content": "Connect R1 to the frame base.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Securing",
          "content": "Check all edges are properly tightened.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "R2": {
      "description": "Guide for installing R2 - Ensure level placement.",
      "accordions": [
        {
          "title": "Initial Alignment",
          "content": "Align R2 carefully with adjacent supports.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Screwing",
          "content": "Tighten all screws to finalize installation.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "R4": {
      "description": "Instructions for R4 - Check stability after installation.",
      "accordions": [
        {
          "title": "Placement",
          "content": "Align R4 with base structure.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Secure Edges",
          "content": "Fasten all edges.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "R5": {
      "description": "Setup details for R5 - Confirm that edges are flush with structure.",
      "accordions": [
        {
          "title": "Base Alignment",
          "content": "Align R5 along base frame.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Tightening",
          "content": "Complete by tightening all screws.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "R10": {
      "description": "Guide for installing R10 - Confirm panel stability before finishing.",
      "accordions": [
        {
          "title": "Anchor Placement",
          "content": "Anchor R10 carefully at corners.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Bolt Check",
          "content": "Ensure bolts are tight.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "R7": {
      "description": "Instructions for R7 - Ensure secure installation.",
      "accordions": [
        {
          "title": "Lower Edge Securing",
          "content": "Fasten R7 at the lower edge.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Bolt Tightening",
          "content": "Complete with a final check of all bolts.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W3": {
      "description": "Instructions for G-W3 placement - Confirm alignment with surrounding panels.",
      "accordions": [
        {
          "title": "Initial Positioning",
          "content": "Place G-W3 carefully before securing.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Screw Tightening",
          "content": "Check screws for tightness.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    },
    "G-W2": {
      "description": "Assembly guide for G-W2 - Verify that all connections are firm.",
      "accordions": [
        {
          "title": "Edge Securing",
          "content": "Attach G-W2 along the edge.",
          "image": "https://www.myassembly.co/src/assets/ClickModel.gif"
        },
        {
          "title": "Final Bolt Check",
          "content": "Ensure all bolts are tight.",
          "image": "https://www.myassembly.co/src/assets/DragModel.gif"
        }
      ]
    }

  }
}
    try {
        const response = await api.put(`projects/${48}`, {
            settings: JSON.stringify(settings) // Convert settings to JSON string if necessary
        }, {
            headers: {
                'Content-Type': 'application/json' // Specify content type if sending JSON
            }
        });

        console.log('Project updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating project:', error.response ? error.response.data : error.message);
    }
};

</script>

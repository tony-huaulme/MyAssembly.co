import { Panel } from './Panel.js';
import { isPanelName, isPanelPart, groupAndSort } from '../utils.js';
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


export class Building {

    constructor(model, config) {
        this.model = model;
        this.panels = {};
        this.init();
    }

    init() {
        this.definePanels();
    }

    getPanels() {
        return this.panels;
    }

    definePanels() {

        let currentPanelName = null
  
        this.model.traverse((child) => {
            const name = child.name;

            let panelName = isPanelName(name)
            if (panelName) {
                currentPanelName = panelName;
                this.panels[currentPanelName] = new Panel(currentPanelName);

            } else if (currentPanelName && isPanelPart(name)) {
                this.allowTransprencyOnChild(child);
                this.panels[currentPanelName].addElement(child);
                child.myassemblyPanelName = currentPanelName;
            }
  
        });


        console.log("Panels Defined: \n",this.panels);

    }

    async allowTransprencyOnChild(child) {
        
        if (child.isMesh) {

            const metalMaterial = new THREE.MeshStandardMaterial({
                color: 0xAEB3B8, // steel gray
                transparent: true,
                opacity: 1
            });
        
            child.material = metalMaterial;

        }
    }

    hidePanel(panelName) {
        this.panels[panelName].hide();
    }

    showOnlyPanelByName(panelName) {
        this.hideAllPanels();
        this.panels[panelName].show();
    }

    hideAllPanels() {
        for (const panelName in this.panels) {
            this.panels[panelName].hide();
        }
    }

    showAllPanels() {
        for (const panelName in this.panels) {
            this.panels[panelName].show();
        }
    }
   
    getPanelsByGroupsDict() {



        let allPanlesNames = Object.keys(this.panels);

        allPanlesNames.forEach((item, index) => {
            if (item.includes('*')) {
                allPanlesNames[index] = item.replace('*', ''); // Replace '*' with an empty string
            }
          });
        console.log("All Panels Names: ", allPanlesNames);  
        return groupAndSort(allPanlesNames);
    }


    

    // WORKING stick to the elemnt
    addLabelToGroup(panelName, labelText) {

        // delete labels of CSS2DObject instance


        // delete element with class : panelLabelDemo
        const existing_labels = document.getElementsByClassName('panelLabelDemo')

        while(existing_labels.length > 0){
            // delete the parent of the label
            existing_labels[0].remove();
        }
        console.log("STEP 1", panelName);

        const child = this.panels[panelName].getElements()[0];
        if (!child) return;
        console.log("adding label to: ", panelName);
        // Create the label element
        const labelDiv = document.createElement('div');


        labelDiv.innerHTML = `
            <button class="p-button p-component panelLabelDemo running-border" type="button">${panelName}</button>
        `;
    
        // Set up the CSS2DObject for the label
        const label = new CSS2DObject(labelDiv);
        
        // Attach the label directly to the child to match its position
        child.add(label);
        labelDiv.addEventListener('click', () => {
            document.getElementById('selectedPanel').click();   
        });
    }

    
    
    
}

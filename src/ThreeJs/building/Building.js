import { Panel } from './Panel.js';
import { isPanelName, isPanelPart, groupAndSort } from '../utils.js';
import * as THREE from 'three';


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

}

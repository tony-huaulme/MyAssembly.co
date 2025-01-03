import { Panel } from './Panel.js';
import { isPanelName, isPanelPart, groupAndSort } from '../utils.js';
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


export class Building {

    constructor(model, settings) {
        this.model = model;
        this.panels = {};
        this.settings = settings;
        this.panelGrouped = null;
        this.playing = false
        this.stopped = false;
        this.paused = true;

        this.init();

        console.log("Builing Initialized with SETTINGS: ", this.settings);

    }

    init() {
        this.definePanels();
    }

    getPanels() {
        return this.panels;
    }

    definePanels() {

        let identification;

        try {
            identification = this.settings["model_structure_identification"]
        } catch (error) {
            console.log('Error ( this.settings["model_structure_identification"] ) : \n', error);
        }

        if (identification == "description") {

        // itterate trhought a json that have string as key and array of string as value
            const model_structure = JSON.parse(JSON.parse(this.settings["model_structure"]));

            Object.entries(model_structure).forEach(([panelName, elements]) => {
                this.panels[panelName] = new Panel(panelName);
                elements.forEach((elementName) => {
                    let element = this.model.getObjectByName(elementName);
                    if (element && element.isMesh) {
                        this.allowTransprencyOnChild(element);
                        this.panels[panelName].addElement(element);
                        element.myassemblyPanelName = panelName;
                    }
                });
            });
            
            console.log("Panels Defined: \n",this.panels);

        }else { //(identification == "ifcelementassembly")

            let currentPanelName = null
    
            this.model.traverse((child) => {
                const name = child.name;
                
                let panelName = isPanelName(name)
                if (panelName) {
                    currentPanelName = panelName;
                    this.panels[currentPanelName] = new Panel(currentPanelName);

                } else if (currentPanelName && isPanelPart(name) && child.isMesh) {
                    this.allowTransprencyOnChild(child);
                    this.panels[currentPanelName].addElement(child);
                    child.myassemblyPanelName = currentPanelName;
                }
            });


            console.log("Panels Defined: \n",this.panels);
        }
    }

    async allowTransprencyOnChild(child) {

            // if (this.settings) {

                const metalMaterial = new THREE.MeshStandardMaterial({
                    color: 0xAEB3B8, // steel gray
                    transparent: true,
                    opacity: 1
                });

                child.material = metalMaterial;

            // }else {
                
            //     // try catch set material. transparent = true and opacity = 1
            //     try {
            //         child.material.transparent = true;
            //         child.material.opacity = 1;
            //         if (this.settings) {
            //             child.material.color = 0xAEB3B8;
            //         }
            //     } catch (error) {
            //         console.log("Error: ", error);
            //     }

            // }
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
        const groups = groupAndSort(allPanlesNames);
        this.panelGrouped = groups
        return groups
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
            // if element info-panel-container class containe h-sidebar
            let infoPanel = document.getElementById('info-panel-container');
            if (infoPanel.classList.contains('h-sidebar')) {
                document.getElementById('toggle-info-panel').click();
            }
        });
    }

    async togglePlayMode() {
        return //disabled
        this.paused = this.playing;
        this.playing = !this.playing;
        this.stopped = false;

        this.hideAllPanels()

        for (const groupName of Object.keys({"G-W" : this.panelGrouped["G-W"],"1F-W" : this.panelGrouped["1F-W"],"R" : this.panelGrouped["R"] })) {//"G-W" : this.panelGrouped["G-W"], "1F-W" : this.panelGrouped["1F-W"], 
            if (this.stopped) break;  // Exit if stopped
  
            const panelNames = this.panelGrouped[groupName]
            for (const panelName of panelNames) {
                if (this.stopped) break;  // Exit if stopped
  
                // Wait for the pause to be released
                while (this.paused) {
                  //   console.log("Paused");
                    if (this.stopped) break;  // Exit if stopped
                    await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
                }
  
                if (this.stopped) break;  // Exit if stopped
  
                await new Promise(resolve => setTimeout(resolve, 333)); // Wait for 333ms
              //   console.log("group :  ", group);
              //   console.log("panelNames :  ", panelName);
                this.panels[panelName].show();
            }
        }
  
        this.playing = false;
  
    }
  


    
    // Method to pause the process
    pause() {
        this.paused = true;
    }
    
    // Method to resume the process
    resume() {
        this.paused = false;
    }
    
    // Method to stop the process
    stop() {
        this.stopped = true;
    }
    
}

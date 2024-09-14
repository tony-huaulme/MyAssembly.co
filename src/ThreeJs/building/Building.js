import { Panel } from './Panel.js';
import { isPanelName, isPanelPart } from '../utils.js';

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
            }
  
        });


        console.log("Panels Defined: \n",this.panels);

    }

    async allowTransprencyOnChild(child) {
        
        if (child.isMesh) {

            // console.log("setting transparency on child", child.name);

            // const metalMaterial = new THREE.MeshStandardMaterial({
            //     color: 0xebebeb, // Grayish color
            //     transparent: true,
            //     opacity: 1
            // });
        
            // child.material = metalMaterial;

            child.material.transparent = true; // Ensure transparency support
            child.material.opacity = 1; // Set initial opacity to 1
            // child.userData.originalPosition = child.position.clone();
            child.material = child.material.clone();
  

            // const direction = new THREE.Vector3().copy(child.position).normalize();
            // child.userData.explodedPosition = child.position.clone().add(direction.multiplyScalar(4));
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
   
}

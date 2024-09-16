import { setElementsOpacity } from './ModelAnimation.js';


export class Panel {
    constructor(name) {
      this.name = name;
      this.elements = []; // Array of Three.js objects
      this.visible = true;
    }
  
    getName() {
      return this.name;
    }

    addElement(el) {
      this.elements.push(el);
    }
  
    getElements() {
      return this.elements;
    }
  
    hide(opacity=0.12) {
      setElementsOpacity(this.elements, opacity);
    }
  
    show(opacity=1) {
      setElementsOpacity(this.elements, opacity);
    }

    setOpacity(opacity) {

      this.elements.forEach(el => {
        el.material.depthTest = opacity === 1 ? false : true;
        el.material.opacity = opacity;
      });

    }

}
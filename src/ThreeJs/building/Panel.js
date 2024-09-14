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
      this.setOpacity(opacity);
      this.visible = false;

    }
  
    show(opacity=1) {

      this.setOpacity(opacity);
      this.visible = true;

    }

    setOpacity(opacity) {

      this.elements.forEach(el => {
        el.material.depthTest = opacity === 1 ? false : true;
        el.material.opacity = opacity;
      });

    }

}
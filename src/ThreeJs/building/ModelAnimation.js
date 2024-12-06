import { Tween, Easing, Group } from '@tweenjs/tween.js';

export const TG = new Group();



// MODEL PIECES ANIMATION
// Set elements opacity using tween new Tween(element.material)
export function setElementsOpacity(elements, opacity, duration = 300, depthForOpacity = 1) {

  elements.forEach(el => {
    if (el.material && 'depthTest' in el.material) {
      el.material.depthTest = opacity >= depthForOpacity ? false : true;
    }
    let _ = new Tween(el.material)
        .to({ opacity }, duration)
        .easing(Easing.Cubic.InOut)
        .start()
        TG.add(_);
  })

}

export function openingAnimation(base, camera) {

  console.log("animation CAMERA")
  let t1 = new Tween(camera.position)
    .to({ x: 0, y: 8, z: 0 }, 25)
    .easing(Easing.Cubic.InOut)
    .start()


  TG.add(t1);
}


// MODEL ANIMATION

export function setModelRotation(model, axe, rotation, duration = 1) {

    if(["x", "y", "z"].indexOf(axe) === -1) return;
    
    let toPos = {}
    toPos[axe] = model.rotation[axe] + rotation
    
    console.log("rotation", toPos)


    let _ = new Tween(model.rotation)
        .to(toPos, duration)
        .easing(Easing.Cubic.InOut)
        .start()
    TG.add(_);
  
  }
// set model.position.set
export function setModelPosition(model, position, duration = 300) {
  
    let _ = new Tween(model.position)
        .to(position, duration)
        .easing(Easing.Cubic.InOut)
        .start()
    TG.add(_);
  
  }


// CAMERA ANIMATION
// Set camera position using tween new Tween(camera.position)
export function setCameraPosition(camera, position, duration = 300) {

  let _ = new Tween(camera.position)
      .to(position, duration)
      .easing(Easing.Quadratic.Out)//Easing.Cubic.InOut
      .start()
  TG.add(_);

}

export function OpeningAnimation(camera, model, base, duration = 1){

  setCameraPosition(camera, base, 1)
  setModelPosition(model, { "x": 1, "y": -3.5, "z": 0 }, 1)

  // setCameraPosition(camera, { "x": -9.539544229757599, "y": 0.9296943318046175, "z": -6.929729846806887 } , 25)
  // setModelPosition(model, { x: 0, y: -20, z: 10 }, 25)

  //   setTimeout(() => {
  //     setCameraPosition(camera, base, duration)
  //     setModelPosition(model, { "x": 1, "y": -3.5, "z": 0 }, duration)
  //   }, 50);
}
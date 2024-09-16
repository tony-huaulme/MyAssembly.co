import { Tween, Easing, Group } from '@tweenjs/tween.js';

export const TG = new Group();

// Set elements opacity using tween new Tween(element.material)
export function setElementsOpacity(elements, opacity, duration = 300, depthForOpacity = 1) {

  elements.forEach(el => {
    el.material.depthTest = opacity >= depthForOpacity ? false : true;
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
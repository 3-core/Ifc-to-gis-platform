Heliosen.keyboard = (() => {
  let keyboard = null;
  const Keyboard = class {
    constructor(viewer) {
      this.viewer = viewer;
      // this.init();
    }

    keyboardEvent(keyType,type) {

       const flags = {
         looking: false,
         moveForward: false,
         moveBackward: false,
         moveUp: false,
         moveDown: false,
         moveLeft: false,
         moveRight: false,
       };

       const flagName = getFlagForKeyCode(type);

       if (typeof flagName !== "undefined") {
         if (keyType == "keydown"){
             flags[flagName] = true;
         }else{
             flags[flagName] = false;
         }
       }

       const _viewer =  this.viewer;
       const camera = _viewer.camera;

       if (flags.looking) {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            // Coordinate (0.0, 0.0) will be where the mouse was clicked.
            const x = (mousePosition.x - startMousePosition.x) / width;
            const y = -(mousePosition.y - startMousePosition.y) / height;

            const lookFactor = 0.05;
            camera.lookRight(x * lookFactor);
            camera.lookUp(y * lookFactor);
       }

       const scene = _viewer.scene;

       const ellipsoid = scene.globe.ellipsoid;
       // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
       const cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
       const moveRate = cameraHeight / 100.0;

       if (flags.moveForward) {
          camera.moveForward(moveRate);
       }
       if (flags.moveBackward) {
           camera.moveBackward(moveRate);
       }
       if (flags.moveUp) {
           camera.moveUp(moveRate);
       }
       if (flags.moveDown) {
           camera.moveDown(moveRate);
       }
       if (flags.moveLeft) {
          camera.moveLeft(moveRate);
       }
       if (flags.moveRight) {
          camera.moveRight(moveRate);
       }
    }
  }
  function getFlagForKeyCode(keyCode) {
    switch (keyCode) {
        case "W".charCodeAt(0):
            return "moveForward";
        case "S".charCodeAt(0):
            return "moveBackward";
        case "Q".charCodeAt(0):
            return "moveUp";
        case "E".charCodeAt(0):
          return "moveDown";
        case "D".charCodeAt(0):
          return "moveRight";
        case "A".charCodeAt(0):
          return "moveLeft";
        default:
          return undefined;
    }
  }

  return {
    initKeyboard(viewer) {
      keyboard = new Keyboard(viewer);
    },

    KeyboardEvent(keyType,type) {
      keyboard.keyboardEvent(keyType,type);
    },
  };
})();
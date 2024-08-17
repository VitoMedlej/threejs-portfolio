"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
// import MobileButtons from "../MobileButtons/MobileButtons";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader, MTLLoader } from "three-stdlib";
import Stats from 'stats.js';


const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pictureFrameRef : any = useRef();
  
  useEffect(() => {
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      controls: PointerLockControls;

    const velocity = new THREE.Vector3();
    const onKeyDown = (event: KeyboardEvent | any) => {
      switch (event.key) {
        case "w":
          velocity.z = -0.7;
          break;
        case "a":
          velocity.x = -0.7;
          break;
        case "s":
          velocity.z = 0.9;
          break;
        case "d":
          velocity.x = 0.9;
          break;
      }
    };
    const onKeyUp = (event: KeyboardEvent | any) => {
      switch (event.key) {
        case "w":
        case "s":
          velocity.z = 0;
          break;
        case "a":
        case "d":
          velocity.x = 0;
          break;
      }
    };

    const init = () => {
      const buttons: any = document.querySelectorAll(".mobile-button");
      console.log("buttons: ", buttons);

      buttons.forEach((button: any) => {
        button.addEventListener("touchstart", (e: any) => {
          onKeyDown({ key: `${e.target?.id}` });
        });
        button.addEventListener("touchend", (e: any) => {
          onKeyUp({ key: `${e.target?.id}` });
        });
      });


      const loader = new THREE.TextureLoader();

      scene = new THREE.Scene();
      const objectLoader = new OBJLoader();



     
        const stats = new Stats();

const panel = new Stats.Panel("FPS", "#ff0000", "#0000ff");
        stats.addPanel(panel);
        stats.showPanel(0);

// Camera
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 15, 25);

document.body.appendChild(stats.dom);


// Renderer
renderer = new THREE.WebGLRenderer({
  canvas: canvasRef.current!, antialias: true
  , precision: 'highp'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;



const gltfloader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
// const dummyTexture = textureLoader.load('/materials/laptoptexture.png');
gltfloader.load('/materials/new.glb', (gltf:  any) => {
  gltf.scene.traverse((node : any) => {
    if (node instanceof THREE.Mesh) {
        node.receiveShadow = true;
        node.castShadow = true;

     
    }

  });

  // Adjust scale/position if needed
  gltf.scene.scale.set(6, 6, 6);
  gltf.scene.position.set(5, -5, 5);

  scene.add(gltf.scene);
}, undefined, (error : any) => {
  console.error('An error occurred loading the model:', error);
});


const texture3 = loader.load("/materials/woodfloor.jpg", function (texture : any) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(3, 3);
});

const light1 = new THREE.SpotLight('white', 2);
light1.position.set(0, 70, 0);
light1.decay = 0.1;
light1.distance = 110;

light1.angle = Math.PI / 1; 
light1.castShadow = true;

const light2 = new THREE.SpotLight('white', 2);
light2.position.set(0, 70, 0);
light2.decay = 0.1;
light2.intensity = 2;
light2.distance = 110;

light2.angle = Math.PI / 1; 
light2.castShadow = true;


const lighthelper = new THREE.SpotLightHelper(light2) 



const targetObject = new THREE.Object3D();
targetObject.position.set(60, 20, -50);
scene.add(targetObject);

// Set the target of the directional light
light2.target = targetObject;


scene.add(light2.target);
scene.add(light2);




const terrainGeometry = new THREE.PlaneGeometry(130, 130, 50, 130);
const terrainMaterial = new THREE.MeshStandardMaterial({ map: texture3 });


const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);

terrain.rotation.x = -Math.PI / 2;
terrain.position.y = -2;
terrain.receiveShadow = true;



scene.add(terrain);





// gltfloader.load('/materials/frame2.glb', (gltf) => {
//   gltf.scene.traverse((node: THREE.Object3D) => {
//     // if (node instanceof THREE.Mesh) {
//     //   if (node.name === 'laptop') {
//     //     console.log('node: ', node.name);
//     //     const material = new THREE.MeshStandardMaterial({ map: dummyTexture });
//     //     node.material = material;
//     //   }
//     // }
//   });
  

//   gltf.scene.scale.set(6, 6, 6);
//   gltf.scene.position.set(-47, -5, 15);
//   scene.add(gltf.scene);
// }, undefined, (error) => {
//   console.error('An error occurred loading the model:', error);
// });

// gltfloader.load('/materials/frame.glb', (gltf) => {
//   // console.log('gltf: ', gltf);
//   gltf.scene.traverse((node: THREE.Object3D) => {
//     // console.log('node: ', node);

//   })
//   // const aoMap = textureLoader.load('/materials/a.png');
  
//   // gltf.scene.traverse((node: THREE.Object3D) => {
//   //   if ('isMesh' in node && (node as THREE.Mesh).isMesh) {


      
//   //     const meshNode = node as THREE.Mesh;
//   //     if (Array.isArray(meshNode.material)) {


//   //       meshNode.material.forEach((mat) => {
//   //         if ('aoMap' in mat) {
//   //           (mat as THREE.MeshStandardMaterial).aoMap = aoMap;
//   //           (mat as THREE.MeshStandardMaterial).needsUpdate = true;
//   //         }
//   //       });
//   //     } else if ('aoMap' in meshNode.material) {
//   //       (meshNode.material as THREE.MeshStandardMaterial).aoMap = aoMap;
//   //       (meshNode.material as THREE.MeshStandardMaterial).needsUpdate = true;
//   //     }
//   //   }
//   // });

//   gltf.scene.scale.set(5, 5, 5);
//   gltf.scene.position.set(5, 0, 55);
//   scene.add(gltf.scene);
// }, undefined, (error) => {
//   console.error('An error occurred loading the model:', error);
// });



      


      // const pictureFrameGroup2 = pictureFrameRef.current.createPictureFrame({
      //   textureURL: 'https://th.bing.com/th/id/R.6641d892daaa187a726aacefd32f8420?rik=ZUW%2fOeCuvEWmKg&pid=ImgRaw&r=0',
      //   frameSize: {
      //     thickness: 0.5,
      //     depth: 0.5,
      //     length: 12
      //   },
      //   pictureSize: {
      //     width: 10,
      //     height: 10
      //   },
      //   backgroundSize: {
      //     width: 11,
      //     height: 11
      //   }
      //   ,
      //   location: {
      //     x: 0,
      //     y: 10,
      //     z: -49,
      //   }
      // });


  


const ambientLight = new THREE.AmbientLight('white',2)
ambientLight.position.set(0,10,0);
scene.add(ambientLight);

    //   scene.add(target, wall1, wall2, wall3, wall4);
      // obstacles.push(wall1, wall2, wall3, wall4);

      // obstacles.forEach((obstacle) => {
      //   const boundingBox = new THREE.Box3().setFromObject(obstacle);
      //   boundingBoxes.push(boundingBox);
      // });

      

      controls = new PointerLockControls(camera, renderer.domElement);
      canvasRef.current!.addEventListener("click", () => {
        controls.lock();
      });

      scene.add(controls.getObject());

      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);

 


      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // or THREE.BasicShadowMap
      // scene.traverse(function (node) {
      //   if (node instanceof THREE.Mesh) {
      //     node.material.needsUpdate = true;
      //   }
      // });
      const animate = () => {
        requestAnimationFrame(animate);
            stats.begin();
            lighthelper.update();
            
          
         
        // let originalPosition = controls.getObject().position.clone();

        controls.moveRight(velocity.x * 1); // Adjust speed as needed
        controls.moveForward(-velocity.z * 1); // Adjust speed as needed

        // const cameraBoundingBox = new THREE.Box3(
        //   new THREE.Vector3(
        //     camera.position.x - 0.5,
        //     camera.position.y - 0.5,
        //     camera.position.z - 0.5
        //   ),
        //   new THREE.Vector3(
        //     camera.position.x + 0.5,
        //     camera.position.y + 0.5,
        //     camera.position.z + 0.5
        //   )
        // );

        // if (checkCollision(cameraBoundingBox, boundingBoxes)) {
        //   controls.getObject().position.copy(originalPosition);
        // }

        renderer.render(scene, camera);
        // console.log(renderer.info.render.calls);
        stats.end();
      };

      animate();
    };

    init();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <>
    {/* <PictureFrame ref={pictureFrameRef} /> */}

      {/* <MobileButtons /> */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
    </>
  );
};

export default ThreeScene;
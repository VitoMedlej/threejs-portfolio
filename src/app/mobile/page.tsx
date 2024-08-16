"use client";
import {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MobileButtons from '../MobileButtons/MobileButtons';

export default function Home() {
    const canvasRef = useRef < any > (null);
    // const [movement,
    //     setMovement] = useState({});
    const pictureFrameRef : any = useRef();

    useEffect(() => {
        if (!canvasRef.current) 
            return;



        const enterFullscreen = () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
              console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
          }
        };
    
        document.addEventListener('click', enterFullscreen);

        let isMovingRight= false;
        let isMovingLeft  = false;
        let isMovingForward = false;
        let isMovingBackward= false;
        
        // const velocity = new THREE.Vector3();
        const onKeyDown = (event : KeyboardEvent | any) => {

            switch (event.key) {
                    // case 'w':   controls.moveForward(1);   break; case 'a':
                    // controls.moveRight(-1);   break; case 's':   controls.moveForward(-1); break;
                    // case 'd':   controls.moveRight(1);   break;
                case 'w':
                        isMovingForward= true
                    break;
                case 'a':
                  isMovingRight= true
                  break;
                  case 's':
                    isMovingBackward= true
                    break;
                    case 'd':
                  isMovingLeft= true

                    break;
            }
        };
        const onKeyUp = (event : KeyboardEvent | any) => {
          switch (event.key) {
              case 'w':
              case 's':
                  isMovingForward = false;
                  isMovingBackward = false;
                  break;
              case 'a':
                isMovingRight = false;
                break;
                case 'd':
                isMovingLeft = false;
                  break;
          }
      };

        // Create a scene
        const scene = new THREE.Scene();

        // Create a camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create a renderer

        let renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create a geometry
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

        // Create a material
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

        // Create meshes
        const cube = new THREE.Mesh(boxGeometry, material);
        const sphere = new THREE.Mesh(sphereGeometry, material);


        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight
            .position
            .set(10, 20, 10);
        scene.add(directionalLight);

        // Camera
        camera
            .position
            .set(0, 10, 20); // Adjust position for better view


        renderer.setSize(window.innerWidth, window.innerHeight);
   

        const ambientLight = new THREE.AmbientLight('white',0.25)
        ambientLight.position.set(0,10,0);
        scene.add(ambientLight);
        

 
        const loader = new THREE.TextureLoader();


        const gltfloader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();
        // const dummyTexture = textureLoader.load('/materials/laptoptexture.png');
        gltfloader.load('/materials/untitled5.glb', (gltf) => {
          gltf.scene.traverse((node) => {
            if (node instanceof THREE.Mesh) {
                node.receiveShadow = true;
                node.castShadow = true;
        
             
            }
        
          });
        
          // Adjust scale/position if needed
          gltf.scene.scale.set(6, 6, 6);
          gltf.scene.position.set(5, -5, 5);
        
          scene.add(gltf.scene);
        }, undefined, (error) => {
          console.error('An error occurred loading the model:', error);
        });
        
        
        const texture3 = loader.load("/materials/woodfloor.jpg", function (texture) {
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




     

      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,antialias: true
      });

      renderer.setSize(window.innerWidth, window.innerHeight);




      
  

      


      const checkCollision = (cameraBoundingBox: any, boundingBoxes: any) => {
        for (let i = 0; i < boundingBoxes.length; i++) {
          if (cameraBoundingBox.intersectsBox(boundingBoxes[i])) {
            return true;
          }
        }
        return false;
      };









 
    

        let isDragging = false;
        const previousTouchPosition = {
            x: 0,
            y: 0
        };

        let pitch = 0;
        let yaw = 0;

        // if (isMovingBackward) {     camera.position.addScaledVector(direction,
        // -speed); } Listen for touchstart event
        window.addEventListener('touchstart', (e) => {
            isDragging = true;
            previousTouchPosition.x = e.touches[0].clientX;
            previousTouchPosition.y = e.touches[0].clientY;
        });

        // Listen for touchend event
        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Listen for touchmove event
        window.addEventListener('touchmove', (e) => {
            const currentTouchPosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };

            if (isDragging) {
                const deltaMove = {
                    x: currentTouchPosition.x - previousTouchPosition.x,
                    y: currentTouchPosition.y - previousTouchPosition.y
                };

                yaw += deltaMove.x * 0.01;
                pitch += deltaMove.y * 0.01;

                pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

                // Update camera rotation
                camera
                    .rotation
                    .set(pitch, yaw, 0, 'YXZ');
            }

            previousTouchPosition.x = currentTouchPosition.x;
            previousTouchPosition.y = currentTouchPosition.y;

        });

        const buttons : any = document.querySelectorAll('.mobile-button')

        buttons.forEach((button : any) => {
            button.addEventListener('touchstart', (e : any) => {
                onKeyDown({
                    key: `${e.target
                        ?.id}`
                })
            })
            button.addEventListener('touchend', (e : any) => {
                onKeyUp({
                    key: `${e.target
                        ?.id}`
                })
            })
        })

        let speed = 0.5;

        // Animation loop
        const animate = () => {
            // camera.position.z -=0.1;
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            camera.position.y = 10;

            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction);

            var right = new THREE.Vector3();
            right
                .crossVectors(camera.up, direction)
                .normalize();

                if (isMovingRight) {
                  camera
                  .position
                  .addScaledVector(right, speed);
                }
                
                if (isMovingLeft) {
                camera
                    .position
                    .addScaledVector(right, -speed);
            }

            if (isMovingForward) {
                camera
                    .position
                    .addScaledVector(direction, speed);
            }

            if (isMovingBackward) {
                camera
                    .position
                    .addScaledVector(direction, -speed);
            }

        };

        animate();

        // Cleanup on unmount
        return () => {
            window.removeEventListener('touchstart', () => {});
            window.removeEventListener('touchend', () => {});
            window.removeEventListener('touchmove', () => {});
            renderer.dispose();
            material.dispose();
            boxGeometry.dispose();
            sphereGeometry.dispose();
            document.removeEventListener('click', enterFullscreen);

        };
    }, []);

    return <> 
   {/* <PictureFrame ref={pictureFrameRef} /> */}
    
    <MobileButtons/> < canvas ref = {
        canvasRef
    }
    style = {{ width: '100vw', height: '100vh' }}/>
  </ >
};

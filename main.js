import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// Cena

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Variáveis



// Modelos

const Eevee = new GLTFLoader();
Eevee.load('/assets/eevee/scene.gltf', (eevee) => {
  eevee.scene.scale.set(2,2,2);
  scene.add(eevee.scene);
  eevee.scene.position.x = -25;
});

const Espeon = new GLTFLoader();
Espeon.load('/assets/espeon/scene.gltf', (espeon) => {
  espeon.scene.scale.set(2,2,2);
  scene.add(espeon.scene);
  espeon.scene.position.x = -20;
});

const Flareon = new GLTFLoader();
Flareon.load('/assets/flareon/scene.gltf', (flareon) => {
  flareon.scene.scale.set(2,2,2);
  scene.add(flareon.scene);
  flareon.scene.position.x = -15;
});

const Glaceon = new GLTFLoader();
Glaceon.load('/assets/glaceon/scene.gltf', (glaceon) => {
  glaceon.scene.scale.set(2,2,2);
  scene.add(glaceon.scene);
  glaceon.scene.position.x = -10;
});

const Jolteon = new GLTFLoader();
Jolteon.load('/assets/jolteon/scene.gltf', (jolteon) => {
  jolteon.scene.scale.set(2,2,2);
  scene.add(jolteon.scene);
  jolteon.scene.position.x = -5;
});

const Leafeon = new GLTFLoader();
Leafeon.load('/assets/leafeon/scene.gltf', (leafeon) => {
  leafeon.scene.scale.set(2,2,2);
  scene.add(leafeon.scene);
  leafeon.scene.position.x = 0;
});

const Sylveon = new GLTFLoader();
Sylveon.load('/assets/sylveon/scene.gltf', (sylveon) => {
  sylveon.scene.scale.set(2,2,2);
  scene.add(sylveon.scene);
  sylveon.scene.position.x = 5;
});

const Umbreon = new GLTFLoader();
Umbreon.load('/assets/umbreon/scene.gltf', (umbreon) => {
  umbron.scene.scale.set(2,2,2);
  scene.add(umbreon.scene);
  umbreon.scene.position.x = 10;
});

const Vaporeon = new GLTFLoader();
Vaporeon.load('/assets/vaporeon/scene.gltf', (vaporeon) => {
  vaporeon.scene.scale.set(2,2,2);
  scene.add(vaporeon.scene);
  vaporeon.scene.position.x = 15;
});

const ground = new THREE.Mesh( new THREE.BoxGeometry( 70, 1, 30 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
scene.add( ground );
ground.position.y = -1;
// Controles

const controls = new OrbitControls( camera, renderer.domElement );

// ANIMAÇÃO

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();
}

animate();

import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import o objloader
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// Cena

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const luz = new THREE.AmbientLight(0xffffff, 5);
scene.add(luz);

// Variáveis



// Modelos

const Sylveon = new GLTFLoader();
Sylveon.load(
    // resource URL
    '/assets/SYLVEON/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
        // Adiciona o modelo à cena
        scene.add( gltf.scene );

        // Ajusta a escala e a posição do modelo
        gltf.scene.scale.set(5,5,5)
        gltf.scene.position.x = 0;
        gltf.scene.position.z = 3;

        // Verifica se o modelo possui texturas
        if (gltf.scene && gltf.scene.material) {
            // Verifica se o material possui uma textura
            if (gltf.scene.material.map) {
                console.log('Modelo possui textura.');
            } else {
                console.log('Modelo não possui textura.');
            }

            // Lista as texturas utilizadas pelo modelo
            console.log('Texturas utilizadas:');
            gltf.scene.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    if (child.material.map) {
                        console.log(child.material.map);
                    }
                }
            });
        } else {
            console.log('Erro ao carregar o modelo: nenhum material encontrado.');
        }

    },
    // called while loading is progressing
    function ( xhr ) {
        // Log do progresso de carregamento
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% carregado' );
    },
    // called when loading has errors
    function ( error ) {
        // Log de erro ao carregar o modelo
        console.error('Erro ao carregar modelo.');
        console.error(error);
    }
);


const Eevee = new GLTFLoader();
Eevee.load('/assets/eevee/scene.gltf', (eevee) => {
  eevee.scene.scale.set(10,10,10);
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

const Umbreon = new GLTFLoader();
Umbreon.load('/assets/umbreon/scene.gltf', (umbreon) => {
  umbreon.scene.scale.set(2,2,2);
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

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

const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(luzAmbiente)

const light = new THREE.DirectionalLight(0xffffff, 1.0)
light.position.x = -2
light.position.y = 3
light.position.z = 1
light.castShadow = true
scene.add(light)

// Variáveis

// Adicione um evento de mousemove ao documento
document.addEventListener('mousemove', onMouseMove, false);

// Função para lidar com o movimento do mouse
function onMouseMove(event) {
  // Normalizar a posição do mouse entre -1 e 1
  var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  // Calcular as rotações com base nas coordenadas do mouse
  var rotationX = mouseY * Math.PI * 0.2; // Pode ajustar a sensibilidade multiplicando por um fator
  var rotationY = mouseX * Math.PI * 0.2;

  // Aplicar as rotações aos modelos
  if (eeveeModel) {
      eeveeModel.rotation.y = rotationY;
  }
  if(ground){
    ground.rotation.y = rotationY;
  
  }
}

// Modelos

var eeveeModel, espeonModel, flareonModel, glaceonModel, jolteonModel, leafeonModel, sylveonModel, umbreonModel, vaporeonModel;

function carregarModelos(){
  const Eevee = new GLTFLoader();
  Eevee.load('/assets/eevee/scene.gltf', (eevee) => {
    eevee.scene.scale.set(8,8,8);
    scene.add(eevee.scene);
    eevee.scene.position.x = 0;
    eevee.scene.castShadow = true
    eeveeModel = eevee.scene;
  });

  /*
  const Espeon = new GLTFLoader();
  Espeon.load('/assets/espeon/scene.gltf', (espeon) => {
    espeon.scene.scale.set(2,2,2);
    scene.add(espeon.scene);
    espeon.scene.position.x = -20;
    espeon.scene.castShadow = true
    espeonModel = espeon.scene;
  });

  const Flareon = new GLTFLoader();
  Flareon.load('/assets/flareon/scene.gltf', (flareon) => {
    flareon.scene.scale.set(2,2,2);
    scene.add(flareon.scene);
    flareon.scene.position.x = -15;
    flareon.scene.castShadow = true
    flareonModel = flareon.scene;
  });

  const Glaceon = new GLTFLoader();
  Glaceon.load('/assets/glaceon/scene.gltf', (glaceon) => {
    glaceon.scene.scale.set(2,2,2);
    scene.add(glaceon.scene);
    glaceon.scene.position.x = 0;
    glaceon.scene.castShadow = true
    glaceonModel = glaceon.scene;
  });

  const Jolteon = new GLTFLoader();
  Jolteon.load('/assets/jolteon/scene.gltf', (jolteon) => {
    jolteon.scene.scale.set(2,2,2);
    scene.add(jolteon.scene);
    jolteon.scene.position.x = -5;
    jolteon.scene.castShadow = true
    jolteonModel = jolteon.scene;
  });

  const Leafeon = new GLTFLoader();
  Leafeon.load('/assets/leafeon/scene.gltf', (leafeon) => {
    leafeon.scene.scale.set(2,2,2);
    scene.add(leafeon.scene);
    leafeon.scene.position.x = -10;
    leafeon.scene.castShadow = true
    leafeonModel = leafeon.scene;
  });

  const Sylveon = new GLTFLoader();
  Sylveon.load('/assets/SYLVEON/scene.gltf', (sylveon) => {
    sylveon.scene.scale.set(2,2,2);
    scene.add(sylveon.scene);
    sylveon.scene.position.x = 5;
    sylveon.scene.castShadow = true
    sylveonModel = sylveon.scene;
  });

  const Umbreon = new GLTFLoader();
  Umbreon.load('/assets/umbreon/scene.gltf', (umbreon) => {
    umbreon.scene.scale.set(2,2,2);
    scene.add(umbreon.scene);
    umbreon.scene.position.x = 10;
    umbreon.scene.castShadow = true
    umbreonModel = umbreon.scene;
  });

  const Vaporeon = new GLTFLoader();
  Vaporeon.load('/assets/vaporeon/scene.gltf', (vaporeon) => {
    vaporeon.scene.scale.set(2,2,2);
    scene.add(vaporeon.scene);
    vaporeon.scene.position.x = 15;
    vaporeon.scene.castShadow = true
    vaporeonModel = vaporeon.scene;
  });
  */
}

carregarModelos();

/*
function criarFlocoDeNeve() {
  const flocoDeNeve = new GLTFLoader();
  flocoDeNeve.load('/assets/Neve/scene.gltf', (snowflake) => {
      snowflake.scene.scale.set(0.01, 0.01, 0.01);

      // Define a posição inicial aleatória dentro da área específica
      snowflake.scene.position.set(
          Math.random() * 10 - 5, // valor entre -5 e 5
          10, // altura inicial
          Math.random() * 10 - 5 // valor entre -5 e 5
      );

      scene.add(snowflake.scene);

      // Função para atualizar a posição do floco de neve
      function atualizarFlocoDeNeve() {
          // Atualiza a posição do floco de neve para simular a queda
          snowflake.scene.position.y -= 0.05; // velocidade de queda

          // Se o floco de neve cair abaixo de uma certa altura, reinicie sua posição
          if (snowflake.scene.position.y < -5) {
              snowflake.scene.position.set(
                  Math.random() * 10 - 5, // valor entre -5 e 5
                  10, // altura inicial
                  Math.random() * 10 - 5 // valor entre -5 e 5
              );
          }

          // Chama essa função novamente no próximo quadro
          requestAnimationFrame(atualizarFlocoDeNeve);
      }

      // Inicia a atualização do floco de neve
      atualizarFlocoDeNeve();
  });
}

// Chama a função para criar flocos de neve periodicamente
setInterval(criarFlocoDeNeve, 2000); // Gera um novo floco de neve a cada segundo
*/

const ground = new THREE.Mesh( new THREE.CylinderGeometry(3,3,2,32) , new THREE.MeshStandardMaterial( { color: 0x00ffff, metalness:0.25 } ) );
scene.add( ground );
ground.position.y = -1;
ground.receiveShadow = true
ground.castShadow = true
// Controles

const controls = new OrbitControls( camera, renderer.domElement );

// ANIMAÇÃO

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();
}

animate();

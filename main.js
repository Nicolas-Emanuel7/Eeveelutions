import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// Cena

// Canvas
const canvas = document.querySelector('canvas.webgl')
const bodyElement = document.querySelector('body')

// Define o tamanho da janela do navegador
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 2.2, 7);
scene.add(camera);

// Cria um renderizador WebGL com as configurações especificadas
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // Define o canvas onde a renderização será feita
  antialias: true, // Ativa a opção de antialiasing para suavizar as bordas
  alpha: true // Permite que o canvas tenha um canal alfa (transparência)
})
// Ativa o mapeamento de sombras no renderizador
renderer.shadowMap.enabled = true
// Define o tipo de mapeamento de sombras para PCFSoftShadowMap para sombras suaves
renderer.shadowMap.type = THREE.PCFSoftShadowMap
// Define o tamanho da área de renderização como o tamanho da janela
renderer.setSize(sizes.width, sizes.height)
// Define a proporção de pixels do renderizador para ser o mínimo entre o dispositivo e 2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(luzAmbiente)

// Cria uma luz direcional com cor branca e intensidade 1
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// Define a posição da luz direcional
directionalLight.position.set(1, 2, 0)

// Ativa a capacidade de emitir sombras para a luz direcional
directionalLight.castShadow = true

// Adiciona a luz direcional à cena
scene.add(directionalLight)

// Variáveis

// Modelos

// Adicione um ouvinte de eventos para cada botão
document.getElementById("botaoEevee").addEventListener("click", function() {
  console.log('Carregando modelo Eevee')
  carregarModelo('eevee');
});

document.getElementById("botaoEspeon").addEventListener("click", function() {
  console.log('Carregando modelo Espeon')
  carregarModelo('espeon');
});

var eeveeModel, espeonModel, flareonModel, glaceonModel, jolteonModel, leafeonModel, sylveonModel, umbreonModel, vaporeonModel;

function carregarModelos(modelo) {
  // Remova o modelo existente, se houver
  if (eeveeModel) {
    scene.remove(eeveeModel);
    eeveeModel = undefined;
  }
  if (espeonModel) {
    scene.remove(espeonModel);
    espeonModel = undefined;
  }
  if (flareonModel) {
    scene.remove(flareonModel);
    flareonModel = undefined;
  }
  if (glaceonModel) {
    scene.remove(glaceonModel);
    glaceonModel = undefined;
  }
  if (jolteonModel) {
    scene.remove(jolteonModel);
    jolteonModel = undefined;
  }
  if (leafeonModel) {
    scene.remove(leafeonModel);
    leafeonModel = undefined;
  }
  if (sylveonModel) {
    scene.remove(sylveonModel);
    sylveonModel = undefined;
  }
  if (umbreonModel) {
    scene.remove(umbreonModel);
    umbreonModel = undefined;
  }
  if (vaporeonModel) {
    scene.remove(vaporeonModel);
    vaporeonModel = undefined;
  }

  // Carregue o modelo correspondente
  if (modelo === 'eevee') {
    console.log('Carregando modelo Eevee');
    const Eevee = new GLTFLoader();
    Eevee.load('/assets/eevee/scene.gltf', (eevee) => {
      eevee.scene.scale.set(8, 8, 8);
      scene.add(eevee.scene);
      eevee.scene.position.x = 0;
      eevee.scene.castShadow = true;
      eeveeModel = eevee.scene;
    });
  } else if (modelo === 'espeon') {
    console.log('Carregando modelo Espeon');
    const Espeon = new GLTFLoader();
    Espeon.load('/assets/espeon/scene.gltf', (espeon) => {
      espeon.scene.scale.set(2, 2, 2);
      scene.add(espeon.scene);
      espeon.scene.position.x = -20;
      espeon.scene.castShadow = true;
      espeonModel = espeon.scene;
    });
  } else if (modelo === 'flareon') {
  const Flareon = new GLTFLoader();
  Flareon.load('/assets/flareon/scene.gltf', (flareon) => {
    flareon.scene.scale.set(2,2,2);
    scene.add(flareon.scene);
    flareon.scene.position.x = -15;
    flareon.scene.castShadow = true
    flareonModel = flareon.scene;
  });
  } else if (modelo === 'glaceon') {
  const Glaceon = new GLTFLoader();
  Glaceon.load('/assets/glaceon/scene.gltf', (glaceon) => {
    glaceon.scene.scale.set(2,2,2);
    scene.add(glaceon.scene);
    glaceon.scene.position.x = 0;
    glaceon.scene.castShadow = true
    glaceonModel = glaceon.scene;
  });
  } else if (modelo === 'jolteon') {
  const Jolteon = new GLTFLoader();
  Jolteon.load('/assets/jolteon/scene.gltf', (jolteon) => {
    jolteon.scene.scale.set(2,2,2);
    scene.add(jolteon.scene);
    jolteon.scene.position.x = -5;
    jolteon.scene.castShadow = true
    jolteonModel = jolteon.scene;
  });
  } else if (modelo === 'leafeon') {
  const Leafeon = new GLTFLoader();
  Leafeon.load('/assets/leafeon/scene.gltf', (leafeon) => {
    leafeon.scene.scale.set(2,2,2);
    scene.add(leafeon.scene);
    leafeon.scene.position.x = -10;
    leafeon.scene.castShadow = true
    leafeonModel = leafeon.scene;
  });
  } else if (modelo === 'sylveon') {
  const Sylveon = new GLTFLoader();
  Sylveon.load('/assets/SYLVEON/scene.gltf', (sylveon) => {
    sylveon.scene.scale.set(2,2,2);
    scene.add(sylveon.scene);
    sylveon.scene.position.x = 5;
    sylveon.scene.castShadow = true
    sylveonModel = sylveon.scene;
  });
  } else if (modelo === 'umbreon') {
  const Umbreon = new GLTFLoader();
  Umbreon.load('/assets/umbreon/scene.gltf', (umbreon) => {
    umbreon.scene.scale.set(2,2,2);
    scene.add(umbreon.scene);
    umbreon.scene.position.x = 10;
    umbreon.scene.castShadow = true
    umbreonModel = umbreon.scene;
  });
  } else if (modelo === 'vaporeon') {
  const Vaporeon = new GLTFLoader();
  Vaporeon.load('/assets/vaporeon/scene.gltf', (vaporeon) => {
    vaporeon.scene.scale.set(2,2,2);
    scene.add(vaporeon.scene);
    vaporeon.scene.position.x = 15;
    vaporeon.scene.castShadow = true
    vaporeonModel = vaporeon.scene;
  });
  }
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



// ANIMAÇÃO

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

animate();

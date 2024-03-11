import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Cena

// Canvas
const canvas = document.querySelector('canvas.webgl')

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

// Modelos

//2dRenderer
const botaoRenderer = new CSS2DRenderer();
botaoRenderer.setSize(window.innerWidth, window.innerHeight);
botaoRenderer.domElement.style.position = 'absolute';
botaoRenderer.domElement.style.top = '0px'
document.body.appendChild(botaoRenderer.domElement);


// BOTÃO EEVEE
const botaoEevee = document.createElement('button');
botaoEevee.textContent = 'Eevee';
botaoEevee.addEventListener('click', () => {
  carregarModelos('eevee');
});
const botaoEeveeObj = new CSS2DObject(botaoEevee);
botaoEeveeObj.position.set(0, -2, 0);
scene.add(botaoEeveeObj);

// BOTÃO ESPEON
const botaoEspeon = document.createElement('button');
botaoEspeon.textContent = 'Espeon';
botaoEspeon.addEventListener('click', () => {
  carregarModelos('espeon');
});
const botaoEspeonObj = new CSS2DObject(botaoEspeon);
botaoEspeonObj.position.set(1, -2, 0);
scene.add(botaoEspeonObj);

// BOTÃO FLAREON
const botaoFlareon = document.createElement('button');
botaoFlareon.textContent = 'Espeon';
botaoFlareon.addEventListener('click', () => {
  carregarModelos('flareon');
});
const botaoFlareonObj = new CSS2DObject(botaoFlareon);
botaoFlareonObj.position.set(2, -2, 0);
scene.add(botaoFlareonObj);

// BOTÃO GLACEON
const botaoGlaceon = document.createElement('button');
botaoGlaceon.textContent = 'Glaceon';
botaoGlaceon.addEventListener('click', () => {
  carregarModelos('glaceon');
});
const botaoGlaceonObj = new CSS2DObject(botaoGlaceon);
botaoGlaceonObj.position.set(-1, -2, 0);
scene.add(botaoGlaceonObj);

// BOTÃO JOLTEON
const botaoJolteon = document.createElement('button');
botaoJolteon.textContent = 'Jolteon';
botaoJolteon.addEventListener('click', () => {
  carregarModelos('jolteon');
});
const botaoJolteonObj = new CSS2DObject(botaoJolteon);
botaoJolteonObj.position.set(-2, -2, 0);
scene.add(botaoJolteonObj);

// BOTÃO LEAFEON
const botaoLeafeon = document.createElement('button');
botaoLeafeon.textContent = 'Leafeon';
botaoLeafeon.addEventListener('click', () => {
  carregarModelos('leafeon');
});
const botaoLeafeonObj = new CSS2DObject(botaoLeafeon);
botaoLeafeonObj.position.set(-3, -2, 0);
scene.add(botaoLeafeonObj);

// BOTÃO SYLVEON
const botaoSylveon = document.createElement('button');
botaoSylveon.textContent = 'Sylveon';
botaoSylveon.addEventListener('click', () => {
  carregarModelos('sylveon');
});
const botaoSylveonObj = new CSS2DObject(botaoSylveon);
botaoSylveonObj.position.set(3, -2, 0);
scene.add(botaoSylveonObj);

// BOTÃO UMBREON
const botaoUmbreon = document.createElement('button');
botaoUmbreon.textContent = 'Umbreon';
botaoUmbreon.addEventListener('click', () => {
  carregarModelos('umbreon');
});
const botaoUmbreonObj = new CSS2DObject(botaoUmbreon);
botaoUmbreonObj.position.set(-4, -2, 0);
scene.add(botaoUmbreonObj);

// BOTÃO VAPOREON
const botaoVaporeon = document.createElement('button');
botaoVaporeon.textContent = 'Vaporeon';
botaoVaporeon.addEventListener('click', () => {
  carregarModelos('vaporeon');
});
const botaoVaporeonObj = new CSS2DObject(botaoVaporeon);
botaoVaporeonObj.position.set(4, -2, 0);
scene.add(botaoVaporeonObj);

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
      eevee.scene.castShadow = true;
      eeveeModel = eevee.scene;
    });
  } else if (modelo === 'espeon') {
    console.log('Carregando modelo Espeon');
    const Espeon = new GLTFLoader();
    Espeon.load('/assets/espeon/scene.gltf', (espeon) => {
      espeon.scene.scale.set(2, 2, 2);
      scene.add(espeon.scene);
      espeon.scene.castShadow = true;
      espeonModel = espeon.scene;
    });
  } else if (modelo === 'flareon') {
    console.log('Carregando modelo Flareon')
  const Flareon = new GLTFLoader();
  Flareon.load('/assets/flareon/scene.gltf', (flareon) => {
    flareon.scene.scale.set(2,2,2);
    scene.add(flareon.scene);
    flareon.scene.castShadow = true
    flareonModel = flareon.scene;
  });
  } else if (modelo === 'glaceon') {
    console.log('Carregando modelo Glaceon')
  const Glaceon = new GLTFLoader();
  Glaceon.load('/assets/glaceon/scene.gltf', (glaceon) => {
    glaceon.scene.scale.set(2,2,2);
    scene.add(glaceon.scene);
    glaceon.scene.castShadow = true
    glaceonModel = glaceon.scene;
  });
  } else if (modelo === 'jolteon') {
    console.log('Carregando modelo Jolteon')
  const Jolteon = new GLTFLoader();
  Jolteon.load('/assets/jolteon/scene.gltf', (jolteon) => {
    jolteon.scene.scale.set(2,2,2);
    scene.add(jolteon.scene);
    jolteon.scene.castShadow = true
    jolteonModel = jolteon.scene;
  });
  } else if (modelo === 'leafeon') {
    console.log('Carregando modelo Leafeon')
  const Leafeon = new GLTFLoader();
  Leafeon.load('/assets/leafeon/scene.gltf', (leafeon) => {
    leafeon.scene.scale.set(2,2,2);
    scene.add(leafeon.scene);
    leafeon.scene.castShadow = true
    leafeonModel = leafeon.scene;
  });
  } else if (modelo === 'sylveon') {
    console.log('Carregando modelo Sylveon')
  const Sylveon = new GLTFLoader();
  Sylveon.load('/assets/SYLVEON/scene.gltf', (sylveon) => {
    sylveon.scene.scale.set(2,2,2);
    scene.add(sylveon.scene);
    sylveon.scene.castShadow = true
    sylveonModel = sylveon.scene;
  });
  } else if (modelo === 'umbreon') {
    console.log('Carregando modelo Umbreon')
  const Umbreon = new GLTFLoader();
  Umbreon.load('/assets/umbreon/scene.gltf', (umbreon) => {
    umbreon.scene.scale.set(2,2,2);
    scene.add(umbreon.scene);
    umbreon.scene.castShadow = true
    umbreonModel = umbreon.scene;
  });
  } else if (modelo === 'vaporeon') {
    
  const Vaporeon = new GLTFLoader();
  Vaporeon.load('/assets/vaporeon/scene.gltf', (vaporeon) => {
    vaporeon.scene.scale.set(2,2,2);
    scene.add(vaporeon.scene);
    vaporeon.scene.castShadow = true
    vaporeonModel = vaporeon.scene;
  });
  }
}
carregarModelos();



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
  if(eeveeModel){
    eeveeModel.rotation.y = rotationY;
  }
  if(espeonModel){
    espeonModel.rotation.y = rotationY;
  }
  if(flareonModel){
    flareonModel.rotation.y = rotationY;
  }
  if(glaceonModel){
    glaceonModel.rotation.y = rotationY;
  }
  if(jolteonModel){
    jolteonModel.rotation.y = rotationY;
  }
  if(leafeonModel){
    leafeonModel.rotation.y = rotationY;
  }
  if(sylveonModel){
    sylveonModel.rotation.y = rotationY;
  }
  if(umbreonModel){
    umbreonModel.rotation.y = rotationY;
  }
  if(vaporeonModel){
    vaporeonModel.rotation.y = rotationY;
  }

  if(ground){
    ground.rotation.y = rotationY;
  
  }
}

// ANIMAÇÃO

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    botaoRenderer.render(scene, camera);

}

animate();

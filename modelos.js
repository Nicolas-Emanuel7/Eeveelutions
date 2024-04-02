// modelos.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Variável para controlar se o movimento da carta já foi concluído

export const modelosLista = []
var eeveeModel, espeonModel, flareonModel, glaceonModel, jolteonModel, leafeonModel, sylveonModel, umbreonModel, vaporeonModel, eeveeModel2;

export function carregarModelosEevee(scene, loadingManager){
  console.log('Carregando Eevee'); 
  const Eevee = new GLTFLoader(loadingManager);
  Eevee.load('/assets/eevee/scene.gltf', (eevee) => {
    eevee.scene.scale.set(8, 8, 8);
    scene.add(eevee.scene);
    eevee.scene.castShadow = true;
    eeveeModel = eevee.scene;
    eeveeModel.position.set(0, -9, 0);
    modelosLista.push(eeveeModel)
  });

  const Espeon = new GLTFLoader(loadingManager);
  Espeon.load('/assets/espeon/scene.gltf', (espeon) => {
    espeon.scene.scale.set(2, 2, 2);
    scene.add(espeon.scene);
    espeon.scene.castShadow = true;
    espeonModel = espeon.scene;
    espeonModel.position.set(-25, 0, 0);
    modelosLista.push(espeonModel)
  });

  const Flareon = new GLTFLoader(loadingManager);
  Flareon.load('/assets/flareon/scene.gltf', (flareon) => {
    flareon.scene.scale.set(1.8,1.9,2);
    scene.add(flareon.scene);
    flareon.scene.castShadow = true
    flareonModel = flareon.scene;
    flareonModel.position.set(25, 0, 0);
    modelosLista.push(flareonModel)
  });

  const Glaceon = new GLTFLoader(loadingManager);
  Glaceon.load('/assets/glaceon/scene.gltf', (glaceon) => {
    glaceon.scene.scale.set(2,2,2);
    scene.add(glaceon.scene);
    glaceon.scene.castShadow = true
    glaceonModel = glaceon.scene;
    glaceonModel.position.set(25, 0, 0);
    modelosLista.push(glaceonModel)
  });

  const Jolteon = new GLTFLoader(loadingManager);
  Jolteon.load('/assets/jolteon/scene.gltf', (jolteon) => {
    jolteon.scene.scale.set(2,2,2);
    scene.add(jolteon.scene);
    jolteon.scene.castShadow = true
    jolteonModel = jolteon.scene;
    jolteonModel.position.set(-25, 0, 0);
    modelosLista.push(jolteonModel)
  });

  const Leafeon = new GLTFLoader(loadingManager);
  Leafeon.load('/assets/leafeon/scene.gltf', (leafeon) => {
    leafeon.scene.scale.set(2,2,2);
    scene.add(leafeon.scene);
    leafeon.scene.castShadow = true
    leafeonModel = leafeon.scene;
    leafeonModel.position.set(-25, 0, 0);
    modelosLista.push(leafeonModel)
  });

  const Sylveon = new GLTFLoader(loadingManager);
  Sylveon.load('/assets/SYLVEON/scene.gltf', (sylveon) => {
    sylveon.scene.scale.set(2,2,2);
    scene.add(sylveon.scene);
    sylveon.scene.castShadow = true
    sylveonModel = sylveon.scene;
    sylveonModel.position.set(-25, 0, 0);
    modelosLista.push(sylveonModel)
  });

  const Umbreon = new GLTFLoader(loadingManager);
  Umbreon.load('/assets/umbreon/scene.gltf', (umbreon) => {
    umbreon.scene.scale.set(2,2,2);
    scene.add(umbreon.scene);
    umbreon.scene.castShadow = true
    umbreonModel = umbreon.scene;
    umbreonModel.position.set(25, 0, 0);
    modelosLista.push(umbreonModel)
  });

  const Vaporeon = new GLTFLoader(loadingManager);
  Vaporeon.load('/assets/vaporeon/scene.gltf', (vaporeon) => {
    vaporeon.scene.scale.set(1.7,1.7,1.7);
    scene.add(vaporeon.scene);
    vaporeon.scene.castShadow = true
    vaporeonModel = vaporeon.scene;
    vaporeonModel.position.set(25, 0, 0);
    modelosLista.push(vaporeonModel)
  });
}

export const chaoLista = []

// GRAMA
const texturaGrama = new THREE.TextureLoader().load('assets/CARTAS/grama-chao.webp');
const chao = new THREE.MeshStandardMaterial({map: texturaGrama});

var ground = new THREE.Mesh( new THREE.CylinderGeometry(3,3,0.4,32) , new THREE.MeshStandardMaterial( chao ) );
ground.position.y = -10;
ground.receiveShadow = true
ground.castShadow = true
chaoLista.push(ground)

// TERRA
const texturaTerra = new THREE.TextureLoader().load('assets/CARTAS/terra.jpg');
const terra = new THREE.MeshStandardMaterial({map: texturaTerra});

var ground2 = new THREE.Mesh( new THREE.CylinderGeometry(3.1,3.1,0.4,32) , new THREE.MeshStandardMaterial( terra ) );
ground2.position.y = -10;
ground2.receiveShadow = true
ground2.castShadow = true
chaoLista.push(ground2)

export const cenarioLista = []
export function carregarCenario(scene, loadingManager){
    var florestaModel;
    const Floresta = new GLTFLoader(loadingManager);
    Floresta.load('/assets/cenario3/scene.gltf', (floresta) => {
    floresta.scene.scale.set(0.0050,0.0050,0.0050);
    scene.add(floresta.scene);
    floresta.scene.castShadow = true
    floresta.scene.position.set(0,0.8,3);
    floresta.scene.rotation.y = 3
    florestaModel = floresta.scene;
    cenarioLista.push(florestaModel)
    });

    const EeveeInicial = new GLTFLoader(loadingManager);
    EeveeInicial.load('/assets/eevee/scene.gltf', (eeveeInicial) => {
    eeveeInicial.scene.scale.set(2,2,2);
    scene.add(eeveeInicial.scene);
    eeveeInicial.scene.castShadow = true;
    eeveeModel2 = eeveeInicial.scene;
    eeveeModel2.position.set(-0.3, 0.9, 4.8);
    eeveeModel2.rotation.y = -0.7
    cenarioLista.push(eeveeModel2)
  });
}

// NUVEM
export const nuvensLista = []; // Lista para armazenar as instâncias das nuvens

// Função para carregar o modelo da nuvem
export function carregarNuvem(scene, loadingManager) {
    const loader = new GLTFLoader(loadingManager);
    loader.load('/assets/nuvem/scene.gltf', (nuvem) => {
        nuvem.scene.scale.set(0.5,0.5,0.5);
        nuvem.scene.castShadow = true;
        for (let i = 0; i < 10; i++) { // Criar 5 instâncias da nuvem
            const nuvemInstancia = nuvem.scene.clone(); // Clone do modelo da nuvem
            nuvemInstancia.position.set(Math.random() * 40 - 20, Math.random() * (20 - 10) +2 , Math.random() * 10 - 15); // Posição aleatória
            nuvemInstancia.rotation.x = 0 ; // Rotação aleatória
            scene.add(nuvemInstancia); // Adicionar a instância à cena
            nuvensLista.push(nuvemInstancia); // Adicionar a instância à lista
        }
    });
}

// esferas
class Esfera extends THREE.Mesh {
    constructor(raio = 1, segmentos = 32, cor = 0xffffff) {
        // Chame o construtor da classe pai (THREE.Mesh) usando super()
        super(new THREE.SphereGeometry(raio, segmentos, segmentos), new THREE.MeshBasicMaterial({ color: cor }));
    }
    girarEmTornoDoEixoY(velocidade) {
        this.rotation.y += velocidade;
    }
    // Método para mudar a cor da esfera
    mudarCor(novaCor) {
      if (this.material instanceof THREE.MeshBasicMaterial) {
          // Define a nova cor para o material da esfera
          this.material.color.set(novaCor);
      } 
    }
  }
  
  // ESTRELA CADENTE
  export const estrelasLista = []; // Lista para armazenar as instâncias das estrelas
  
  // Função para carregar o modelo da estrela
  export function carregarEstrela(scene) {
    for(let i = 0; i < 15; i++){
      const estrela = new Esfera(0.03, 16, Math.random() * 0xffffff);
      estrela.position.set(Math.random() * 30 - 20, Math.random() * 20 + 10, Math.random() * 10 - 15);
      scene.add(estrela);
      estrelasLista.push(estrela); 
    }
  }
  
  export const esferasLista = []
  
  const esfera1 = new Esfera(0.03, 32, 0xff0000);
  esfera1.mudarCor('yellow');
  esferasLista.push(esfera1)
  
  const esfera2 = new Esfera(0.03, 32, 0xff0000);
  esfera2.mudarCor('yellow');
  esferasLista.push(esfera2)
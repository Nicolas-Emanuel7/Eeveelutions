// modelos.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Variável para controlar se o movimento da carta já foi concluído

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


var eeveeModel2;
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
        for (let i = 0; i < 8; i++) { // Criar 5 instâncias da nuvem
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
  
  export const esferasLista = []
  
  const esfera1 = new Esfera(0.03, 32, 0xff0000);
  esfera1.mudarCor('yellow');
  esferasLista.push(esfera1)
  
  const esfera2 = new Esfera(0.03, 32, 0xff0000);
  esfera2.mudarCor('yellow');
  esferasLista.push(esfera2)
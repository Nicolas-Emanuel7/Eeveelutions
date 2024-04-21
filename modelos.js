// modelos.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Variável para controlar se o movimento da carta já foi concluído

export const chaoLista = []

// GRAMA
const texturaGrama = new THREE.TextureLoader().load('assets/CARTAS/grama-chao.webp');
const materialGrama = new THREE.MeshStandardMaterial({map: texturaGrama});

var grama = new THREE.Mesh( new THREE.CylinderGeometry(3,3,0.4,32) , new THREE.MeshStandardMaterial( materialGrama ) );
grama.position.y = -10;
grama.receiveShadow = true
grama.castShadow = true
chaoLista.push(grama)

// TERRA
const texturaTerra = new THREE.TextureLoader().load('assets/CARTAS/terra.jpg');
const materialTerra = new THREE.MeshStandardMaterial({map: texturaTerra});

var terra = new THREE.Mesh( new THREE.CylinderGeometry(3.1,3.1,0.4,32) , new THREE.MeshStandardMaterial( materialTerra ) );
terra.position.y = -10;
terra.receiveShadow = true
terra.castShadow = true
chaoLista.push(terra)


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

class Esfera extends THREE.Mesh {
    constructor(raio = 1, segmentos = 32, cor = 0xffffff, textura = null) {
        let material;
        if (textura) {
            material = new THREE.MeshStandardMaterial({ map: textura });
        } else {
            // Usar uma cor sólida se não houver uma textura
            material = new THREE.MeshBasicMaterial({ color: cor });
        }

        // Chame o construtor da classe pai (THREE.Mesh) usando super()
        super(new THREE.SphereGeometry(raio, segmentos, segmentos), material);
    }

    girarEmTornoDoEixoY(velocidade) {
        this.rotation.y += velocidade;
    }
}

export const vagalumeLista = [];

// Criar esferas com cor
const esfera1 = new Esfera(0.03, 32, 'yellow');
vagalumeLista.push(esfera1);

const esfera2 = new Esfera(0.03, 32, 'yellow');
vagalumeLista.push(esfera2);

// Criar o sol com cor
const sol = new Esfera(3, 32, 'yellow');
export const solExport = sol;

// Criar a lua com textura
const texturaLua = new THREE.TextureLoader().load('assets/CARTAS/luaTextura.jpg');
const lua = new Esfera(3, 32, null, texturaLua);
export const luaExport = lua;
  
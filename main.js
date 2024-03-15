import './style.css'
import * as THREE from 'three';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// CENA ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

// Inicializa a variável scrollY com o valor atual do scroll vertical da janela
let scrollY = window.scrollY
// Inicializa a variável currentSection com o valor 0, representando a seção atual da página
let currentSection = 0

// SEÇÕES DA PÁGINA /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QQQQQ
const body = document.body;

// Objeto que mapeia o número da seção para a função que será executada
const sectionActions = {
  0: () => {
      // Ação para a seção 0
      cartasLista.forEach(carta => {
        moverModelo(carta, 10, 1, 10);
      })

      movimentarEsferas(2);

      moverModelo(esfera1, 0, -10, 0)
      moverModelo(esfera2, 0, -10, 0)

      moverModelo(ground, 0, -10, 0)
      moverModelo(ground2, 0, -10, 0)
      moverModelo(eeveeModel, 0, -10, 0)

      simbolosInicial(1)

  },
  1: () => {
      // Ação para a seção 1
      movimentarEsferas(1);

      simbolosInicial(2)

      moverModelo(cartasLista[0], 6, 1, 1.5)
      moverModelo(cartasLista[7], 10, 1, 10)

      moverModelo(simbolosLista[0], -6, 0, 0.7)
      moverModelo(simbolosLista[1], -6, -5, 0.7)

      moverModelo(ground, 0, -0.1, 0)
      moverModelo(ground2, 0, -0.2, 0)
      moverModelo(eeveeModel, 0, 0, 0)
      moverModelo(vaporeonModel, 25, 0, 0);

      body.style.background = '#f3d5a5';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  2: () => {
      // Ação para a seção 2
      moverModelo(cartasLista[0], 10, 1, 10)
      moverModelo(cartasLista[7], 6, 1, 1.5)
      moverModelo(cartasLista[4], 10, 1, 10)

      moverModelo(simbolosLista[0], -6, -5, 0.7)
      moverModelo(simbolosLista[1], -6, 0, 0.7)
      moverModelo(simbolosLista[2], -6, -5, 0.7)

      moverModelo(eeveeModel, -25, 0, 0)
      moverModelo(vaporeonModel, 0, 0, 0);
      moverModelo(jolteonModel, -25, 0, 0);

      body.style.background = '#79CEE0';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  3: () => {
      // Ação para a seção 3
      moverModelo(cartasLista[7], 10, 1, 10)
      moverModelo(cartasLista[4], 6, 1, 1.5)
      moverModelo(cartasLista[2], 10, 1, 10)

      moverModelo(simbolosLista[1], -6, -5, 0.7)
      moverModelo(simbolosLista[2], -6, -0.5, 0.7)
      moverModelo(simbolosLista[3], -6, -5, 0.7)

      moverModelo(jolteonModel, 0, 0, 0);
      moverModelo(vaporeonModel, 25, 0, 0);
      moverModelo(flareonModel, 25, 0, 0);

      body.style.background = '#ffff71';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  4: () => {
      // Ação para a seção 4
      moverModelo(cartasLista[4], 10, 1, 10)
      moverModelo(cartasLista[2], 6, 1, 1.5)
      moverModelo(cartasLista[1], 10, 1, 10)

      moverModelo(simbolosLista[2], -6, -5, 0.7)
      moverModelo(simbolosLista[3], -6, 1, 0.7)
      moverModelo(simbolosLista[4], -6, -5, 0.7)

      moverModelo(jolteonModel, -25, 0, 0);
      moverModelo(flareonModel, 0, 0, 0)
      moverModelo(espeonModel, -25, 0, 0);

      body.style.background = '#F7E8A1';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  5: () => {
      // Ação para a seção 5
      moverModelo(cartasLista[2], 10, 1, 10)
      moverModelo(cartasLista[1], 6, 1, 1.5)
      moverModelo(cartasLista[6], 10, 1, 10)

      moverModelo(simbolosLista[3], -6, -5, 0.7)
      moverModelo(simbolosLista[4], -6, 1, 0.7)
      moverModelo(simbolosLista[5], -6, -5, 0.7)

      moverModelo(flareonModel, 25, 0, 0)
      moverModelo(espeonModel, 0, 0, 0)
      moverModelo(umbreonModel, 25, 0, 0);

      body.style.background = '#E4CDDD';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  6: () => {
      // Ação para a seção 6
      moverModelo(cartasLista[1], 10, 1, 10)
      moverModelo(cartasLista[6], 6, 1, 1.5)
      moverModelo(cartasLista[5], 10, 1, 10)

      moverModelo(simbolosLista[4], -6, -5, 0.7)
      moverModelo(simbolosLista[5], -6, 1, 0.7)
      moverModelo(simbolosLista[6], -6, -5, 0.7)

      moverModelo(espeonModel, -25, 0, 0)
      moverModelo(umbreonModel, 0, 0, 0)
      moverModelo(leafeonModel, -25, 0, 0);

      body.style.background = '#efcb69';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  7: () => {
      // Ação para a seção 7
      moverModelo(cartasLista[6], 10, 1, 10)
      moverModelo(cartasLista[5], 6, 1, 1.5)
      moverModelo(cartasLista[3], 10, 1, 10)

      moverModelo(simbolosLista[5], -6, -5, 0.7)
      moverModelo(simbolosLista[6], -6, 1, 0.7)
      moverModelo(simbolosLista[7], -6, -5, 0.7)

      moverModelo(umbreonModel, 25, 0, 0)
      moverModelo(leafeonModel, 0, 0, 0)
      moverModelo(glaceonModel, 25, 0, 0);

      body.style.background = '#FAE9B9';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  8: () => {
      // Ação para a seção 8
      moverModelo(cartasLista[5], 10, 1, 10)
      moverModelo(cartasLista[3], 6, 1, 1.5)
      moverModelo(cartasLista[8], 10, 1, 10)

      moverModelo(simbolosLista[6], -6, -5, 0.7)
      moverModelo(simbolosLista[7], -6, 1, 0.7)
      moverModelo(simbolosLista[8], -6, -5, 0.7)

      moverModelo(leafeonModel, -25, 0, 0)
      moverModelo(glaceonModel, 0, 0, 0)
      moverModelo(sylveonModel, -25, 0, 0);

      body.style.background = '#DFF6F0';

      minhaLuz1.atualizarCor('white');
      minhaluz2.atualizarCor('white');

  },
  9: () => {
      // Ação para a seção 9
      moverModelo(cartasLista[3], 10, 1, 10)
      moverModelo(cartasLista[8], 6, 1, 1.5)

      moverModelo(simbolosLista[7], -6, -5, 0.7)
      moverModelo(simbolosLista[8], -6, 1, 0.7)


      moverModelo(glaceonModel, 25, 0, 0)
      moverModelo(sylveonModel, 0, 0, 0)

      body.style.background = '#ffdae3';

      minhaLuz1.atualizarCor('pink');
      minhaluz2.atualizarCor('yellow');

  }
  // Adicione mais pares chave-valor conforme necessário para cada seção
};

window.addEventListener('load', () => {
  // Executa a ação da seção 0 assim que a página é carregada
  sectionActions[0]();
});

// Adicione um listener de evento de scroll à janela
window.addEventListener('scroll', () => {
  // Atualiza a variável scrollY com o valor atual do scroll vertical da janela
  scrollY = window.scrollY
  // Calcula a nova seção com base na posição do scroll e na altura da janela
  const newSection = Math.round(scrollY / window.innerHeight)

  if (newSection != currentSection) {
      // Atualiza a seção atual com a nova seção
      currentSection = newSection
      // Executa a ação correspondente à seção atual
      if (sectionActions[currentSection]) {
          sectionActions[currentSection]();
      } else {
          console.log('Não há ação definida para esta seção');
      }
  }
});

// Variável para controlar se o movimento da carta já foi concluído
let movimentoConcluido = false;

function moverModelo(modelo, positionX, positionY, positionZ) {
  if (modelo) {
    gsap.to(modelo.position, { duration: 1.5, ease: 'power2.inOut', x: positionX , y: positionY, z: positionZ, onComplete: () => {
        movimentoConcluido = true;// Define movimentoConcluido como true após o término do movimento
    } });
  }
};


// Cria um renderizador WebGL com as configurações especificadas
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // Define o canvas onde a renderização será feita
  antialias: true, // Ativa a opção de antialiasing para suavizar as bordas
  alpha: true // Permite que o canvas tenha um canal alfa (transparência)
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(luzAmbiente)

class MinhaLuz extends THREE.Object3D {
  constructor(cor, intensidade) {
      super();
      // Crie a luz direcional
      this.luz = new THREE.SpotLight(cor, intensidade);
      // Defina a posição inicial da luz
      this.luz.target.position.set(0, 1, 0); // Posiciona a luz à direita
      this.luz.angle = Math.PI / 2;
      // Adicione a luz como filho desta instância da classe
      this.add(this.luz);
      this.castShadow = true;
  }
  // Método para atualizar a cor da luz
  atualizarCor(cor) {
      this.luz.color.set(cor);
  }
}

// Crie uma instância da classe MinhaLuz
const minhaLuz1 = new MinhaLuz(0x00ff00, 4);
const minhaluz2 = new MinhaLuz(0x0000ff, 4);
const minhaluz3 = new MinhaLuz(0xffffff, 8);
scene.add(minhaLuz1);
scene.add(minhaluz2);
scene.add(minhaluz3);

// Modelos

const modelosLista = []

function carregarModelos(){
  console.log('Carregando Eevee'); 
  const Eevee = new GLTFLoader();
  Eevee.load('/assets/eevee/scene.gltf', (eevee) => {
    eevee.scene.scale.set(8, 8, 8);
    scene.add(eevee.scene);
    eevee.scene.castShadow = true;
    eeveeModel = eevee.scene;
    eeveeModel.position.set(0, -9, 0);
    modelosLista.push(eeveeModel)
  });

  const Espeon = new GLTFLoader();
  Espeon.load('/assets/espeon/scene.gltf', (espeon) => {
    espeon.scene.scale.set(2, 2, 2);
    scene.add(espeon.scene);
    espeon.scene.castShadow = true;
    espeonModel = espeon.scene;
    espeonModel.position.set(-25, 0, 0);
    modelosLista.push(espeonModel)
  });

  const Flareon = new GLTFLoader();
  Flareon.load('/assets/flareon/scene.gltf', (flareon) => {
    flareon.scene.scale.set(1.8,1.9,2);
    scene.add(flareon.scene);
    flareon.scene.castShadow = true
    flareonModel = flareon.scene;
    flareonModel.position.set(25, 0, 0);
    modelosLista.push(flareonModel)
  });

  const Glaceon = new GLTFLoader();
  Glaceon.load('/assets/glaceon/scene.gltf', (glaceon) => {
    glaceon.scene.scale.set(2,2,2);
    scene.add(glaceon.scene);
    glaceon.scene.castShadow = true
    glaceonModel = glaceon.scene;
    glaceonModel.position.set(25, 0, 0);
    modelosLista.push(glaceonModel)
  });

  const Jolteon = new GLTFLoader();
  Jolteon.load('/assets/jolteon/scene.gltf', (jolteon) => {
    jolteon.scene.scale.set(2,2,2);
    scene.add(jolteon.scene);
    jolteon.scene.castShadow = true
    jolteonModel = jolteon.scene;
    jolteonModel.position.set(-25, 0, 0);
    modelosLista.push(jolteonModel)
  });

  const Leafeon = new GLTFLoader();
  Leafeon.load('/assets/leafeon/scene.gltf', (leafeon) => {
    leafeon.scene.scale.set(2,2,2);
    scene.add(leafeon.scene);
    leafeon.scene.castShadow = true
    leafeonModel = leafeon.scene;
    leafeonModel.position.set(-25, 0, 0);
    modelosLista.push(leafeonModel)
  });

  const Sylveon = new GLTFLoader();
  Sylveon.load('/assets/SYLVEON/scene.gltf', (sylveon) => {
    sylveon.scene.scale.set(2,2,2);
    scene.add(sylveon.scene);
    sylveon.scene.castShadow = true
    sylveonModel = sylveon.scene;
    sylveonModel.position.set(-25, 0, 0);
    modelosLista.push(sylveonModel)
  });

  const Umbreon = new GLTFLoader();
  Umbreon.load('/assets/umbreon/scene.gltf', (umbreon) => {
    umbreon.scene.scale.set(2,2,2);
    scene.add(umbreon.scene);
    umbreon.scene.castShadow = true
    umbreonModel = umbreon.scene;
    umbreonModel.position.set(25, 0, 0);
    modelosLista.push(umbreonModel)
  });

  const Vaporeon = new GLTFLoader();
  Vaporeon.load('/assets/vaporeon/scene.gltf', (vaporeon) => {
    vaporeon.scene.scale.set(1.7,1.7,1.7);
    scene.add(vaporeon.scene);
    vaporeon.scene.castShadow = true
    vaporeonModel = vaporeon.scene;
    vaporeonModel.position.set(25, 0, 0);
    modelosLista.push(vaporeonModel)
  });
}

var eeveeModel, espeonModel, flareonModel, glaceonModel, jolteonModel, leafeonModel, sylveonModel, umbreonModel, vaporeonModel;
carregarModelos()

// GRAMA
const texturaGrama = new THREE.TextureLoader().load('assets/CARTAS/grama-chao.webp');
const chao = new THREE.MeshStandardMaterial({map: texturaGrama});

const ground = new THREE.Mesh( new THREE.CylinderGeometry(3,3,0.3,32) , new THREE.MeshStandardMaterial( chao ) );
scene.add( ground );
ground.position.y = -10;
ground.receiveShadow = true
ground.castShadow = true

// TERRA
const texturaTerra = new THREE.TextureLoader().load('assets/CARTAS/terra.jpg');
const terra = new THREE.MeshStandardMaterial({map: texturaTerra});

const ground2 = new THREE.Mesh( new THREE.CylinderGeometry(3.1,3.1,0.4,32) , new THREE.MeshStandardMaterial( terra ) );
scene.add( ground2 );
ground2.position.y = -10;
ground2.receiveShadow = true
ground2.castShadow = true
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
  if(ground){
    ground.rotation.y = rotationY;
  }
  cartasLista.forEach(carta => {
    carta.rotation.y = rotationY * 0.1
  });
  modelosLista.forEach(modelo => {
    modelo.rotation.y = rotationY;
  });
}

const textureLoader = new THREE.TextureLoader();

// Criar geometria da carta
const geometry = new THREE.BoxGeometry(2.5, 3.7, 0.01);

const cartasLista = []

function criarCarta(texturaFrente) {// Função para criar uma carta
    const parteFrente = new THREE.MeshBasicMaterial({ map: texturaFrente });
    const carta = new THREE.Mesh(geometry, parteFrente);
    carta.position.set(10, 1, 10)

    cartasLista.push(carta);    
    return carta;
}

const clock = new THREE.Clock()// Cria um relógio para rastrear o tempo decorrido
// Função de atualização para movimentar a carta após o término do movimento principal
function atualizar() {
  const elapsedTime = clock.getElapsedTime();// Obtém o tempo decorrido desde o último quadro
  
  if (movimentoConcluido) {         // Verifica se o movimento principal já foi concluído
      cartasLista.forEach(carta => {// Faz a carta ficar flutuando apenas após o término do movimento principal
          carta.position.y = Math.sin(elapsedTime * .5) * 0.2 + 0.8;
      });
  }
  renderer.render(scene, camera);// Atualiza a cena
  requestAnimationFrame(atualizar);// Chama a função novamente para o próximo quadro
}
atualizar();


const texturasFrente = [ // Carregar texturas para a parte da frente das cartas
    textureLoader.load('assets/CARTAS/eevee.webp'),
    textureLoader.load('assets/CARTAS/espeon.png'),
    textureLoader.load('assets/CARTAS/flareon.webp'),
    textureLoader.load('assets/CARTAS/glaceon.webp'),
    textureLoader.load('assets/CARTAS/jolteon.webp'),
    textureLoader.load('assets/CARTAS/leafeon.webp'),
    textureLoader.load('assets/CARTAS/umbreon.webp'),
    textureLoader.load('assets/CARTAS/vaporeon.jpg'),
    textureLoader.load('assets/CARTAS/sylveon.webp')
];

// Criar as cartas e adicioná-las à cena
const cartas = texturasFrente.map(textura => {
    const carta = criarCarta(textura);
    scene.add(carta);
    return carta;
});

// CIRCULOS
const geometryCirculo = new THREE.SphereGeometry(0.3, 32, 32);
const simbolosLista = []

function criarSimbolo(texturaSimbolo){
  texturaSimbolo.repeat.x = 2
  const imagemSimbolo = new THREE.MeshBasicMaterial({ map: texturaSimbolo });
  const simbolo = new THREE.Mesh(geometryCirculo, imagemSimbolo);
  simbolo.position.set(0, 2, -5)

  simbolosLista.push(simbolo);
  return simbolo;
}

const texturasSimbolo = [
  textureLoader.load('assets/simbolos/Normal.png'),
  textureLoader.load('assets/simbolos/Water.png'),
  textureLoader.load('assets/simbolos/Electric.png'),
  textureLoader.load('assets/simbolos/Fire.png'),
  textureLoader.load('assets/simbolos/Psychic.png'),
  textureLoader.load('assets/simbolos/Dark.png'),
  textureLoader.load('assets/simbolos/Grass.png'),
  textureLoader.load('assets/simbolos/Ice.png'),
  textureLoader.load('assets/simbolos/Fairy.png'),
]
const simbolos = texturasSimbolo.map(textura => {
  const simbolo = criarSimbolo(textura);
  scene.add(simbolo);
  return simbolo;
});

function simbolosInicial(pagina){
  console.log('teste')
  if(pagina === 1){
    console.log('tela primeira')
    moverModelo(simbolosLista[0], 0, 2, 0.7)
    moverModelo(simbolosLista[1], 0, 3.5, 0.7)
    moverModelo(simbolosLista[2], 1, 3, 0.7)
    moverModelo(simbolosLista[3], 1.5, 2, 0.7)
    moverModelo(simbolosLista[4], 1, 1, 0.7)
    moverModelo(simbolosLista[5], 0, 0.5, 0.7)
    moverModelo(simbolosLista[6], -1, 1, 0.7)
    moverModelo(simbolosLista[7], -1.5, 2, 0.7)
    moverModelo(simbolosLista[8], -1, 3, 0.7)
    simbolosLista.forEach(simbolo =>{
      simbolo.rotation.y = 0
      simbolo.rotation.x = 0
    })
  }
  if(pagina === 2){
    console.log('tela segunda')
    simbolosLista.forEach(simbolo =>{
      moverModelo(simbolo, -6, -5, 0.7)
      simbolo.rotation.y = 0.5
      simbolo.rotation.x = -0.2
    })
  }
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

const esferasLista = []

const esfera1 = new Esfera(0.03, 32, 0xff0000);
scene.add(esfera1);
esfera1.mudarCor('yellow');
esferasLista.push(esfera1)

const esfera2 = new Esfera(0.03, 32, 0xff0000);
scene.add(esfera2);
esfera2.mudarCor('yellow');
esferasLista.push(esfera2)

let angulo = 0.0
let anguloVelocidade = 0.0
let raio = 3
function movimentarEsferas(opcao) {
  // Define um limite de velocidade
  const limiteVelocidade = 0.002;
  // Verifica se a velocidade atual é menor que o limite
  if (anguloVelocidade < limiteVelocidade) {
    // Incrementa a velocidade
    anguloVelocidade += 0.001;
  }
  // Atualiza o ângulo com base na velocidade
  angulo += anguloVelocidade;
  esfera1.position.x = raio*Math.cos(angulo)
  esfera1.position.z = raio*Math.sin(angulo)
  
  esfera2.position.x = raio*Math.cos(-angulo)
  esfera2.position.z = raio*Math.sin(-angulo)
  if(opcao === 1){
    console.log('subindo')
    esfera1.position.y = 0.5
    esfera2.position.y = 0.5
  }else if(opcao === 2){
    console.log('descendo')
    esfera1.position.y = -10
    esfera2.position.y = -10
  }

  renderer.render(scene, camera);
  requestAnimationFrame(movimentarEsferas);
}


document.addEventListener('keydown', (event) => {
  console.log(event)
  if(event.key === 'ArrowLeft'){
    cartasLista.forEach(carta => {
      carta.rotation.y += -0.1
    })
    modelosLista.forEach(modelo => {
      modelo.rotation.y += -0.1
    })
    ground.rotation.y += -0.1
    ground2.rotation.y += -0.1
  }
  if(event.key === 'ArrowRight'){
    cartasLista.forEach(carta => {
      carta.rotation.y += 0.1
    })
    modelosLista.forEach(modelo => {
      modelo.rotation.y += 0.1
    })
    ground.rotation.y += 0.1
    ground2.rotation.y += 0.1
  }
  
});
// ANIMAÇÃO

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    angulo += 0.05
    
    minhaLuz1.position.set(raio*Math.cos(angulo),1, raio*Math.sin(angulo))
    minhaluz2.position.set(raio*Math.cos(-angulo),1, raio*Math.sin(-angulo))
    minhaluz3.position.set(0, 5*Math.cos(angulo), 5*Math.sin(angulo))
    
    
}
animate();
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
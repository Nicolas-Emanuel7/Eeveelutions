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
scene.castShadow = true;
scene.receiveShadow = true;
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 2.2, 7);
scene.add(camera);

// Inicializa a variável scrollY com o valor atual do scroll vertical da janela
let scrollY = window.scrollY
// Inicializa a variável currentSection com o valor 0, representando a seção atual da página
let currentSection = 0

// SEÇÕES DA PÁGINA /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QQQQQ
const body = document.body;

// Seleciona o elemento HTML com a classe 'loading-bar'
const loadingBarElement = document.querySelector('.loading-bar')

// Cria um novo LoadingManager do Three.js
const loadingManager = new THREE.LoadingManager(
  // Função a ser executada quando todos os recursos estiverem carregados
  () => {
      // Define um timeout para executar um conjunto de ações após 500 milissegundos
      window.setTimeout(() => {
          // Faz uma animação de fade out no elemento de sobreposição usando GSAP
          gsap.to(overlayMaterial.uniforms.uAlpha, {
              duration: 3,
              value: 0,
              delay: 1
          })
          // Adiciona a classe 'ended' ao elemento de barra de carregamento
          loadingBarElement.classList.add('ended')
          // Adiciona a classe 'loaded' ao elemento <body>
          body.classList.add('loaded')
          // Reseta a transformação CSS da barra de carregamento
          loadingBarElement.style.transform = ''
      }, 500)
  },
  // Função a ser executada a cada vez que um item é carregado
  (itemUrl, itemsLoaded, itemsTotal) => {
      // Exibe no console a URL do item, a quantidade de itens carregados e o total de itens
      console.log(itemUrl, itemsLoaded, itemsTotal)
      // Calcula a proporção de progresso do carregamento e atualiza a barra de carregamento
      const progressRatio = itemsLoaded / itemsTotal
      loadingBarElement.style.transform = `scaleX(${progressRatio})`
      console.log(progressRatio)
  },
  // Função a ser executada em caso de erro durante o carregamento
  () => {
      console.log('Erro ao carregar os recursos')
  }
)

// Cria uma geometria plana para representar a sobreposição
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)

// Cria um material para a sobreposição usando shaders
const overlayMaterial = new THREE.ShaderMaterial({
    // Define o vertex shader
    vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `,
    // Define o fragment shader
    fragmentShader: `
        uniform float uAlpha;
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `,
    // Define os uniforms (variáveis uniformes do shader)
    uniforms: {
        uAlpha: { value: 1.0 } // Define o valor inicial da transparência
    },
    transparent: true // Define o material como transparente
})

// Cria um objeto Mesh usando a geometria e o material criados anteriormente
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)

// Adiciona a sobreposição à cena
scene.add(overlay)

// Objeto que mapeia o número da seção para a função que será executada
const sectionActions = {
  0: () => {
      // Ação para a seção 0
      
      telaInicial(1)
      
      body.style.background = 'linear-gradient(45deg, #f9ffa5, #43e0ff, #eafa57, #6bb0ff, #9bff19)';

  },
  1: () => {
      // Ação para a seção 1
      
      telaInicial(2)

      moverModelo(cartasLista[0], 6, 1, 1.5)
      moverModelo(cartasLista[7], 10, 1, 10)

      moverModelo(ground, 0, -0.1, 0)
      moverModelo(ground2, 0, -0.2, 0)
      moverModelo(eeveeModel, 0, 0, 0)
      moverModelo(vaporeonModel, 25, 0, 0);

      body.style.background = 'linear-gradient(45deg, #fae3be, #f0cd96, #d5af70)';

  },
  2: () => {
      // Ação para a seção 2
      moverModelo(cartasLista[0], 10, 1, 10)
      moverModelo(cartasLista[7], 6, 1, 1.5)
      moverModelo(cartasLista[4], 10, 1, 10)

      moverModelo(eeveeModel, -25, 0, 0)
      moverModelo(vaporeonModel, 0, 0, 0);
      moverModelo(jolteonModel, -25, 0, 0);

      body.style.background = 'linear-gradient(15deg, #d6f8ff, #90deee, #60c9df)';

  },
  3: () => {
      // Ação para a seção 3
      moverModelo(cartasLista[7], 10, 1, 10)
      moverModelo(cartasLista[4], 6, 1, 1.5)
      moverModelo(cartasLista[2], 10, 1, 10)

      moverModelo(jolteonModel, 0, 0, 0);
      moverModelo(vaporeonModel, 25, 0, 0);
      moverModelo(flareonModel, 25, 0, 0);

      body.style.background = '#ffff71';

  },
  4: () => {
      // Ação para a seção 4
      moverModelo(cartasLista[4], 10, 1, 10)
      moverModelo(cartasLista[2], 6, 1, 1.5)
      moverModelo(cartasLista[1], 10, 1, 10)

      moverModelo(jolteonModel, -25, 0, 0);
      moverModelo(flareonModel, 0, 0.15, 0)
      moverModelo(espeonModel, -25, 0, 0);

      body.style.background = '#F7E8A1';


  },
  5: () => {
      // Ação para a seção 5
      moverModelo(cartasLista[2], 10, 1, 10)
      moverModelo(cartasLista[1], 6, 1, 1.5)
      moverModelo(cartasLista[6], 10, 1, 10)

      moverModelo(flareonModel, 25, 0, 0)
      moverModelo(espeonModel, 0, 0.05, 0)
      moverModelo(umbreonModel, 25, 0, 0);

      body.style.background = '#E4CDDD';


  },
  6: () => {
      // Ação para a seção 6
      moverModelo(cartasLista[1], 10, 1, 10)
      moverModelo(cartasLista[6], 6, 1, 1.5)
      moverModelo(cartasLista[5], 10, 1, 10)

      moverModelo(espeonModel, -25, 0, 0)
      moverModelo(umbreonModel, 0, 0, 0)
      moverModelo(leafeonModel, -25, 0, 0);

      body.style.background = '#efcb69';


  },
  7: () => {
      // Ação para a seção 7
      moverModelo(cartasLista[6], 10, 1, 10)
      moverModelo(cartasLista[5], 6, 1, 1.5)
      moverModelo(cartasLista[3], 10, 1, 10)

      moverModelo(umbreonModel, 25, 0, 0)
      moverModelo(leafeonModel, 0, 0, 0)
      moverModelo(glaceonModel, 25, 0, 0);

      body.style.background = '#FAE9B9';

  },
  8: () => {
      // Ação para a seção 8
      moverModelo(cartasLista[5], 10, 1, 10)
      moverModelo(cartasLista[3], 6, 1, 1.5)
      moverModelo(cartasLista[8], 10, 1, 10)

      moverModelo(leafeonModel, -25, 0, 0)
      moverModelo(glaceonModel, 0, 0, 0)
      moverModelo(sylveonModel, -25, 0, 0);

      body.style.background = '#DFF6F0';

  },
  9: () => {
      // Ação para a seção 9
      moverModelo(cartasLista[3], 10, 1, 10)
      moverModelo(cartasLista[8], 6, 1, 1.5)

      moverModelo(glaceonModel, 25, 0, 0)
      moverModelo(sylveonModel, 0, 0, 0)

      moverModelo(ground, 0, -0.1, 0)
      moverModelo(ground2, 0, -0.2, 0)

      movimentarEsferas(1);

      body.style.background = '#ffdae3';

      telaInicial(2)
  },
  10: () => {
      // Ação para a seção 10
      telaInicial(1)

      moverModelo(cartasLista[8], 10, 1, 10)

      moverModelo(ground, 0, -10, 0)
      moverModelo(ground2, 0, -10, 0)
      moverModelo(sylveonModel, 0, -10, 0)

      movimentarEsferas(2);
      
      body.style.background = '#f3d5a5';
  }
  // Adicione mais pares chave-valor conforme necessário para cada seção
};

function mudarCamera(posX, posY, posZ, alvoX, alvoY, alvoZ){
  const duracaoAnimacao = 1;

  gsap.to(camera.position, { duration: duracaoAnimacao, ease: 'power2.inOut', x: posX, y: posY, z: posZ });
  gsap.to(camera.rotation, { duration: duracaoAnimacao, ease: 'power2.inOut', x: alvoX, y: alvoY, z: alvoZ });
}

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
  // método para atualizar a intensidade da luz
  atualizarIntensidade(intensidade) {
      this.luz.intensity = intensidade;
  }
}

// Crie uma instância da classe MinhaLuz
const minhaLuz1 = new MinhaLuz(0xffffff, 3);
const minhaluz2 = new MinhaLuz(0xffffff, 3);
const minhaluz3 = new MinhaLuz(0xffffff, 6);
scene.add(minhaLuz1);
scene.add(minhaluz2);
scene.add(minhaluz3);

const luzDirecional = new THREE.DirectionalLight(0xffffff, 1.5);
luzDirecional.position.set(0, 1, 3);
luzDirecional.castShadow = true;
scene.add(luzDirecional);


// Modelos

const modelosLista = []

function carregarModelos(){
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

  const EeveeInicial = new GLTFLoader(loadingManager);
  EeveeInicial.load('/assets/eevee/scene.gltf', (eeveeInicial) => {
    eeveeInicial.scene.scale.set(2,2,2);
    scene.add(eeveeInicial.scene);
    eeveeInicial.scene.castShadow = true;
    eeveeModel2 = eeveeInicial.scene;
    eeveeModel2.position.set(-0.3, 0.9, 4.8);
    eeveeModel2.rotation.y = -0.7
   
  });
}

var eeveeModel, espeonModel, flareonModel, glaceonModel, jolteonModel, leafeonModel, sylveonModel, umbreonModel, vaporeonModel, eeveeModel2;
carregarModelos()

// tela inicial modelos
// florestinha
var florestaModel;
const Floresta = new GLTFLoader(loadingManager);
  Floresta.load('/assets/cenario3/scene.gltf', (floresta) => {
  floresta.scene.scale.set(0.0050,0.0050,0.0050);
  scene.add(floresta.scene);
  floresta.scene.castShadow = true
  floresta.scene.position.set(0,0.8,3);
  floresta.scene.rotation.y = 3
  florestaModel = floresta.scene;
});

// NUVEM
const nuvensLista = []; // Lista para armazenar as instâncias das nuvens

// Função para carregar o modelo da nuvem
function carregarNuvem() {
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
// Chamar a função para carregar a nuvem
carregarNuvem();

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



function telaInicial(pagina){
  console.log('teste')
  if(pagina === 1){
    console.log('tela primeira')

    cartasLista.forEach(carta => {
      moverModelo(carta, 10, 1, 10);
    })
    movimentarEsferas(2);

    moverModelo(ground, 0, -10, 0)
    moverModelo(ground2, 0, -10, 0)
    moverModelo(eeveeModel, 0, -10, 0)

    moverModelo(florestaModel, 0,0.8,3)
    moverModelo(eeveeModel2, -0.3, 0.9, 4.8)

    minhaLuz1.atualizarIntensidade(0)
    minhaluz2.atualizarIntensidade(0)
    minhaluz3.atualizarIntensidade(0)
    
    mudarCamera(-1,1.5, 5.7,-0.1,-0.1,0)

    luzDirecional.intensity = 2.5

    animarFundo(2);
  }
  if(pagina === 2){
    console.log('tela segunda')
    
    movimentarEsferas(1);

    mudarCamera(0,2.2, 7,0,0,0)
    moverModelo(florestaModel, 0, 13,0)
    moverModelo(eeveeModel2, 0, 13,0)

    minhaLuz1.atualizarIntensidade(2)
    minhaluz2.atualizarIntensidade(2)
    minhaluz3.atualizarIntensidade(4)

    luzDirecional.intensity = 1.5

    animarFundo(1);
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

// ESTRELA CADENTE
const estrelasLista = []; // Lista para armazenar as instâncias das estrelas

// Função para carregar o modelo da estrela
function carregarEstrela() {
  for(let i = 0; i < 15; i++){
    const estrela = new Esfera(0.03, 16, Math.random() * 0xffffff);
    estrela.position.set(Math.random() * 30 - 20, Math.random() * 20 + 10, Math.random() * 10 - 15);
    scene.add(estrela);
    estrelasLista.push(estrela); 
  }
}
carregarEstrela();

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

// rotaciona o modelo e a carta para esquerda ou direirta
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

let animacaoEmAndamento = false;

function animarFundo(opcao){
  if(opcao === 1 && !animacaoEmAndamento){
    console.log('animando')
    animacaoEmAndamento = true;

    function animacao(){
      estrelasLista.forEach(estrela => {
        estrela.position.y -= 0.05;
        estrela.position.x += Math.random() * 0.01 + 0.02;
        estrela.position.z += Math.random() * 0 + 0.01;
        if (estrela.position.y < -10) {
          estrela.position.set(Math.random() * 30 - 20, Math.random() * 20 + 10, Math.random() * 10 - 15);
        }
      });

      nuvensLista.forEach(nuvem => {
        nuvem.position.x += Math.random() * 0.006 + 0.005;
        nuvem.position.z += Math.random() * 0.001 + 0.001;
        if (nuvem.position.x > 25) {
          nuvem.position.x = Math.random() * 40 - 30;
          nuvem.position.z = Math.random() * 10 - 15;
        }
      });

      renderer.render(scene, camera);

      if (animacaoEmAndamento) {
        requestAnimationFrame(animacao);
      }
    }
    animacao();
  }
  else if(opcao === 2){
    console.log('parando')
    animacaoEmAndamento = false;
  }
}

// PARTICULAS 
class Particulas {
  constructor(scene) {
      this.scene = scene;
      this.geometry = new THREE.BufferGeometry();
      this.material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.010 });
      this.particleSystem = new THREE.Points(this.geometry, this.material);
      this.scene.add(this.particleSystem);
  }

  criarParticula(contador) {
      const positions = [];

      for (let i = 0; i < contador; i++) {
          positions.push(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
      }

      const attributePosition = new THREE.Float32BufferAttribute(positions, 3);
      this.geometry.setAttribute('position', attributePosition);
  }

  mudarCor(cor) {
      this.material.color.set(cor);
  }

  mudarVelocidade(velocidade) {
      this.speed = velocidade;
  }

  atualizar() {
      const positions = this.geometry.attributes.position.array;
      const numParticulas = positions.length / 3; // Número total de partículas
      const raioParticula = 3.2; // Raio do círculo

      console.log(this.speed);

      for (let i = 0; i < positions.length; i += 3) {
          const anguloParticula = this.speed * i / 10; // Calcula o ângulo com base na velocidade e no índice
          positions[i] = raioParticula * Math.cos(anguloParticula); // Calcula a posição x
          positions[i + 1] = Math.random() * 0.4 - 0.3; // Mantém a posição y aleatória
          positions[i + 2] = raioParticula * Math.sin(anguloParticula); // Calcula a posição z
      }

      this.geometry.attributes.position.needsUpdate = true;
  }

}

const funcaoParticulas = new Particulas(scene)
funcaoParticulas.criarParticula(10000);
funcaoParticulas.mudarCor('yellow')
funcaoParticulas.mudarVelocidade(0.01)


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    angulo += 0.05
    
    minhaLuz1.position.set(raio*Math.cos(angulo),1, raio*Math.sin(angulo))
    minhaluz2.position.set(raio*Math.cos(-angulo),1, raio*Math.sin(-angulo))
    minhaluz3.position.set(0, 5*Math.cos(angulo), 5*Math.sin(angulo))

    funcaoParticulas.atualizar()
    
}
animate();
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
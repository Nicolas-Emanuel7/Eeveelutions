/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Loaders
 */
// Seleciona o elemento HTML com a classe 'loading-bar'
const loadingBarElement = document.querySelector('.loading-bar')
// Seleciona o elemento <body> do documento HTML
const bodyElement = document.querySelector('body')

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
            bodyElement.classList.add('loaded')
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

    }
)

// Cria um carregador de modelos GLTF do Three.js, associado ao LoadingManager
const gltfLoader = new THREE.GLTFLoader(loadingManager)

/**
 *  Textures
 */
// Cria um carregador de texturas do Three.js
const textureLoader = new THREE.TextureLoader()
// Carrega uma textura de sombra simples usando o carregador de texturas
const alphaShadow = textureLoader.load('/assets/texture/simpleShadow.jpg');

// Scene
// Cria uma nova cena 3D
const scene = new THREE.Scene()

// Cria uma sombra da esfera usando um plano
const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5), // Define a geometria do plano (largura e altura)
    new THREE.MeshBasicMaterial({ // Define o material da sombra
        transparent: true, // Permite que a sombra seja transparente
        color: 0x000000, // Cor preta
        opacity: 0.5, // Opacidade da sombra
        alphaMap: alphaShadow // Define uma textura para controlar a transparência
    })
)

// Rotaciona a sombra para que fique plana no chão
sphereShadow.rotation.x = -Math.PI * 0.5

// Define a posição da sombra no espaço 3D
sphereShadow.position.y = -1 // Posiciona abaixo do donut
sphereShadow.position.x = 1.5 // Desloca horizontalmente para a direita

// Adiciona a sombra à cena
scene.add(sphereShadow)

/**
 * Overlay
 */
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


/**
 * GLTF Model
 */
// Declara uma variável chamada "donut" e inicializa como null
let donut = null

// Carrega um modelo GLTF usando o carregador gltfLoader
gltfLoader.load(
    './assets/scene.gltf', // URL do arquivo GLTF
    (gltf) => { // Função de callback executada quando o modelo é carregado com sucesso
        console.log(gltf); // Exibe o objeto gltf no console

        // Atribui o objeto "scene" do GLTF carregado à variável "donut"
        donut = gltf.scene

        // Define o raio do donut
        const radius = 8.5

        // Define a posição inicial do donut no eixo x
        donut.position.x = 1.5;

        // Define a rotação inicial do donut nos eixos x e z
        donut.rotation.x = Math.PI * 0.2
        donut.rotation.z = Math.PI * 0.15

        // Define a escala do donut
        donut.scale.set(radius, radius, radius)

        // Adiciona o donut à cena
        scene.add(donut)
    },
    (progress) => { // Função de callback para monitorar o progresso do carregamento
        console.log(progress); // Exibe o progresso do carregamento no console
    },
    (error) => { // Função de callback para lidar com erros de carregamento
        console.error(error); // Exibe o erro no console
    }
)

/**
 * Light
 */
// Cria uma luz ambiente com cor branca e intensidade 0.8
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
// Adiciona a luz ambiente à cena
scene.add(ambientLight)

// Cria uma luz direcional com cor branca e intensidade 1
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// Define a posição da luz direcional
directionalLight.position.set(1, 2, 0)

// Ativa a capacidade de emitir sombras para a luz direcional
directionalLight.castShadow = true

// Adiciona a luz direcional à cena
scene.add(directionalLight)

/**
 * Sizes
 */
// Define o tamanho da janela do navegador
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Scroll
 */
// Inicializa a variável scrollY com o valor atual do scroll vertical da janela
let scrollY = window.scrollY
// Inicializa a variável currentSection com o valor 0, representando a seção atual da página

// Define um array de transformações para o donut em diferentes seções
const transformDonut = [{
        rotationZ: 0.45,
        positionX: 1.5
    },
    {
        rotationZ: -0.45,
        positionX: -1.5
    },
    {
        rotationZ: 0.0314,
        positionX: 0
    },
    {
        rotationZ: 0.0314,
        positionX: 0
    },
]

// Adiciona um listener de evento de scroll à janela
window.addEventListener('scroll', () => {
    // Atualiza a variável scrollY com o valor atual do scroll vertical da janela
    scrollY = window.scrollY
    // Calcula a nova seção com base na posição do scroll e na altura da janela
    const newSection = Math.round(scrollY / sizes.height)

    // Exibe no console a nova seção
    console.log(newSection);

    // Verifica se a nova seção é diferente da seção atual
    if (newSection != currentSection) {
        // Atualiza a seção atual com a nova seção
        currentSection = newSection

        // Verifica se o donut está carregado e não é nulo (!! operador verifica se o donut é truthy)
        if (!!donut) {
            // Anima a rotação do donut para a rotação definida na nova seção
            gsap.to(
                donut.rotation, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    z: transformDonut[currentSection].rotationZ
                }
            )
            // Anima a posição do donut para a posição definida na nova seção
            gsap.to(
                donut.position, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: transformDonut[currentSection].positionX
                }
            )

            // Anima a posição da sombra da esfera para a posição definida na nova seção
            gsap.to(
                sphereShadow.position, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: transformDonut[currentSection].positionX - 0.2
                }
            )
        }
    }
})

/**
 * Camera
 */
// Cria uma câmera de perspectiva com uma abertura de 35 graus, uma razão de aspecto baseada no tamanho da janela e uma distância de visão entre 0.1 e 1000 unidades.
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000)
// Define a posição inicial da câmera ao longo do eixo z
camera.position.z = 5

// Adiciona a câmera à cena
scene.add(camera)

/**
 * Renderer
 */
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

/**
 * Animate
 */
// Cria um relógio para rastrear o tempo decorrido
const clock = new THREE.Clock()
// Inicializa a variável lastElapsedTime com 0
let lastElapsedTime = 0

// Função que será chamada a cada quadro de animação
const tick = () => {
    // Obtém o tempo decorrido desde o último quadro
    const elapsedTime = clock.getElapsedTime()
    // Calcula o tempo decorrido desde o último quadro
    const deltaTime = elapsedTime - lastElapsedTime
    // Atualiza a variável lastElapsedTime com o tempo atual
    lastElapsedTime = elapsedTime

    // Verifica se o donut está carregado e não é nulo (!! operador verifica se o donut é truthy)
    if (!!donut) {
        // Anima a posição vertical do donut com base no tempo decorrido
        donut.position.y = Math.sin(elapsedTime * .5) * .1 - 0.1
        // Define a opacidade da sombra da esfera com base na posição vertical do donut
        sphereShadow.material.opacity = (1 - Math.abs(donut.position.y)) * 0.3
    }

    // Renderiza a cena usando o renderizador e a câmera atual
    renderer.render(scene, camera)

    // Solicita ao navegador que chame novamente a função tick no próximo quadro de animação
    window.requestAnimationFrame(tick)
}

// Chama a função tick para iniciar a animação
tick()

/**
 * On Reload
 */
// Define um comportamento para rolar a página para o topo ao recarregar a página
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
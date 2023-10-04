let trex, trex_running;
let groundImage;
//AULA 12- CRIAR a variável que guarda a imagem de nuvem
let cloudImage;


// Vamos carregar nossa animação para nosso sprite Trex na
// função preload() e na função preload definiremos nossa
// animação usando a função loadAnimation().
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png"); //Usando loadAnimation() para carregar as animações na função de pré-carregamento, você pode carregar várias imagens em uma única variável para torná-la animada.
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  //AULA 13 CRIAR AS VARIÁVEIS QUE GUARDAM AS IMAGENS
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

}


function setup() {// (configuração inicial)
  createCanvas(600, 200);
  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("correndo", trex_running); //"correndo": É uma string que identifica a animação que está sendo adicionada. É uma variável ou objeto que contém os dados da animação de "correndo" (ou seja, as fotos)
  edges = createEdgeSprites();

  trex.scale = 0.5;
  trex.x = 50;

  ground = createSprite(200, 180, 400, 20);
  ground.velocityX = -2;
  //aula 11
  ground.addImage(groundImage); // Adicione a imagem ao sprite do solo
  ground.x = ground.width / 2;  //está posicionando o objeto na metade denovo

  //criando um solo invisível
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;


}


function draw() { // (Atualização contínua)
  background("black");
  if (keyDown("space") && trex.y >= 100) {
    trex.velocityY = -10; //Esse bloco de código dentro do if será executado apenas se ambas as condições (keyDown("space") e trex.y >= 100) forem verdadeiras simultaneamente, ou seja, se a tecla "espaço" estiver sendo pressionada e a posição vertical do trex for maior ou igual a 100 pixels.
  }

  trex.velocityY = trex.velocityY + 0.5;
  trex.collide(invisibleGround);




  // Reposicione o solo quando ele sair da tela
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  //AULA 12
  spawnClouds();
  spawnObstacles();
  drawSprites();
}

function spawnObstacles() {

  if (frameCount % 60 === 0) {
    let obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -3

    //gerar obstaculos aleatorios
    let rand =Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;

      case 2: obstacle.addImage(obstacle2);
      break;

      case 3: obstacle.addImage(obstacle3);
      break;

      case 4: obstacle.addImage(obstacle4);
      break;

      case 5: obstacle.addImage(obstacle5);
      break;

      case 6: obstacle.addImage(obstacle6);
      break;

      default: break;
    }

  }
}

function spawnClouds() {
  //Vamos escrever o código para criar apenas um pequeno sprite de nuvem. Gere-o fora da tela e dê a ele alguma velocidade x para que pareça estar em movimento.
  if (frameCount % 60 === 0) {

    cloud = createSprite(600, 100, 40, 10); //Agora todas as nossas nuvens têm a mesma altura. Vamos torná-las mais aleatórias
    cloud.y = Math.round(random(1, 100));
    cloud.velocityX = -3;
    cloud.addImage(cloudImage);
    cloud.scale = 0.4;
    //atribuindo tempo de vida á variável.
    cloud.lifetime = 200;

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    console.log(trex.depth);
    console.log(cloud.depth);
  }
}


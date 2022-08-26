const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var rabbitSprite;
var botton

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  rabbitSprite = createSprite(250,650)
  rabbitSprite.addImage(rabbit)
  rabbitSprite.scale = 0.2
  
  botton = createImg("cut_button.png") //cria o boatao de imagem
  botton.position(220,30) //posicao do botao
  botton.size(50,50) //tamanho da imagem(botao)
  botton.mouseClicked(Drop) //faz o botao funcionar

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);

  image(food,fruit.position.x,fruit.position.y,70,70);
  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();
}


function Drop(){ //Funcao para cortar a corda
  rope.break() //quebra a corda
  fruit_con.detach(); //separa a fruta da corda
  fruit_con = null; //ele faz com que a restricao de frutas fique nula
}

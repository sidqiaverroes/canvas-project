import './style.css'
import { resources } from './Resource';
import { Sprite } from './Sprite';
import { Vector2 } from './Vector2';
import { GameLoop } from './GameLoop';
import { Input, DOWN, UP, LEFT, RIGHT } from './Input';
import { gridCells } from './helpers/grid';
import { moveTowards } from './helpers/moveTowards';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky, 
  frameSize: new Vector2(320, 180),
})

const groundSprite = new Sprite({
  resource: resources.images.ground, 
  frameSize: new Vector2(320, 180),
})

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(5)),
})

const heroDestinationPosition =  hero.position.duplicate();

const shadow = new Sprite({
  resource: resources.images.shadow, 
  frameSize: new Vector2(32, 32),
})

const input = new Input();

const update = () => {

  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <= 1;
  if(hasArrived){
    tryMove()
  }

  return;
}

const tryMove = () => {
  if(!input.direction){
    return;
  }

  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  const gridSize = 16;

  if(input.direction === DOWN) {
    nextY += gridSize;
    hero.frame = 0;
  }
  if(input.direction === UP) {
    nextY -= gridSize;
    hero.frame = 6;
  }
  if(input.direction === LEFT) {
    nextX -= gridSize;
    hero.frame = 9;
  }
  if(input.direction === RIGHT) {
    nextX += gridSize;
    hero.frame = 3;
  }

  //TODO - check if that space is free
  heroDestinationPosition.x = nextX;
  heroDestinationPosition.y = nextY
}

const draw  = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  //center the hero in the cell
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();

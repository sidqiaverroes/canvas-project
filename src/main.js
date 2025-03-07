import './style.css'
import { resources } from './Resource';
import { Sprite } from './Sprite';
import { Vector2 } from './Vector2';
import { GameLoop } from './GameLoop';
import { Input, DOWN, UP, LEFT, RIGHT } from './Input';
import { gridCells } from './helpers/grid';
import { GameObject } from './GameObject';
import { Hero } from './objects/Hero/Hero';
import { events } from './Events';
import { Camera } from './Camera';

//grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

//establish the root scene
const mainScene = new GameObject({
  position: new Vector2(0,0)
})

//build up the scene
const skySprite = new Sprite({
  resource: resources.images.sky, 
  frameSize: new Vector2(320, 180),
})

const groundSprite = new Sprite({
  resource: resources.images.ground, 
  frameSize: new Vector2(320, 180),
})
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

//add an input class to the main scene
mainScene.input = new Input();

//establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
}

const draw  = () => {

  //clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  skySprite.drawImage(ctx, 0, 0)

  //save the current state for camera offset
  ctx.save();

  //offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  //draw objects in the mounted scene
  mainScene.draw(ctx, 0, 0);

  //restore to original state
  ctx.restore();
}

//start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();

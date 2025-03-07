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
mainScene.addChild(skySprite);

const groundSprite = new Sprite({
  resource: resources.images.ground, 
  frameSize: new Vector2(320, 180),
})
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

//add an input class to the main scene
mainScene.input = new Input();

events.on("HERO_POSITION", mainScene, heroPosition => {
  console.log("HERO MOVED!", heroPosition);
})

//establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
}

const draw  = () => {
  mainScene.draw(ctx, 0, 0);
}

//start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();

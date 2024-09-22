import GameManager from "./Scripts/Manager/GameManager.js";
import DrawManager from "./Scripts/Manager/DrawManager.js";
import InputManager from "./Scripts/Manager/InputManager.js";
import AnimalManager from "./Scripts/Manager/AnimalManager.js";
import CollisionManager from "./Scripts/Manager/CollisionManager.js";
import UIManager from "./Scripts/ui/UIManager.js";
import Button from "./Scripts/ui/Button.js";
import TextLabel from "./Scripts/ui/TextLabel.js";
import { animalData } from "./Scripts/data/animalData.js";

"use strict";

let canvas;
let context;
let gameManager, drawManager, inputManager, animalManager, collisionManager, uiManager;
let canvasWidth, canvasHeight;
let rectWidth = 500;
let rectHeight = 400;
let rectX, rectY;
let animalList;
let isPause, isGameOver;
let pauseButton;
let scoreText, bestScoreText;
window.onload = init;

function init() {
    setupCanvas();
    setupGameComponents();
    setupButton();
    setupText();
    startGameLoop();
}

function setupCanvas() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    rectX = 0;
    rectY = (canvasHeight - rectHeight) / 2;
}

function setupGameComponents() {
    animalManager = new AnimalManager(context);
    gameManager = new GameManager(animalManager);
    drawManager = new DrawManager(context);
    uiManager = new UIManager(context, rectX, rectY, rectWidth, rectHeight);
    animalList = animalManager.animalList;

    collisionManager = new CollisionManager(context, animalList, rectX, rectY, rectWidth, rectHeight);
    animalManager.startHoldingAnimal();
    
    inputManager = new InputManager(context, canvas, animalManager.getCurrentAnimal(), animalManager, rectX, rectY, rectWidth, rectHeight);
}

function setupButton() {
    pauseButton = new Button(context, rectWidth - 50, 0, 50, 50, "", "./Asset/Image/Button/Settings.png", ShowPausePanel);
    pauseButton.addEventListeners();
}

function setupText(){
    scoreText = new TextLabel(context, 5, 5, 150, 35, "Score: ", "./Asset/Image/Shape/Rectangle.png");
    bestScoreText = new TextLabel(context, 5, scoreText.y + 40 , 150, 35, "Best Score: ", "./Asset/Image/Shape/Rectangle.png");
}

function ShowPausePanel() {
    gameManager.setIsGamePause(true);
}

let secondsPassed = 0;
let oldTimeStamp = 0;

function gameLoop(timeStamp) {
    if(gameManager.getIsGameStart()){
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
        isPause = gameManager.getIsGamePause();
        isGameOver = gameManager.getIsGameOver();

        if (!isPause && !isGameOver) {
            updateAnimals(secondsPassed);
            collisionManager.detectEdgeCollisions();
            collisionManager.detectCollisions();
            collisionManager.checkLoseCondition();
        }  
        drawGame();

        if(isPause){
            uiManager.createPauseScreen();
        }
        if(isGameOver){
            uiManager.createLoseScreen();
        }
    }else{
        uiManager.createMenuScreen();
    }

    window.requestAnimationFrame(gameLoop);
}

function updateAnimals(secondsPassed) {
    for (let animal of animalList) {
        if (animal.useGravity) {
            animal.update(secondsPassed);
        }
    }
}

function drawGame() {
    drawManager.clearAnimals(animalList);
    drawManager.drawBackground();
    drawManager.drawBox(rectX, rectY, rectWidth, rectHeight, "./Asset/Image/Background/bg.png");
    inputManager.drawDropline();
    
    for (let animal of animalList) {
        if (animal.useGravity) {
            animal.draw();
        }
    }

    drawButton();
    drawText();
}

function drawButton(){
    pauseButton.draw();
}

function drawText(){
    scoreText.draw();
    scoreText.updateText(`Score: ${gameManager.getScore()}`);
    bestScoreText.draw();
    bestScoreText.updateText(`Best Score: ${gameManager.bestScore}`);
}

function startGameLoop() {
    window.requestAnimationFrame(gameLoop);
}

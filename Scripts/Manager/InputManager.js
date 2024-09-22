import AnimalManager  from "./AnimalManager.js";
import { animalData } from "../data/animalData.js";
import GameManager from "./GameManager.js";
import SoundManager from "./SoundManager.js";
class InputManager {
    constructor(context ,canvas, currentAnimal, animalManager, rectX, rectY, rectWidth, rectHeight) {
        this.context = context;
        this.canvas = canvas;

        this.mouseX = 0;
        this.mouseY = 0;
        this.rectX = rectX;
        this.rectY = rectY;
        this.rectWidth = rectWidth;
        this.rectHeight = rectHeight;
        this.currentAnimal = currentAnimal;
        this.canDrop = true;
        this.animalManager = animalManager;
        this.gameManager = GameManager.getInstance();
        this.soundManager = new SoundManager('./Asset/Sound/drop sound.mp3');
        this.initEventListeners();
    }

    SetCurrentAnimal(currentAnimal){
        this.currentAnimal = currentAnimal;
    }

    initEventListeners() {
        window.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        window.addEventListener('click', (event) => this.handleClick(event));
    }

    handleMouseMove(event) {
        let rect = this.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;
    }

    handleClick(event) {
        if(this.gameManager.getIsGameOver() || this.gameManager.getIsGamePause()
            || !this.gameManager.getIsGameStart()) return;
        if (!this.canDrop) return;
        if (!(this.mouseX > this.rectX && this.mouseX < this.rectX + this.rectWidth)) return;

        
        if (this.currentAnimal) {
            this.currentAnimal.useGravity = true;
            this.currentAnimal.x = this.mouseX + Math.random() * 10;
            this.currentAnimal.y = this.rectY - this.rectHeight / 4;

            this.currentAnimal = null;
            this.canDrop = false;

            this.soundManager.playEffect();

            setTimeout(() => {
                this.canDrop = true;
            }, 400);

            this.animalManager.startHoldingAnimal();
            this.SetCurrentAnimal(this.animalManager.getCurrentAnimal());
        }
    }

    drawDropline() {
        if(this.gameManager.getIsGameOver() || this.gameManager.getIsGamePause()) return;
        let gradient = this.context.createLinearGradient(this.mouseX, this.rectY - this.rectHeight / 4, this.mouseX, this.rectY - this.rectHeight / 4 + 200);
        gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        this.context.strokeStyle = gradient;
        this.context.setLineDash([5, 10]);

        this.context.beginPath();
        this.context.moveTo(this.mouseX, this.rectY - this.rectHeight / 4 + 20);
        this.context.lineTo(this.mouseX, this.rectY - this.rectHeight / 4 + 200);
        this.context.lineWidth = 1;
        this.context.stroke();
        this.context.setLineDash([]);

        if (this.currentAnimal) {
            let img = new Image();
            let animalType = this.currentAnimal.type;
            img.src = `./Asset/Image/Animal/${animalData[animalType].image}`;
            this.context.drawImage(img, this.mouseX - animalData[animalType].radius, this.rectY - this.rectHeight / 4, animalData[animalType].radius * 2, animalData[animalType].radius * 2);
        }
    }

    removeEventListeners() {
        window.removeEventListener('mousemove', (event) => this.handleMouseMove(event));
        window.removeEventListener('click', (event) => this.handleClick(event));
    }
}

export default InputManager;

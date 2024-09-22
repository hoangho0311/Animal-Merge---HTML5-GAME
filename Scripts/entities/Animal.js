import { animalData } from '../data/animalData.js';
import GameObject from './gameObject.js';
const g = 9.81;

class Animal extends GameObject
{
    constructor (context, x, y, vx, vy, radius, type, score, useGravity = false, checkLose = false){
        super(context, x, y, vx, vy);
        this.radius = radius;
        this.type = type;
        this.score = score;
        this.useGravity = useGravity;
        this.checkLose = checkLose;
        this.angle = 0;
    }

    draw(){
        let maxFrame = Animal.numColumns * Animal.numRows - 1;

        if (this.currentFrame > maxFrame){
            this.currentFrame = maxFrame;
        }
        // Set the origin to the center of the Animal, rotate the context, move the origin back
        // this.context.translate(this.x, this.y);
        // this.context.rotate(Math.PI / 180 * (this.angle + -90));
        // this.context.translate(-this.x, -this.y);

        let img = new Image();
        img.src = `./Asset/Image/Animal/${animalData[this.type].image}`;
        this.context.drawImage(img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);

        // this.context.setTransform(1, 0, 0, 1, 0, 0);

    }

    update(secondsPassed){
        // Apply acceleration
        if(this.useGravity)
            this.vy += g * 100 * secondsPassed;;

        // Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Calculate the angle
        // let radians = Math.atan2(this.vy, this.vx);
        // this.angle = 180 * radians / Math.PI;

    }
}
export default Animal;




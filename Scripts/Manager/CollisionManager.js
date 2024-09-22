import AnimalManager from "./AnimalManager.js";
import GameManager from "./GameManager.js";
import { animalData } from "../data/animalData.js";
class CollisionManager {
    constructor(context, animalList, rectX, rectY, rectWidth, rectHeight) {
        this.context = context;
        this.animalList = animalList;
        this.rectX = rectX;
        this.rectY = rectY;
        this.rectWidth = rectWidth;
        this.rectHeight = rectHeight;
        this.restitution = 0.4;
        this.gameManager = GameManager.getInstance();
        this.animalManager = new AnimalManager();
        
    }

    detectEdgeCollisions() {
        if(this.gameManager.getIsGameOver() || this.gameManager.getIsGamePause()) return;
        let obj;
        for (let i = 0; i < this.animalList.length; i++) {
            obj = this.animalList[i];

            // Check for left and right
            if (obj.x - obj.radius < this.rectX) {
                obj.vx = Math.abs(obj.vx) * this.restitution;
                obj.x = this.rectX + obj.radius;
            } else if (obj.x + obj.radius > this.rectX + this.rectWidth) {
                obj.vx = -Math.abs(obj.vx) * this.restitution;
                obj.x = this.rectX + this.rectWidth - obj.radius;
            }

            // Check for bottom
            if (obj.y + obj.radius > this.rectY + this.rectHeight) {
                obj.vy = -Math.abs(obj.vy) * 0;
                obj.y = this.rectY + this.rectHeight - obj.radius;
            }
        }
    }

    circleIntersect(x1, y1, r1, x2, y2, r2) {
        // Calculate the distance between the two circles
        let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

        // When the distance is smaller or equal to the sum
        // of the two radii, the circles touch or overlap
        return squareDistance <= ((r1 + r2) * (r1 + r2));
    }

    detectCollisions() {
        let obj1, obj2;

        for (let i = 0; i < this.animalList.length; i++) {
            obj1 = this.animalList[i];
            for (let j = i + 1; j < this.animalList.length; j++) {
                obj2 = this.animalList[j];

                if (this.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    if (this.mergeFruits(obj1, obj2)) return;

                    obj1.checkLose = true;
                    obj2.checkLose = true;

                    let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
                    let distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));
                    let overlap = (obj1.radius + obj2.radius) - distance;
                    let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
                    let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
                    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

                    if (overlap > 0) {
                        let moveX = (overlap * vCollision.x) / distance / 2;
                        let moveY = (overlap * vCollision.y) / distance / 2;

                        obj1.x -= moveX;
                        obj1.y -= moveY;
                        obj2.x += moveX;
                        obj2.y += moveY;

                        let impulse = 2 * speed / (100 + 100);
                        obj1.vx -= (impulse * 100 * vCollisionNorm.x);
                        obj1.vy -= (impulse * 100 * vCollisionNorm.y);
                        obj2.vx += (impulse * 100 * vCollisionNorm.x);
                        obj2.vy += (impulse * 100 * vCollisionNorm.y);

                        // Adjust velocity after collision
                        if (obj1.vx > 0) obj1.vx *= 0.5;
                        if (obj2.vx > 0) obj2.vx *= 0.5;
                        // if (obj1.vy > 0) obj1.vy *= 0.5;
                        // if (obj2.vy > 0) obj2.vy *= 0.5;
                    }
                }
            }
        }
    }

    mergeFruits(obj1, obj2) {
        const maxType = Object.keys(animalData);

        // Merge condition
        if (obj1.type === obj2.type) {
            if (obj1.type === maxType.length && obj2.type === maxType.length) {
                this.animalManager.removeFruit(obj1);
                this.animalManager.removeFruit(obj2);

                return true;
            }

            // Increase score
            this.gameManager.increaseScrore(obj1.score);

            // Create a new merged animal
            let newType =  parseInt(obj1.type) + 1;
            let newX = (obj1.x + obj2.x) / 2;
            let newY = (obj1.y + obj2.y) / 2;

            let newFruit = this.animalManager.createAnimal(this.context, newX, newY, animalData[newType].radius,
                 newType.toString(), animalData[newType].score);
            newFruit.useGravity = true;
            newFruit.checkLose = true;
            this.animalList.push(newFruit);

            this.animalManager.removeFruit(obj1, this.animalList);
            this.animalManager.removeFruit(obj2, this.animalList);

            return true;
        }

        return false;
    }

    checkLoseCondition() {
        this.animalList.forEach(fruit => {
            if (fruit.useGravity && !this.gameManager.getIsGameOver()) {
                if (fruit.y - fruit.radius < this.rectY && fruit.checkLose) {
                    this.gameManager.setIsGameOver(true);
                    if(this.gameManager.bestScore < this.gameManager.getScore()){
                        this.gameManager.saveBestScore();
                    }
                }
            }
        });
    }
}

export default CollisionManager;
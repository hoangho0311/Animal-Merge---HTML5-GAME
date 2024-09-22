import Animal from "../entities/Animal.js";
import { animalData } from "../data/animalData.js";
class AnimalManager {
    constructor(context) {
        this.context = context;
        this.currentAnimal = null;
        this.animalList = [];
    }

    startHoldingAnimal() {
        let type = this.getRandomAnimalType();
        this.currentAnimal = this.createAnimal(this.context, 0, 0, animalData[type].radius, type, animalData[type].score);
        this.animalList.push(this.currentAnimal);
    }

    getRandomAnimalType() {
        let keys = Object.keys(animalData);
        return keys[Math.floor(Math.random() * 4)];
    }

    createAnimal(context, x, y, radius, type, score) {
        return new Animal(context, x, y, 0, 0, radius, type, score);
    }

    getCurrentAnimal(){
        return this.currentAnimal;
    }

    removeFruit(fruit, animalList) {
        let index = animalList.indexOf(fruit);
        if (index > -1) {
            animalList.splice(index, 1);
        }
    }

    resetAnimalList(){
        this.animalList.splice(0, this.animalList.length)
    }
}

export default AnimalManager;

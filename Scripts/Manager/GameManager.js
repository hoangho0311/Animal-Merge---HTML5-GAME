import AnimalManager from "./AnimalManager.js";
import SoundManager from "./SoundManager.js";
class GameManager {
    constructor(animalManager) {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = this;
        
        this.isGamePause = false;
        this.isGameOver = false;
        this.isGameStart = false;
        this.score = 0;
        this.animalManager = animalManager;
        this.bestScore = parseInt(localStorage.getItem('bestScore')) || 0;

        this.soundManager = new SoundManager('./Asset/Sound/funny background music .mp3');
        this.soundManager.playBackgroundMusic();
    }

    static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    increaseScrore(fruitScore){
        this.score += fruitScore
    }

    saveBestScore() {
        this.bestScore = this.score;
    }

    getBestScore() {
        return this.bestScore;
    }

    setIsGamePause(isPause){
        this.isPause=isPause;
    }

    getIsGamePause(){
        return this.isPause;
    }

    getIsGameOver(){
        return this.isGameOver;
    }

    setIsGameOver(isGameOver){
        this.isGameOver=isGameOver;
    }

    getScore(){
        return this.score;
    }

    getBestScore(){
        return this.score;
    }

    getIsGameStart(){
        return this.isGameStart;
    }

    setIsGameStart(isGameStart){
        this.isGameStart = isGameStart;
    }

    restartGame(){
        this.animalManager.resetAnimalList();
        this.score = 0;
        this.isGameOver = false;
    }
}

export default GameManager;
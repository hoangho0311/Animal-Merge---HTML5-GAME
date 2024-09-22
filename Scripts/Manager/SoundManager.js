class SoundManager {
    constructor(sound) {
        this.sound = sound;
    }

    playBackgroundMusic() {
        this.backgroundMusic = new Audio(this.sound);
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.5;
        this.backgroundMusic.play();
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0; 
    }

    setVolume(volume) {
        this.backgroundMusic.volume = volume;
    }

    playEffect() {
        let clickSound = new Audio(this.sound);
        clickSound.volume = 1;
        clickSound.play();
    }
}

export default SoundManager;
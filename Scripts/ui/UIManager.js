import Button from "./Button.js";
import GameManager from "../Manager/GameManager.js";
import TextLabel from "./TextLabel.js";
class UIManager {
    constructor(context, rectX, rectY, rectWidth, rectHeight) {
        this.context = context;
        this.rectX = rectX;
        this.rectY = rectY;
        this.rectWidth = rectWidth;
        this.rectHeight = rectHeight;
        this.gameManager = GameManager.getInstance();

        this.rusumeButton;
        this.homeButton;
        this.restartButton;
    }

    createWinScreen() {
    }

    createLoseScreen() {
        let backgroundImage = new Image();
        backgroundImage.src =  "./Asset/Image/Background/LoseCanva.png";
        let centerX = (canvas.width - this.rectWidth / 1.1) / 2;
        let centerY = (canvas.height - this.rectHeight * 1.1) / 2;
        this.context.drawImage(backgroundImage, centerX, centerY, this.rectWidth / 1.1, this.rectHeight);

        let scoreText = new TextLabel(this.context, this.rectWidth/2 - 90, this.rectHeight - 30, 150, 35, "Score: ", "", "32px");
        scoreText.updateText("Score: "+ this.gameManager.getScore());
        scoreText.draw();

        let bestScoreText = new TextLabel(this.context, this.rectWidth/2 - 60, this.rectHeight + 70, 150, 35, "Best Score: ", "", "32px");
        bestScoreText.updateText("Best Score: "+ this.gameManager.bestScore);
        bestScoreText.draw();

        let restartButtonImage =  "./Asset/Image/Button/button2.png";
        this.restartButton = new Button(this.context, this.rectWidth/2 - 100, this.rectHeight + 150 , 200, 70, "Restart", restartButtonImage, this.restart.bind(this));
        this.restartButton.addEventListeners();
        this.restartButton.draw();
    }

    restart(){
        this.restartButton.removeEventListeners();
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.gameManager.restartGame();
    }

    startGame(){
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.gameManager.setIsGameStart(true);
    }

    createMenuScreen() {
        let backgroundImage = new Image();
        backgroundImage.src =  "./Asset/Image/Background/Tiles-Rainbow.png";
        this.context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        let logoImage =  "./Asset/Image/logo/logo.png";
        this.logoButton = new Button(this.context, canvas.width/2 - 100, 0 + 100, 200, 200, "", logoImage, this.startGame.bind(this));
        this.logoButton.draw();

        let startButtonImage =  "./Asset/Image/Button/startButton.png";
        this.startButton = new Button(this.context, canvas.width/2 - 100, this.rectHeight , 200, 200, "START", startButtonImage, this.startGame.bind(this));
        this.startButton.addEventListeners();
        this.startButton.draw();
    }
    
    resume(){
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.rusumeButton.removeEventListeners();
        this.homeButton.removeEventListeners();
        this.gameManager.setIsGamePause(false);
    }
    
    home(){
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.rusumeButton.removeEventListeners();
        this.homeButton.removeEventListeners();
        this.createMenuScreen();
        this.gameManager.setIsGameStart(false);
    }
     
    createPauseScreen() {
        if(this.gameManager.getIsGameOver()) return;
        let backgroundImage = new Image();
        backgroundImage.src =  "./Asset/Image/Background/PauseCanva.png";
        let centerX = (canvas.width - this.rectWidth / 1.1) / 2;
        let centerY = (canvas.height - this.rectHeight * 1.1) / 2;
        this.context.drawImage(backgroundImage, centerX, centerY, this.rectWidth / 1.1, this.rectHeight);

        let resumeButtonImage =  "./Asset/Image/Button/button1.png";
        this.rusumeButton = new Button(this.context, this.rectWidth/2 - 110 , this.rectHeight - 80 , 220, 80, "   RESUME", resumeButtonImage, this.resume.bind(this));
        this.rusumeButton.addEventListeners();
        this.rusumeButton.draw();

        let homeButtonImage =  "./Asset/Image/Button/button2.png";
        this.homeButton = new Button(this.context, this.rectWidth/2 - 110 , this.rectHeight + 60 , 220, 80, " HOME", homeButtonImage, this.home.bind(this));
        this.homeButton.addEventListeners();
        this.homeButton.draw();
    }
}

export default UIManager;

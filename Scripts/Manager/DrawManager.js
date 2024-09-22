class DrawManager {
    constructor(context) {
        this.context = context;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawBackground() {
        let backgroundImage = new Image();
        backgroundImage.src =  "./Asset/Image/Background/Tiles-Rainbow.png";
        this.context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    clearAnimals(animalList) {
        for (let animal of animalList) {
            this.context.clearRect(animal.x - animal.radius, animal.y - animal.radius, animal.radius * 2, animal.radius * 2);
        }
    }

    drawBox(rectX, rectY, rectWidth, rectHeight, backgroundSrc) {
        let background = new Image();
        background.src = backgroundSrc;

        this.context.beginPath();
        this.context.moveTo(rectX, rectY);
        this.context.lineTo(rectX + rectWidth, rectY);
        this.context.strokeStyle = "red";
        this.context.lineWidth = 5;
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(rectX + rectWidth, rectY);
        this.context.lineTo(rectX + rectWidth, rectY + rectHeight);
        this.context.lineTo(rectX, rectY + rectHeight);
        this.context.lineTo(rectX, rectY);
        this.context.strokeStyle = "black";
        this.context.drawImage(background, rectX, rectY, rectWidth, rectHeight);
        this.context.stroke();
    }
}
export default DrawManager;

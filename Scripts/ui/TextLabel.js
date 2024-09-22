class TextLabel {
    constructor(context, x, y, width, height, label, image, font) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
        this.image = new Image();
        this.image.src = image; 
        this.font = font;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);

        this.context.fillStyle = 'black';
        this.context.font = `${this.font} Arial`;
        this.context.textAlign = 'center';
        this.context.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2 + 5);
    }

    updateText(newLabel) {
        this.label = newLabel;
    }
}
export default TextLabel;

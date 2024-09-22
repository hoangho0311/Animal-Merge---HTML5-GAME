class Button {
    constructor(context, x, y, width, height, label, image, onClick) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
        this.image = new Image();
        this.image.src = image; 
        this.onClick = onClick;

        this.handleMouseClick = this.handleMouseClick.bind(this);
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);

        this.context.fillStyle = 'black';
        this.context.font = '16px Arial';
        this.context.textAlign = 'center';
        this.context.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2 + 5);
    }

    handleMouseClick(event) {
        const rect = this.context.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (
            mouseX > this.x && 
            mouseX < this.x + this.width && 
            mouseY > this.y && 
            mouseY < this.y + this.height
        ) {
            this.onClick();
        }
    }

    addEventListeners() {
        this.context.canvas.addEventListener('click', this.handleMouseClick);
    }

    removeEventListeners() {
        this.context.canvas.removeEventListener('click', this.handleMouseClick);
    }
}
export default Button;

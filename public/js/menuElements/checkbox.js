const CHECKBOX_BG_COLOR = [13, 17, 23, TRANSPARENCY];
const CHECKBOX_BORDER_COLOR = [213, 217, 223, TRANSPARENCY];
const CHECKBOX_OVER_BORDER_COLOR = [30, 144, 255, TRANSPARENCY];
const CHECKBOX_TEXT_COLOR = [255, 255, 255, TRANSPARENCY];
const CHECKBOX_FILLED_COLOR = [30, 144, 255, TRANSPARENCY];

class Checkbox {
    constructor(text, value) {
        this.length = 18;
        this.text = text;
        this.value = value;
    }

    draw(x, y) {
        this.x = x;
        this.y = y;

        fill(CHECKBOX_BG_COLOR);
        stroke(CHECKBOX_BORDER_COLOR);
        
        // highlight if the mouse is over it
        if (mouseX > this.x &&
            mouseY > this.y &&
            mouseX < this.x + this.length &&
            mouseY < this.y + this.length) stroke(CHECKBOX_OVER_BORDER_COLOR);
        
        square(this.x, this.y, this.length);

        if (this.value) {
            fill(CHECKBOX_FILLED_COLOR);
            stroke(CHECKBOX_FILLED_COLOR);
            square(this.x + 3, this.y + 3, this.length - 6);
        }

        fill(CHECKBOX_TEXT_COLOR);
        stroke(CHECKBOX_TEXT_COLOR);
        text(this.text, this.x + this.length + 5, this.y + this.length / 2 + 4);
    }

    mousePressed() {
        if (mouseX > this.x &&
            mouseY > this.y &&
            mouseX < this.x + this.length &&
            mouseY < this.y + this.length) {
            this.value = !this.value;
            return true;
        }
        return false;
    }
}
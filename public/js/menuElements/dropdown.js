const DROPDOWN_BG_COLOR = [13, 17, 23];
const DROPDOWN_BORDER_COLOR = [213, 217, 223];
const DROPDOWN_TEXT_COLOR = [255, 255, 255];
const DROPDOWN_OVER_BORDER_COLOR = [30, 144, 255];

class Dropdown {
    constructor(elements) {
        this.width = 150;
        this.height = 18;

        this.elements = elements;
        this.current = Object.keys(elements)[0];

        this.pressed = false;
    }

    mousePressed() {
        if (this.pressed) {
            // check if any of the options were pressed
            let optionsX = this.x;
            let optionsY = this.y + this.height + 1;
            
            let options = Object.keys(this.elements);
            
            for (let i = 0; i < options.length; i++) {
                if (mouseX > optionsX &&
                    mouseY > optionsY &&
                    mouseX < optionsX + this.width &&
                    mouseY < optionsY + this.height * (i + 1)) {
                    this.current = options[i];
                    this.pressed = false; // close the dropdown
                    return true;
                }
            }
        }

        if (mouseX > this.x &&
            mouseY > this.y &&
            mouseX < this.x + this.width &&
            mouseY < this.y + this.height) {
            this.pressed = !this.pressed;
            return true;
        }
        return false;
    }

    draw(x, y) {
        this.x = x;
        this.y = y;

        fill(DROPDOWN_BG_COLOR);
        stroke(DROPDOWN_BORDER_COLOR);

        if (mouseX > this.x &&
            mouseY > this.y &&
            mouseX < this.x + this.width &&
            mouseY < this.y + this.height) {
            stroke(DROPDOWN_OVER_BORDER_COLOR);
        }

        rect(x, y, this.width, this.height);

        fill(DROPDOWN_BORDER_COLOR);
        stroke(DROPDOWN_BORDER_COLOR);
        if (this.pressed) triangle(x + this.width - 13, y + this.height / 1.5 + this.height / 5, x + this.width - 8, y + this.height / 1.5 - this.height / 2.5, x + this.width - 3, y + this.height / 1.5 + this.height / 5);
        else triangle(x + this.width - 13, y + this.height / 1.5 - this.height / 2.5, x + this.width - 8, y + this.height / 1.5 + this.height / 5, x + this.width - 3, y + this.height / 1.5 - this.height / 2.5);

        fill(DROPDOWN_TEXT_COLOR);
        text(this.current, x + 3, y + 4, x + this.width, y + this.height);
        strokeWeight(1);
    }

    drawDropdown() {
        if (!this.pressed) return false;

        let optionsX = this.x;
        let optionsY = this.y + this.height;

        stroke(DROPDOWN_BORDER_COLOR);

        let options = Object.keys(this.elements);
        for (let i = 0; i < options.length; i++) {
            // if mouse is over it, highlight it
            if (mouseX > optionsX &&
                mouseY > optionsY &&
                mouseX < optionsX + this.width &&
                mouseY < optionsY + this.height) {
                fill([DROPDOWN_BG_COLOR[0] + 50, DROPDOWN_BG_COLOR[1] + 50, DROPDOWN_BG_COLOR[2] + 50]);
            }
            else fill(DROPDOWN_BG_COLOR);
    
            rect(optionsX, optionsY, this.width, this.height);

            fill(DROPDOWN_TEXT_COLOR);
            text(options[i], optionsX + 3, optionsY + 4, optionsX + this.width, optionsY + this.height);

            optionsY += this.height;
        }
        return true;
    }

    value() {
        return this.elements[this.current];
    }
}
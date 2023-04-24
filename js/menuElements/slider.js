const SLIDER_BG_COLOR = [200, 200, 200];
const SLIDER_FILLED_COLOR = [30, 144, 255];

const SLIDER_CIRCLE_COLOR = [220, 220, 220];
const SLIDER_OVER_CIRCLE_BORDER_COLOR = [30, 144, 255];

const SLIDER_TEXT_COLOR = [255, 255, 255];

class Slider {
    constructor(beginVal, endVal, currentVal) {
        this.beginVal = beginVal;
        this.endVal = endVal;
        this.currentVal = currentVal;

        this.width = 150;
        this.height = 3;

        this.radius = 3;

        this.locked = false;
    }

    draw(x, y) {
        this.x = x;
        this.y = y;

        fill(SLIDER_BG_COLOR);
        stroke(SLIDER_BG_COLOR);
        rect(this.x, this.y, this.width, this.height, this.radius);

        // fill the left of the bar
        fill(SLIDER_FILLED_COLOR);
        stroke(SLIDER_FILLED_COLOR);
        rect(this.x, this.y, this.width * ((this.currentVal - this.beginVal) / (this.endVal - this.beginVal)), this.height, this.radius);

        // draw a draggable circle
        fill(SLIDER_CIRCLE_COLOR);
        stroke(SLIDER_CIRCLE_COLOR);

        this.circleX = this.x + this.width * ((this.currentVal - this.beginVal) / (this.endVal - this.beginVal));
        this.circleY = this.y + this.height / 2;
        this.circleRadius = 10;

        if (Math.sqrt(Math.pow(mouseX - this.circleX, 2) + Math.pow(mouseY - this.circleY, 2)) < this.circleRadius) stroke(SLIDER_OVER_CIRCLE_BORDER_COLOR);
        circle(this.circleX, this.circleY, this.circleRadius);

        // draw the text to the left of the slider
        fill(SLIDER_TEXT_COLOR);
        stroke(SLIDER_TEXT_COLOR);
        text(this.currentVal, this.x - 25, this.y + 6);
    }

    value() {
        return this.currentVal;
    }


    mousePressed() {
        if (Math.sqrt(Math.pow(mouseX - this.circleX, 2) + Math.pow(mouseY - this.circleY, 2)) < this.circleRadius) {
            this.locked = true;
            this.xOffset = mouseX - this.circleX;
            return true;
        }
        return false;
    }

    mouseDragged() {
        if (this.locked) {
            this.circleX = mouseX - this.xOffset;

            // reposition so that it doesn't go out of bounds
            this.circleX = Math.max(this.circleX, this.x);
            this.circleX = Math.min(this.circleX, this.x + this.width);

            // calculate the current value given circleX
            this.currentVal = Math.floor(((this.circleX - this.x) / (this.width)) * (this.endVal - this.beginVal)) + this.beginVal;
            console.log((this.circleX - this.x) / (this.width));

            return true;
        }
        return false;
    }

    mouseReleased() {
        this.locked = false;
    }
}
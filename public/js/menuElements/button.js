const BUTTON_BG_COLOR = [13, 17, 23, TRANSPARENCY]
const BUTTON_BORDER_COLOR = [213, 217, 223, TRANSPARENCY]
const BUTTON_TEXT_COLOR = [255, 255, 255, TRANSPARENCY]
const BUTTON_OVER_BORDER_COLOR = [30, 144, 255, TRANSPARENCY]

class Button {
    constructor(text) {
        this.text = text

        this.width = 100
        this.height = 20
    }

    draw(x, y) {
        this.x = x
        this.y = y

        // highlight if cursor is over it
        fill(BUTTON_BG_COLOR)
        stroke(BUTTON_BORDER_COLOR)

        if (
            mouseX > this.x &&
            mouseY > this.y &&
            mouseX < this.x + this.width &&
            mouseY < this.y + this.height
        ) {
            stroke(BUTTON_OVER_BORDER_COLOR)
        }

        rect(this.x, this.y, this.width, this.height)

        let textW = textWidth(this.text)
        fill(BUTTON_TEXT_COLOR)
        stroke(BUTTON_TEXT_COLOR)
        text(this.text, this.x + (this.width - textW) / 2, this.y + 14)
    }

    mousePressed() {
        if (
            mouseX > this.x &&
            mouseY > this.y &&
            mouseX < this.x + this.width &&
            mouseY < this.y + this.height
        ) {
            return true
        }
        return false
    }
}

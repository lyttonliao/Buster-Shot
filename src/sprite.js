class Sprite {
    constructor(image) {
        this.image = image;
    }

    renderAnimation(sx, sy, sw, sh, dx, dy, dw, dh, ctx) {
        ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}

export default Sprite;
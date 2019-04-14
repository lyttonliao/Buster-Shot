class Sprite {
    constructor(image, sx, sy, sw, sh, dx, dy, dw, dh, ctx) {
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
        this.dx = dx;
        this.dy = dy; 
        this.dw = dw;
        this.dh = dh;
        // this.pos = [dx, dy]
        this.ctx = ctx;
    }

    // update(dx, dy) {
    //     var x = this.pos[0];
    //     var y = this.pos[1];
    //     this.pos = [x + dx, y + dy];
    // }

    render() {
        // debugger
        const { image, sx, sy, sw, sh, dx, dy, dw, dh, ctx } = this;
        ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}

export default Sprite;
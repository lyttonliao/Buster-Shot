class Phoenix {
    constructor(image, player, ctx){
        this.image = image;
        this.player = player;
        this.ctx = ctx;
        this.x = ctx.canvas.width / 2;
        this.y = ctx.canvas.height * .45 + 61 * Math.floor(Math.random() * Math.floor(3));

        this.frameTimer = 0;
        this.currentFrame = 0;
        this.phoenixSpeed = 8;
        this.animationSpeed = 30;
    }

    render() {
        this.frameTimer++;
        if (this.frameTimer % this.animationSpeed === 0) {
            this.currentFrame = (this.currentFrame + 1) % 3;
        }
        this.x -= this.phoenixSpeed;
        this.ctx.drawImage(this.image, 229 / 3 * this.currentFrame, 0, 229 / 3, 61, this.x, this.y - 40, 229 / 3 * 1.5, 61 * 1.5)
    }

    isCollided() {
        if(((this.x < this.player.state.position['x'] + this.player.dw - 30) && (this.x > this.player.state.position['x'])) &&
            ((this.y + 61 * 1.5 / 2 < this.player.state.position['y'] + this.player.dh) && (this.y + 61 * 1.5 / 2 > this.player.state.position['y'] + this.player.dh * .75))) {

                return true;
            }
        return false;
    }

    reducePlayerHP(damage) {
        if (this.isCollided()) {
            this.player.state.hp -= damage;
            this.player.render;
        }
    }
}

export default Phoenix;
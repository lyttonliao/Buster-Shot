const Circle = function (x, y, cirColor, radius, ctx) {
    this.x = x
    this.y = y
    this.radius = radius
    if (cirColor === 'blue') {
        this.color = '#4C23EC'
    } else {
        this.color = '#C73A8A'
    }
    this.ctx = ctx;

    this.draw = function () {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.ctx.strokeStyle = 'black'
        this.ctx.stroke()
        this.ctx.fillStyle = this.color
        this.ctx.fill()
    }
}

export default Circle;
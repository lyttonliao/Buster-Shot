import Circle from './objects/circle';

class GameModel {
    constructor(ctx) {
        this.ctx = ctx;
        this.cw = 720;
        this.ch = 405;
        this.pw = this.cw / 2;
        this.ph = this.ch * .45;
    }

    circleOuter() {
        for (let y = this.ch / 8; y <= this.ch ; y += this.ch / 4) {
            for (let x = this.cw / 6; x <= this.cw; x += this.cw / 3) {
                const circle = new Circle(x, y, 'pink', 30, this.ctx)
                circle.draw()
            }
        }

        for (let y = 0; y <= this.ch; y += this.ch / 4) {
            for (let x = 0; x <= this.cw; x += this.cw / 3) {
                const circle = new Circle(x, y, 'blue', 30, this.ctx)
                circle.draw()
            }
        }
    }

    circleInner() {
        for (let y = this.ch / 8; y <= this.ch; y += this.ch / 4) {
            for (let x = this.cw / 6; x <= this.cw; x += this.cw / 3) {
                const circle = new Circle(x, y, 'blue', 25, this.ctx)
                circle.draw()
            }
        }

        for (let y = 0; y <= this.ch; y += this.ch / 4) {
            for (let x = 0; x <= this.cw; x += this.cw / 3) {
                const circle = new Circle(x, y, 'pink', 25, this.ctx)
                circle.draw()
            }
        }
    }


    drawPlatform() {
        this.ctx.fillStyle = '#BD4747'
        this.ctx.fillRect(0, this.ch * 9 / 20, .5 * this.cw, .45 * this.ch);
        for (var x = 0; x <= this.pw; x += this.pw / 3) {
            this.ctx.moveTo(x, this.ch * 9 / 20)
            this.ctx.lineTo(x, this.ch * 9 / 10)
        }
        
        for (var y = 0; y <= this.ph * 4/ 3; y += this.ph / 3) {
            this.ctx.moveTo(0, y + this.ch * 9 / 20)
            this.ctx.lineTo(this.cw / 2, y + this.ch * 9 / 20)
        }

        this.ctx.strokeStyle = "#423E54";
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }

    drawOctOnStage() {
        for (var x = 0; x <= this.pw * 2 / 3; x += this.pw / 3) {
            for (var y = 0; y <= this.ph * 2 /3; y += this.ph / 3) {
                var Xsize = 55,
                    Ysize = 25.375,
                    Dside = 12.3875,
                    Xside = Xsize - Dside,
                    Yside = Ysize - Dside,
                    Xcenter = 60 + x,
                    Ycenter = 30.375 + y + .45 * this.ch;
                
                this.ctx.beginPath();
                this.ctx.moveTo(Xcenter + Xsize, Ycenter);
                this.ctx.lineTo(Xcenter + Xsize, Ycenter + Yside);
                this.ctx.lineTo(Xcenter + Xside, Ycenter + Ysize);
                this.ctx.lineTo(Xcenter, Ycenter + Ysize);
                this.ctx.lineTo(Xcenter - Xside, Ycenter + Ysize);
                this.ctx.lineTo(Xcenter - Xsize, Ycenter + Yside);
                this.ctx.lineTo(Xcenter - Xsize, Ycenter);
                this.ctx.lineTo(Xcenter - Xsize, Ycenter - Yside);
                this.ctx.lineTo(Xcenter - Xside, Ycenter - Ysize);
                this.ctx.lineTo(Xcenter, Ycenter - Ysize);
                this.ctx.lineTo(Xcenter + Xside, Ycenter - Ysize);
                this.ctx.lineTo(Xcenter + Xsize, Ycenter - Yside);
                this.ctx.lineTo(Xcenter + Xsize, Ycenter);
                this.ctx.closePath();


                this.ctx.strokeStyle = "#000000";
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                this.ctx.save();
                this.ctx.fillStyle = '#D89496';
                this.ctx.fill();
            }
        }
    }

    // drawHP w

    render() {
        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(0, 0, this.cw, this.ch);
        this.circleOuter();
        this.circleInner();
        this.drawPlatform();
        this.drawOctOnStage();
    }
}

export default GameModel;


// function gregorskinInit() {
    // ctx.drawImage(gregorskin, 0, 0, 75, 75, 123, 140, 120, 170);
//     ctx.drawImage(gregorskin, 125, 290, 75, 50, 100, 170, 160, 135);
//     ctx.drawImage(gregorskin, 165, 340, 25, 30, 210, 208, 65, 65)
// }
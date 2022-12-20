export default class Obstacle {
    constructor(x,y,color) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 15;
        this.color = color;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle="black";   
        ctx.lineWidth="2";   
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fillStyle= this.color;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
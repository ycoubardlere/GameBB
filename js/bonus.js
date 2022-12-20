export default class Bonus {
    constructor(x, y,type) {
        this.x = x;
        this.y = y;
        this.type = type;   
    }

    update(ctx) {
        this.y += 3;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle="black";   
        ctx.lineWidth="2";   
        ctx.rect(this.x,this.y,30,30);
        ctx.fillStyle= "red";
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
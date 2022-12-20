export default class Ball {
    constructor(x, y, vitessex,vitessey,r) {
        this.x = x;
        this.y = y;
        this.vitessex = vitessex;
        this.vitessey = vitessey;
        this.r = r;
    }

    update(ctx) {
        if(((this.x + this.r) > 800) || (this.x+this.r < 20)) {
            this.vitessex = -this.vitessex;
        }   
        if(((this.y + this.r) > 600) || (this.y+this.r < 20)) {
            this.vitessey = -this.vitessey;
        }   
        this.x += this.vitessex;
        this.y += this.vitessey;
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}
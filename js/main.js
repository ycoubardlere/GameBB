import Obstacle from "./obstacle.js";
import Ball from "./ball.js";
import { Collision } from "./collisions.js";
import Bonus from "./bonus.js";

let canvas, ctx, score = 0;
// tableau qui contient les obstacles
let obstacles = [];
let bonus = [];
let ball = new Ball(300,400,6,6,10);
var lives = 3;
var sound;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// ici première manière de définir des objets, pas besoin de new ni de classes
// utile pour des objets "uniques" (singleton)
let player = {
    x: 350,
    y: 500,
    width: 100,
    height: 10,
    vitesse: 10,
    vx: 0,
    vy: 0,
    draw: function (ctx) {
        // bonne pratique : quand on dessine, on sauvegarde le contexte
        ctx.save();

        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    },
    update: function () {
        if(this.x <= 0){
            this.x += 1; 
        }else if (this.x >= 700){
            this.x -= 1;
        }else{
            this.x += this.vx;
        }
    }
}

// bonne pratique : on définit une fonction appelée quand la page index.html
// et toutes ses ressources sont chargées

window.onload = init; // la fonction init sera appelée par le navigateur quand la page sera chargée

function init() {
    // ici on a accès au DOM !!!! Tous les éléments HTML sont définis
    console.log("Page chargée, j'ai accès à tous les éléments de la page");

    // On accède au canvas dans le DOM, via DOM API ou Selector API
    // let canvas = document.getElementById("canvas");
    // query selector utilise la syntaxe des selecteurs CSS
    canvas = document.querySelector("#myCanvas");

    // Pour dessiner : on utilise le contexte 2D du canvas
    ctx = canvas.getContext("2d");
    canvas.style.backgroundImage = "url('noel.jpg')";
    sound = new Howl({
        src: ['plop.mp3']
    });

    definirTouchesClavier();

    // on créée les obstacles
    creeObstacles();

    // On démarre la boucle d'animation
    requestAnimationFrame(mainloop);
}

function definirTouchesClavier() {
    window.onkeydown = (evt) => {
        //console.log("touche pressée : " + evt.key);
        switch (evt.key) {
            case "ArrowLeft":
                player.vx = -player.vitesse;
                //player.x -= 10;
                break;
            case "ArrowRight":
                player.vx = player.vitesse;
                //player.x += 10;
                break;
        }
    }
    window.onkeyup = (evt) => {
        console.log("touche pressée : " + evt.key);

        switch (evt.key) {
            case "ArrowLeft":
                player.vx = 0;
                //player.x -= 10;
                break;
            case "ArrowRight":
                player.vx = 0;
                //player.x += 10;
                break;
        }
    }
}

function mainloop() {
    // boucle d'animation
    // 1 on efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 on dessine les objets
    player.draw(ctx)
    drawObstacles();

    // 3 on met à jour les objets
    player.update();
    deplaceLesObstacles();
    drawLives();
    drawScore();

    // 4 - on teste les collisions
    for (let i = 0; i < obstacles.length; i++) {
        sound.play();
        if (Collision(ball, obstacles[i])) {
            score++;
            if(getRandomInt(100) < 10){
                let x = obstacles[i].x;
                let y = obstacles[i].y;
                let b = new Bonus(x,y,getRandomInt(4));
                bonus.push(b);
            }
            ball.vitessey = -ball.vitessey;
            obstacles.splice(i, 1);
        }
    }
    if (Collision(ball, player)) {
        sound.play();
        ball.vitessey = -ball.vitessey;
    }
    for (let i = 0; i < bonus.length; i++) {
        if (Collision(bonus[i],player)) {
            if(bonus[i].type == 0){
                player.width += 10;
            }
            if(bonus[i].type == 1){
                player.width -= 10;
            }
            if(bonus[i].type == 2){
                ball.vitessex += 1;
                ball.vitessey += 1;
            }
            if(bonus[i].type == 3){
                ball.vitessex -= 1;
                ball.vitessey -= 1;
            }
            bonus.splice(i, 1);
        }
    }

    // Finalement : on demande au navigateur de rappeler mainloop
    // L'API s'appelle requestAnimationFrame, et rappellera mainloop dans 16ms
    // soit 1/60ème de seconde
    if (obstacles.length == 0) {
        alert("YOU WON!");
        document.location.reload();
        clearInterval(interval); 
    }
    if (lose()) {
        lives --;
        player.x = 350;
        player.y = 500;
        ball.x = 300;
        ball.y = 400;
        ball.vitessex = 6;
        ball.vitessey = 6;
    }
    if(lives == 0){
        alert("YOU LOST!");
        document.location.reload();
        clearInterval(interval); 
    }
    requestAnimationFrame(mainloop);
}

function deplaceLesObstacles() {
    // on parcourt le tableau d'obstacles
    ball.update(ctx);
    bonus.forEach(o => {
        o.update(ctx);
    });
}

function drawObstacles() {
    ball.draw(ctx);
    obstacles.forEach(o => {
        o.draw(ctx);
    });
    bonus.forEach(o => {
        o.draw(ctx);
    });
}

function lose(){
    return ball.y - ball.r > player.y + player.height;
}

function creeObstacles() {
    for (let i = 5; i < 15; i++) {
        const r = Math.floor(Math.random()*255);
        const g = Math.floor(Math.random()*255);
        const b = Math.floor(Math.random()*255);
        let color = "rgb(" + r + "," + g + "," + b + ")";
        for (let j = 2; j < 18; j++) {
            let o = new Obstacle(j*40,i*15,color);
            obstacles.push(o);
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, canvas.width-80, 40);
}
// function that detects if two rectangles intersect
function Collision(ball, rect) {
    return ball.x > rect.x &&
        ball.x < rect.x + rect.width &&
        ball.y + ball.r > rect.y &&
        ball.y < rect.y + rect.height;
}

export {Collision}
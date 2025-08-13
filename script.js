const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.color = "rgba(255, 105, 180, 0.7)";
}

Heart.prototype.draw = function() {
    ctx.beginPath();
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(this.x, this.y + topCurveHeight);
    ctx.bezierCurveTo(
        this.x, this.y,
        this.x - this.size / 2, this.y,
        this.x - this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
        this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
        this.x, this.y + (this.size + topCurveHeight) / 2,
        this.x, this.y + this.size
    );
    ctx.bezierCurveTo(
        this.x, this.y + (this.size + topCurveHeight) / 2,
        this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
        this.x + this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
        this.x + this.size / 2, this.y,
        this.x, this.y,
        this.x, this.y + topCurveHeight
    );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
};

Heart.prototype.update = function() {
    this.y -= this.speed;
    if (this.y + this.size < 0) {
        this.y = canvas.height + this.size;
        this.x = Math.random() * canvas.width;
    }
    this.draw();
};

function initHearts(count) {
    for (let i = 0; i < count; i++) {
        let size = Math.random() * 20 + 10;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speed = Math.random() * 1 + 0.5;
        hearts.push(new Heart(x, y, size, speed));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => h.update());
    requestAnimationFrame(animate);
}

initHearts(50);
animate();

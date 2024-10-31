class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 2 + Math.random() * 2;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 100
            });
        }
    }

    update() {
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.05;
            particle.life--;
        }
        this.particles = this.particles.filter(particle => particle.life > 0);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let particle of this.particles) {
            ctx.fillRect(particle.x, particle.y, 4, 4);
        }
    }
}

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('fireworks').appendChild(canvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let fireworks = [];

function animate() {
    ctx.fillStyle = 'rgba(26, 26, 26, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        fireworks.push(new Firework(x, y));
    }

    for (let firework of fireworks) {
        firework.update();
        firework.draw(ctx);
    }

    fireworks = fireworks.filter(firework => firework.particles.length > 0);

    requestAnimationFrame(animate);
}

animate();
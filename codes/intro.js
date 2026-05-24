const canvas = document.getElementById("paintLayer");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* Initial white layer */

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

/* Mouse */

let mouseX = null;
let mouseY = null;

/* Floating particles */

const particles = [];

for(let i = 0; i < 40; i++){

    particles.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,

        radius: 50 + Math.random() * 120

    });

}

/* Animation */

function animate(){

    /* White slowly returns */

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "rgba(255,255,255,0.035)";

    ctx.fillRect(0,0,canvas.width,canvas.height);

    /* Erase mode */

    ctx.globalCompositeOperation = "destination-out";

    /* Floating reveals */

    particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;

        /* bounce softly */

        if(p.x < 0 || p.x > canvas.width){
            p.vx *= -1;
        }

        if(p.y < 0 || p.y > canvas.height){
            p.vy *= -1;
        }

        /* drifting */

        p.vx += (Math.random() - 0.5) * 0.002;
        p.vy += (Math.random() - 0.5) * 0.002;

        p.vx *= 0.999;
        p.vy *= 0.999;

        const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius
        );

        gradient.addColorStop(0, "rgba(0,0,0,0.08)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    /* Mouse reveal */

    if(mouseX !== null){

        const gradient = ctx.createRadialGradient(
            mouseX,
            mouseY,
            0,
            mouseX,
            mouseY,
            140
        );

        gradient.addColorStop(0, "rgba(0,0,0,1)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
            mouseX,
            mouseY,
            140,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    requestAnimationFrame(animate);
}

/* Start animation */

animate();

/* Mouse */

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

/* Touch */

window.addEventListener("touchmove", (e) => {

    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;

});

/* Resize */

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

});

/* Enter button */

document.getElementById("enterBtn").addEventListener("click", () => {

    /* fade out intro */

    document.body.style.transition = "opacity 1.2s ease";

    document.body.style.opacity = "0";

    /* go to transition page */

    setTimeout(() => {

        window.location.href = "transition.html";

    }, 1200);

});
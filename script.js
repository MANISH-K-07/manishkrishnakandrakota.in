/* ============================================================
   MANISH KRISHNA KANDRAKOTA — Portfolio Script v4
   Script is at end of <body> — DOM is already ready.
   No DOMContentLoaded wrapper needed.
   ============================================================ */

/* ── THEME TOGGLE ── */
const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeBtn.textContent = "◑";
    }
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const light = document.body.classList.contains("light-mode");
        localStorage.setItem("theme", light ? "light" : "dark");
        themeBtn.textContent = light ? "◑" : "◐";
    });
}

/* ── CUSTOM CURSOR ── */
const dot  = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");

if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener("mousemove", (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + "px";
        dot.style.top  = my + "px";
    });

    (function tick() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + "px";
        ring.style.top  = ry + "px";
        requestAnimationFrame(tick);
    })();

    document.querySelectorAll("a, button, .project-card, .expertise-card").forEach(el => {
        el.addEventListener("mouseenter", () => ring.classList.add("hov"));
        el.addEventListener("mouseleave", () => ring.classList.remove("hov"));
    });
}

/* ── NAVBAR SCROLL ── */
const hdr = document.getElementById("header");
if (hdr) {
    window.addEventListener("scroll", () => hdr.classList.toggle("scrolled", window.scrollY > 60));
}

/* ── SECTION REVEAL ── */
const secs = document.querySelectorAll(".section");
if (secs.length && "IntersectionObserver" in window) {
    secs.forEach(s => s.classList.add("will-animate"));
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    secs.forEach(s => obs.observe(s));
}

/* ── STAT COUNTERS ── */
function runCounters() {
    document.querySelectorAll(".stat-num").forEach(el => {
        const target = +el.dataset.target || 0;
        const suffix = el.dataset.suffix || "";
        let cur = 0;
        const step = target / (1400 / 16);
        const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = Math.floor(cur) + (cur >= target ? suffix : "");
            if (cur >= target) clearInterval(t);
        }, 16);
    });
}
setTimeout(runCounters, 500);

/* ── FULL-PAGE INTERACTIVE PARTICLE CANVAS ── */
const canvas = document.getElementById("bg-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let W, H, pts;
    let mouse = { x: -9999, y: -9999 };

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function init() {
        const n = Math.floor((W * H) / 11000);
        pts = Array.from({ length: n }, () => ({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r:  Math.random() * 1.8 + 0.4,
        }));
    }

    /* Click burst */
    document.addEventListener("click", (e) => {
        if (!pts) return;
        for (let i = 0; i < 8; i++) {
            const a = (Math.PI * 2 / 8) * i;
            const s = Math.random() * 2.5 + 1;
            pts.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a)*s, vy: Math.sin(a)*s, r: Math.random()*1.5+0.5 });
        }
        if (pts.length > 450) pts.splice(0, 8);
    });

    /* Global mouse tracking — works everywhere on the page */
    document.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    function dotColor()  { return document.body.classList.contains("light-mode") ? "rgba(0,80,180,0.7)"  : "rgba(0,196,255,0.7)"; }
    function lineColor() { return document.body.classList.contains("light-mode") ? "rgba(0,80,180,"      : "rgba(0,196,255,"; }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const dc = dotColor();
        const lc = lineColor();

        for (let i = 0; i < pts.length; i++) {
            const p = pts[i];
            /* Mouse repulsion */
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const d  = Math.sqrt(dx*dx + dy*dy);
            if (d < 140 && d > 0) {
                const f = (140 - d) / 140 * 0.7;
                p.vx += (dx/d)*f; p.vy += (dy/d)*f;
            }
            /* Speed cap + dampen */
            const spd = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
            if (spd > 3) { p.vx *= 0.88; p.vy *= 0.88; }
            p.vx *= 0.996; p.vy *= 0.996;
            p.x += p.vx; p.y += p.vy;
            /* Wrap edges */
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            /* Draw dot */
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
            ctx.fillStyle = dc; ctx.fill();
            /* Draw lines to neighbours */
            for (let j = i+1; j < pts.length; j++) {
                const q = pts[j];
                const ddx = p.x-q.x, ddy = p.y-q.y;
                const dd  = Math.sqrt(ddx*ddx + ddy*ddy);
                if (dd < 140) {
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = lc + ((1 - dd/140)*0.35) + ")";
                    ctx.lineWidth = 0.8; ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => { resize(); init(); });
    resize(); init(); draw();
}

/* ── SMOOTH SCROLL (called from onclick in HTML) ── */
function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ── NAV SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        const href = a.getAttribute("href");
        if (href === "#") return;
        const t = document.querySelector(href);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
    });
});

/* ── CARD TILT ── */
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform  = `translateY(-5px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
        card.style.transition = "transform 0.1s ease";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform  = "";
        card.style.transition = "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)";
    });
});

/* ── ACTIVE NAV ── */
const navAs = document.querySelectorAll(".nav-links a");
if ("IntersectionObserver" in window && navAs.length) {
    const no = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navAs.forEach(a => {
                    a.style.color = "";
                    if (a.getAttribute("href") === "#" + e.target.id) a.style.color = "var(--accent)";
                });
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll("section[id]").forEach(s => no.observe(s));
}

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

/* ── MODALS ── */
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    // Animate bars when checkstyle modal opens
    if (id === "checkstyle-modal") {
        setTimeout(() => {
            modal.querySelectorAll(".bar-fill").forEach(bar => {
                bar.style.width = bar.dataset.w + "%";
            });
        }, 120);
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
}

function closeModalOutside(e, id) {
    if (e.target === e.currentTarget) closeModal(id);
}

// Close on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.open").forEach(m => {
            m.classList.remove("open");
            document.body.style.overflow = "";
        });
    }
});

/* ── SEMESTER TAB SWITCHER ── */
function switchSem(btn, panelId) {
    btn.closest('.modal-box').querySelectorAll('.sem-tab').forEach(t => t.classList.remove('active'));
    btn.closest('.modal-box').querySelectorAll('.sem-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(panelId).classList.add('active');
}

/* ── SGPA CHART ── */
function drawSGPAChart() {
    const canvas = document.getElementById('sgpa-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.parentElement.clientWidth - 40;
    const H = 170;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    // Actual data S1-S6 + S7 projected
    const actual    = [8.77, 8.69, 8.88, 8.19, 7.59, 7.77];
    const projected = 8.40; // S7 projection — recovery trend continuing
    const allData   = [...actual, projected];
    const labels    = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7*'];
    const n         = allData.length;

    const isLight = document.body.classList.contains('light-mode');
    const accent  = isLight ? '#0055cc' : '#00c4ff';
    const projCol = isLight ? 'rgba(240,180,41,0.9)' : 'rgba(240,180,41,0.9)';
    const gridC   = isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)';
    const textC   = isLight ? '#44607a' : '#7a90b0';

    const pad = { top: 24, right: 24, bottom: 44, left: 44 };
    const cW  = W - pad.left - pad.right;
    const cH  = H - pad.top  - pad.bottom;
    const minV = 7.0, maxV = 9.5;

    function xOf(i) { return pad.left + (i / (n - 1)) * cW; }
    function yOf(v) { return pad.top + (1 - (v - minV) / (maxV - minV)) * cH; }

    // Grid lines
    [7.0, 7.5, 8.0, 8.5, 9.0].forEach(v => {
        const y = yOf(v);
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cW, y);
        ctx.strokeStyle = gridC; ctx.lineWidth = 1; ctx.setLineDash([]); ctx.stroke();
        ctx.fillStyle = textC; ctx.font = `10px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'right'; ctx.fillText(v.toFixed(1), pad.left - 8, y + 4);
    });

    // Gradient fill — actual only
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + cH);
    grad.addColorStop(0, isLight ? 'rgba(0,85,204,0.15)' : 'rgba(0,196,255,0.15)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.moveTo(xOf(0), yOf(actual[0]));
    actual.forEach((v, i) => { if (i > 0) ctx.lineTo(xOf(i), yOf(v)); });
    ctx.lineTo(xOf(actual.length - 1), pad.top + cH);
    ctx.lineTo(xOf(0), pad.top + cH);
    ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

    // Actual line (S1–S6)
    ctx.beginPath();
    ctx.moveTo(xOf(0), yOf(actual[0]));
    actual.forEach((v, i) => { if (i > 0) ctx.lineTo(xOf(i), yOf(v)); });
    ctx.setLineDash([]); ctx.strokeStyle = accent; ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round'; ctx.stroke();

    // Recovery highlight — S5→S6→S7 arrow zone
    const recoverGrad = ctx.createLinearGradient(xOf(4), 0, xOf(6), 0);
    recoverGrad.addColorStop(0, 'rgba(0,255,136,0)');
    recoverGrad.addColorStop(1, 'rgba(0,255,136,0.06)');
    ctx.fillStyle = recoverGrad;
    ctx.fillRect(xOf(4), pad.top, xOf(6) - xOf(4), cH);

    // Dotted projection line S6→S7
    ctx.beginPath();
    ctx.moveTo(xOf(5), yOf(actual[5]));
    ctx.lineTo(xOf(6), yOf(projected));
    ctx.setLineDash([5, 4]); ctx.strokeStyle = projCol; ctx.lineWidth = 2;
    ctx.stroke(); ctx.setLineDash([]);

    // Actual dots
    actual.forEach((v, i) => {
        const x = xOf(i), y = yOf(v);
        ctx.beginPath(); ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = accent; ctx.fill();
        ctx.fillStyle = textC; ctx.font = `bold 10px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(v.toFixed(2), x, y - 11);
    });

    // Projected dot (S7) — gold, hollow
    const px = xOf(6), py = yOf(projected);
    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.strokeStyle = projCol; ctx.lineWidth = 2;
    ctx.fillStyle = isLight ? '#fff' : '#0a1628'; ctx.fill(); ctx.stroke();
    ctx.fillStyle = projCol; ctx.font = `bold 10px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(projected.toFixed(2) + '*', px, py - 12);

    // X-axis labels
    labels.forEach((lbl, i) => {
        const x = xOf(i);
        ctx.fillStyle = i === 6 ? projCol : textC;
        ctx.font = `10px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(lbl, x, H - pad.bottom + 18);
    });

    // Legend
    ctx.setLineDash([]);
    const ly = H - 8;
    ctx.beginPath(); ctx.moveTo(pad.left, ly); ctx.lineTo(pad.left + 20, ly);
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = textC; ctx.font = `9px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'left'; ctx.fillText('Actual', pad.left + 24, ly + 3);

    ctx.beginPath(); ctx.moveTo(pad.left + 80, ly); ctx.lineTo(pad.left + 100, ly);
    ctx.setLineDash([4, 3]); ctx.strokeStyle = projCol; ctx.lineWidth = 2; ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = projCol; ctx.fillText('* Projected (S7)', pad.left + 104, ly + 3);
}

// Hook into openModal to draw chart
const _origOpen = openModal;
window.openModal = function(id) {
    _origOpen(id);
    if (id === 'snist-modal') {
        setTimeout(drawSGPAChart, 80);
    }
};

/* ── PROFILE IMAGE HOVER ── */
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('mouseenter', () => {
        profileImg.style.transform  = 'scale(1.08)';
        profileImg.style.boxShadow  = '0 0 40px rgba(0,196,255,0.7), 0 0 80px rgba(0,196,255,0.35), 0 30px 80px rgba(0,0,0,0.6)';
        profileImg.style.borderColor = 'rgba(0,196,255,1)';
    });
    profileImg.addEventListener('mouseleave', () => {
        profileImg.style.transform  = '';
        profileImg.style.boxShadow  = '';
        profileImg.style.borderColor = '';
    });
}

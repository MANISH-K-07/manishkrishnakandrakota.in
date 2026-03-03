function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Navbar Scroll Effect
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Section Reveal Animation
const sections = document.querySelectorAll(".section");

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Initialize Particles
particlesJS("particles-js", {
    particles: {
        number: {
            value: 60,
            density: { enable: true, value_area: 800 }
        },
        color: { value: "#3b82f6" },
        shape: { type: "circle" },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#3b82f6",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            repulse: { distance: 100 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// === GitHub Projects Fetch === //

const githubUser = "MANISH-K-07";
const projectListEl = document.getElementById("project-list");

// Fetch user repos from GitHub
fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`)
    .then(res => res.json())
    .then(data => {
        projectListEl.innerHTML = "";

        data.forEach(repo => {
            // Only include relevant repos
            if (!repo.fork) {
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description ? repo.description : "No description provided."}</p>
                    <a href="${repo.html_url}" target="_blank" class="project-btn">View on GitHub</a>
                `;

                projectListEl.appendChild(card);
            }
        });
    })
    .catch(err => {
        projectListEl.innerHTML =
            `<p style="color: #f87171;">Failed to load GitHub projects.</p>`;
        console.error("GitHub fetch error:", err);
    });

// === Dark / Light Mode Toggle === //

const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "🌙";
    }
});


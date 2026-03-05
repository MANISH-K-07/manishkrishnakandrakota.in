<div align="center">

<img src="assets/profile.jpg" width="120" style="border-radius:50%" alt="Manish Krishna Kandrakota" />

# Manish Krishna Kandrakota

### Computer Science & Security Engineer · CMU MSIS '26

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-manishkrishna.is--a.dev-00c4ff?style=for-the-badge&labelColor=050b18)](https://manish-k-07.github.io/manishkrishnakandrakota.in/)
[![CMU](https://img.shields.io/badge/🎓_CMU_MSIS-Fall_2026_Admit-c41230?style=for-the-badge&labelColor=050b18)](https://www.cs.cmu.edu/)
[![IEEE](https://img.shields.io/badge/📄_IEEE-Published_Author-00629b?style=for-the-badge&labelColor=050b18)](https://ieeexplore.ieee.org/document/10921771)
[![Checkstyle](https://img.shields.io/badge/⬡_Checkstyle-130+_Contributions-00ff88?style=for-the-badge&labelColor=050b18)](https://github.com/checkstyle/checkstyle/pulls?q=is%3Apr+author%3AMANISH-K-07+is%3Aclosed)

</div>

---

## ✦ Overview

Personal portfolio website for **Manish Krishna Kandrakota** — built entirely from scratch with vanilla HTML, CSS, and JavaScript. No frameworks, no component libraries, no build tools. Just hand-crafted code with a strong emphasis on performance, design quality, and interactive detail.

The design theme is **Blueprint Noir** — deep navy and black with electric cyan accents, engineering graph-paper grid texture, and glassmorphism cards.

---

## ✦ Features

### 🎨 Design & Interactions
- **Full-page interactive particle canvas** — mouse repulsion physics, click-to-burst, neighbour connection lines, wrapping edges
- **Custom cursor** — glowing cyan dot with a lagging ring that expands on hover
- **Profile image** — zoom + glow effect on hover
- **3D card tilt** — `rotateX`/`rotateY` on project card mousemove
- **Section reveal** — IntersectionObserver fade-up animations
- **Animated stat counters** — count-up on page load
- **Light / dark theme toggle** — persisted via localStorage

### 📑 Sections
| # | Section | Highlights |
|---|---------|------------|
| 01 | **About** | 3 expertise cards — Systems, Static Analysis, Security |
| 02 | **Projects** | 6 featured projects with gradient bars and 3D tilt |
| 03 | **Research** | IEEE paper + Checkstyle OSS sidebar |
| 04 | **Experience** | Checkstyle open-source timeline + certifications |
| 05 | **Academic** | Full education timeline from SSC → CMU |
| 06 | **Contact** | Email, GitHub, LinkedIn, Medium, Hashnode |

### 🪟 Interactive Modals
- **SNIST modal** — SGPA performance chart (S1–S7 with projection), semester-by-semester course tabs with real grades, official transcripts, 2 LORs
- **Capstone modal** — SphinxATS project breakdown
- **Checkstyle modal** — animated contribution breakdown bars (130 PRs), GitHub links, Roman Ivanov's LOR

---

## ✦ Tech Stack

```
HTML5 · CSS3 · Vanilla JavaScript
Canvas API (particle system)
IntersectionObserver API
CSS Custom Properties (theming)
CSS Animations & Keyframes
Google Fonts — DM Serif Display · JetBrains Mono · DM Sans
```

Zero dependencies. Zero build step. Zero frameworks.

---

## ✦ Project Structure

```
manishkrishnakandrakota.in/
│
├── index.html                        # Main portfolio page
├── style.css                         # All styles — Blueprint Noir theme
├── script.js                         # Particles, cursor, modals, counters
│
├── assets/
│   ├── profile.jpg                   # Profile photo
│   └── resume.pdf                    # Downloadable resume
│
├── ManishK_BTech_Transcripts.pdf     # Official SNIST transcripts
├── ManishK_LOR_Dr_K_Shirisha.pdf     # LOR — HoD, CSE, SNIST
├── ManishK_LOR_Ch_SrinathReddy.pdf   # LOR — Faculty, CSE, SNIST
├── ManishK_LOR_RomanIvanov.pdf       # LOR — Lead Dev, Checkstyle
│
└── README.md
```

---

## ✦ Local Development

No install. No setup. Just open the file.

```bash
git clone https://github.com/MANISH-K-07/manishkrishnakandrakota.in.git
cd manishkrishnakandrakota.in

# Option 1 — open directly
open index.html

# Option 2 — local server (avoids file:// quirks with PDFs)
npx serve .
# or
python3 -m http.server 8000
```

---

## ✦ Deployment

Hosted on **GitHub Pages** — auto-deploys on every push to `main`.

```
Settings → Pages → Deploy from branch → main → / (root)
```

> **Note:** If using Cloudflare in front of GitHub Pages, turn off **Scrape Shield → Email Address Obfuscation** — otherwise Cloudflare will rewrite the contact email into an encoded blob.

---

## ✦ Featured Projects

| Project | Description | Stack |
|---------|-------------|-------|
| [NodeSync](https://github.com/MANISH-K-07/NodeSync) | Fault-tolerant distributed key-value store | Python · Distributed Systems |
| [SecureFlow](https://github.com/MANISH-K-07/SecureFlow) | Static taint-analysis security tool | Java · Program Analysis |
| [CodeChecker](https://github.com/MANISH-K-07/CodeChecker) | AST-level Java linter + complexity analyzer | Java · Static Analysis |
| [Py2C](https://github.com/MANISH-K-07/Py2C) | Python-to-C optimizer from first principles | Python · Compiler Design |
| [PyScope](https://github.com/MANISH-K-07/PyScope) | Lightweight Python performance profiler | Python · Runtime Analysis |
| [ModelTrace](https://github.com/MANISH-K-07/ModelTrace) | ML model inspection and stress-testing framework | Python · ML Systems |
| [SphinxATS](https://github.com/MANISH-K-07/SphinxATS) | Applicant Tracking System — capstone project | Python · NLP |

---

## ✦ Research

**Charity with Clarity: Crowdfunding using Smart Contracts**
*IEEE Xplore · 2024*
[→ Read on IEEE Xplore](https://ieeexplore.ieee.org/document/10921771)

---

## ✦ Open Source

**130+ merged pull requests** to [Checkstyle](https://github.com/checkstyle/checkstyle) — one of the most widely used Java static analysis tools.

[→ View all contributions](https://github.com/checkstyle/checkstyle/pulls?q=is%3Apr+author%3AMANISH-K-07+is%3Aclosed)

---

## ✦ Connect

<div align="center">

[![Email](https://img.shields.io/badge/Email-manish07070707@gmail.com-00c4ff?style=flat-square&logo=gmail&logoColor=white&labelColor=050b18)](mailto:manish07070707@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-MANISH--K--07-white?style=flat-square&logo=github&logoColor=white&labelColor=050b18)](https://github.com/MANISH-K-07)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-manish--k--kandrakota-0077b5?style=flat-square&logo=linkedin&logoColor=white&labelColor=050b18)](https://www.linkedin.com/in/manish-k-kandrakota/)
[![Medium](https://img.shields.io/badge/Medium-@MANISH--K--07-white?style=flat-square&logo=medium&logoColor=white&labelColor=050b18)](https://medium.com/@MANISH-K-07)

</div>

---

<div align="center">

Built from scratch · No frameworks · No dependencies

*© 2026 Manish Krishna Kandrakota*

</div>

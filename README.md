# Muzaffer Ali Khan — Personal Editorial Portfolio

A bold, expressive, and editorial personal portfolio website for **Muzaffer Ali Khan**—a Data Scientist, ML/AI Engineer, and Computer Science student at **Cluster University Srinagar** based in Srinagar, Jammu & Kashmir.

Built at the intersection of low-level systems (C, Java, DSA) and applied machine intelligence (PyTorch, RAG, Eval Slicing).

---

## ✦ Key Features

- **Editorial & Bold Aesthetic**: Inspired by *Stripe Press*, *The Verge*, and modern AI research labs. Features high-contrast editorial typography (*Instrument Serif*, *Fraunces*, *Plus Jakarta Sans*, *JetBrains Mono*).
- **Dark / Light Mode**: Default deep obsidian ink (`#0B0C0E`) with smooth toggle to warm archival paper (`#F6F4EF`), persisted via `localStorage`.
- **Signature Accents**: Acid Vermilion (`#E84A27`) paired with subtle Electric Cobalt (`#3B6EFF`) telemetry badges.
- **Interactive Latent-Grid Canvas**: Subtle 60 FPS dot-matrix canvas responding to mouse proximity, simulating vector embeddings and graph node links.
- **Featured Builds with Expandable Tabs**:
  - **SignalLens** — Autonomous Research & Eval Workbench (Cuts unsupported claims by 41%)
  - **AlgoPulse** — Visual DSA & Graph Pathfinder Engine (15+ algorithms benchmarked)
  - **PulseDrift** — Local Data & Model Behavior Monitor (Sub-second drift detection)
  - Seamless in-card toggle between **Overview & Metrics** and **Architecture & Tradeoffs**.
- **Interactive Lab Note Deep-Dives**: Detailed modal writeups for each project covering problem statement, hypothesis, experimental benchmarks table, accepted tradeoffs, and code implementation with one-click copy.
- **Interactive Visual DSA Sandbox**: Live, working pathfinding simulator (Dijkstra, A*, BFS) on a 12x7 interactive grid with obstacle toggling and latency/hop telemetry.
- **Live Kashmir Valley Telemetry**: Real-time Srinagar, J&K clock (`IST HH:MM:SS`), coordinates (`34.0837° N, 74.7973° E`), and status indicator.
- **Quick-Copy Email & Toasts**: Instant clipboard feedback for recruiters and collaborators.
- **Zero-Dependency Production Architecture**: Works completely out-of-the-box by double-clicking `index.html` or running a simple local server.

---

## ✦ Directory Structure

```
Project Muzaffar 5th/
├── index.html                   # Production-ready editorial portfolio website
├── README.md                    # Project documentation & configuration guide
└── src/
    ├── data/
    │   ├── portfolio.ts         # TypeScript configuration file (all personal info & links)
    │   └── portfolio.js         # Browser/Node data source mirroring portfolio.ts
    ├── styles/
    │   └── editorial.css        # Editorial typography, animations, dark/light themes, badges
    └── scripts/
        ├── canvas-grid.js       # Interactive latent-grid / dot-matrix canvas background
        └── main.js              # Theme manager, IST clock, expandable tabs, modal, sandbox, toasts
```

---

## ✦ Quick Start & Local Preview

### Option 1: Direct Browser Opening
Simply double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Python)
If Python is installed on your machine, run:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## ✦ How to Update Personal Links & Details

All information is centralized in **`src/data/portfolio.ts`** (and mirrored in **`src/data/portfolio.js`**):

1. **Email & Socials**:
   - Update `email`, `github`, `linkedin`, and `leetcode` in `src/data/portfolio.ts` (and `src/data/portfolio.js`).
2. **Project Links**:
   - In `builds`, update `links.demo` and `links.github` with your real URLs.
3. **Lab Notes & Benchmarks**:
   - Update or add new metrics, hypotheses, and code snippets in the `labNote` object for each build.
4. **Currently Tinkering With**:
   - Update `tinkeringLog` to reflect your latest experiments and milestones.

---

## ✦ Deployment

### GitHub Pages (Instant 1-Click Deployment)
1. Initialize git in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Muzaffer Ali Khan editorial portfolio"
   ```
2. Create a repository on GitHub (e.g., `muzaffer-ali-khan.github.io` or `portfolio`).
3. Push your repository and enable **GitHub Pages** from the repository Settings (Source: `Deploy from a branch` -> `main` / `root`).

### Vercel / Netlify
Drop this repository into [Vercel](https://vercel.com) or [Netlify](https://netlify.com)—no build command is required, as the static files serve immediately with high performance.

---

© 2026 Muzaffer Ali Khan · Cluster University Srinagar · Srinagar, Jammu & Kashmir

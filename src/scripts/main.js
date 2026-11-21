/**
 * =========================================================================
 * MUZAFFER ALI KHAN — EDITORIAL PORTFOLIO CORE APPLICATION ENGINE
 * =========================================================================
 * Handles theme toggling, IST telemetry clock, expandable card tabs,
 * deep-dive Lab Note modal, interactive DSA sandbox, copy toasts, and smooth nav.
 */

(function () {
  "use strict";

  // Cache data from PORTFOLIO_DATA
  const DATA = window.PORTFOLIO_DATA || {};

  // DOM Elements
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIconSun = document.getElementById("theme-icon-sun");
  const themeIconMoon = document.getElementById("theme-icon-moon");
  const istClockEl = document.getElementById("ist-clock");
  const toastContainer = document.getElementById("toast-container");
  const labNoteModal = document.getElementById("lab-note-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");

  /* =========================================================================
   * 1. THEME MANAGEMENT (Dark Mode Default + LocalStorage)
   * ========================================================================= */
  function getPreferredTheme() {
    const saved = localStorage.getItem("mak_portfolio_theme");
    if (saved) return saved;
    // Default to dark as requested in specification
    return "dark";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mak_portfolio_theme", theme);

    if (themeIconSun && themeIconMoon) {
      if (theme === "light") {
        themeIconSun.classList.add("hidden");
        themeIconMoon.classList.remove("hidden");
      } else {
        themeIconSun.classList.remove("hidden");
        themeIconMoon.classList.add("hidden");
      }
    }
  }

  // Initialize theme immediately
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
      showToast(`Switched to ${next === "dark" ? "Obsidian Dark" : "Archival Light"} mode`);
    });
  }

  /* =========================================================================
   * 2. LIVE SRINAGAR, J&K TELEMETRY CLOCK (Indian Standard Time UTC+05:30)
   * ========================================================================= */
  function updateISTClock() {
    if (!istClockEl) return;
    const now = new Date();
    // Format in Asia/Kolkata timezone
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
    try {
      const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
      istClockEl.textContent = `${timeString} IST`;
    } catch (e) {
      // Fallback
      istClockEl.textContent = now.toTimeString().split(" ")[0] + " IST";
    }
  }
  updateISTClock();
  setInterval(updateISTClock, 1000);

  /* =========================================================================
   * 3. TOAST NOTIFICATION SYSTEM
   * ========================================================================= */
  function showToast(message, duration = 3000) {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast-pill flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium shadow-2xl transition-all";
    toast.innerHTML = `
      <span class="flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
      <span class="text-xs font-mono tracking-wide">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }
  window.showToast = showToast;

  /* =========================================================================
   * 4. COPY TO CLIPBOARD HELPER
   * ========================================================================= */
  function setupCopyButtons() {
    const copyEmailButtons = document.querySelectorAll("[data-copy-email]");
    copyEmailButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = DATA.socials?.email || "muzaffer.email@domain.com";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => {
            showToast(`Copied email to clipboard: ${email}`);
          }).catch(() => {
            fallbackCopy(email);
          });
        } else {
          fallbackCopy(email);
        }
      });
    });
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      showToast(`Copied: ${text}`);
    } catch (err) {
      showToast(`Email: ${text}`);
    }
    document.body.removeChild(ta);
  }

  /* =========================================================================
   * 5. FEATURED BUILDS: INTERACTIVE EXPANDABLE TABS (Overview vs Architecture)
   * ========================================================================= */
  function setupBuildTabs() {
    const tabTriggers = document.querySelectorAll(".card-tab-btn");

    tabTriggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cardId = btn.getAttribute("data-card-id");
        const targetTab = btn.getAttribute("data-tab-target"); // "overview" or "architecture"
        const cardContainer = document.getElementById(`build-card-${cardId}`);
        if (!cardContainer) return;

        // Update Tab Buttons in this card
        const siblingButtons = cardContainer.querySelectorAll(".card-tab-btn");
        siblingButtons.forEach((b) => {
          const isActive = b.getAttribute("data-tab-target") === targetTab;
          b.setAttribute("data-active", isActive ? "true" : "false");
          if (isActive) {
            b.classList.add("bg-vermilion", "text-white");
            b.classList.remove("text-muted", "hover:text-primary");
          } else {
            b.classList.remove("bg-vermilion", "text-white");
            b.classList.add("text-muted", "hover:text-primary");
          }
        });

        // Switch panels
        const panelOverview = cardContainer.querySelector(".panel-overview");
        const panelArchitecture = cardContainer.querySelector(".panel-architecture");

        if (targetTab === "overview") {
          panelOverview?.classList.remove("hidden");
          panelArchitecture?.classList.add("hidden");
        } else {
          panelOverview?.classList.add("hidden");
          panelArchitecture?.classList.remove("hidden");
        }
      });
    });
  }

  /* =========================================================================
   * 6. LAB NOTE DEEP-DIVE MODAL SYSTEM
   * ========================================================================= */
  function setupLabNoteModal() {
    const triggerButtons = document.querySelectorAll("[data-open-labnote]");
    if (!labNoteModal) return;

    triggerButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const buildId = btn.getAttribute("data-open-labnote");
        openLabNote(buildId);
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeLabNote);
    }

    labNoteModal.addEventListener("click", (e) => {
      if (e.target === labNoteModal) {
        closeLabNote();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !labNoteModal.classList.contains("hidden")) {
        closeLabNote();
      }
    });
  }

  function openLabNote(buildId) {
    const build = (DATA.builds || []).find((b) => b.id === buildId);
    if (!build || !build.labNote) return;

    const note = build.labNote;
    const contentContainer = document.getElementById("labnote-modal-content");
    if (!contentContainer) return;

    // Render Benchmarks rows
    const benchmarksHtml = (note.benchmarks || [])
      .map(
        (b) => `
        <tr class="border-b border-structural/40 text-xs font-mono">
          <td class="py-2.5 px-3 font-medium text-primary">${b.metric}</td>
          <td class="py-2.5 px-3 text-muted">${b.baseline}</td>
          <td class="py-2.5 px-3 text-primary font-semibold">${b.achieved}</td>
          <td class="py-2.5 px-3">
            <span class="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${
              b.delta.startsWith("-") && b.metric.includes("Latency") || b.metric.includes("Hallucination") || b.metric.includes("Pause") || b.metric.includes("Footprint") || b.metric.includes("Overhead")
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : b.delta.startsWith("+")
                ? "bg-cobalt/10 text-cobalt border border-cobalt/20"
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }">${b.delta}</span>
          </td>
        </tr>`
      )
      .join("");

    // Render Key Insights
    const insightsHtml = (note.keyInsights || [])
      .map(
        (insight) => `
        <li class="flex items-start gap-2.5 text-sm text-secondary leading-relaxed">
          <span class="text-vermilion mt-1 text-base">▸</span>
          <span>${insight}</span>
        </li>`
      )
      .join("");

    // Render Tradeoffs
    const tradeoffsHtml = (note.tradeoffsAccepted || [])
      .map(
        (tradeoff) => `
        <li class="flex items-start gap-2.5 text-sm text-secondary leading-relaxed">
          <span class="text-amber-500 mt-1 text-base">⚠</span>
          <span>${tradeoff}</span>
        </li>`
      )
      .join("");

    contentContainer.innerHTML = `
      <!-- Header -->
      <div class="mb-6 pb-6 border-b border-structural">
        <div class="flex items-center gap-3 flex-wrap mb-3">
          <span class="badge-vermilion text-xs font-mono px-2.5 py-1 rounded-md uppercase tracking-wider font-semibold">${build.category}</span>
          <span class="text-xs font-mono text-muted">SLUG: ${note.slug}</span>
          <span class="text-xs font-mono text-muted">·</span>
          <span class="text-xs font-mono text-cobalt font-medium">⏱ ${note.readingTime}</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-display font-bold text-primary tracking-tightest leading-tight mb-2">
          ${note.title}
        </h2>
        <p class="text-sm text-secondary font-mono">
          Artifact from the personal engineering lab of <span class="text-primary font-semibold">Muzaffer Ali Khan</span>
        </p>
      </div>

      <!-- Problem & Hypothesis Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 rounded-xl bg-surface-subtle border border-structural">
          <div class="text-xs font-mono text-vermilion uppercase font-semibold mb-1">01 / The Real-World Failure Mode</div>
          <p class="text-sm text-secondary leading-relaxed">${note.problemStatement}</p>
        </div>
        <div class="p-4 rounded-xl bg-surface-subtle border border-structural">
          <div class="text-xs font-mono text-cobalt uppercase font-semibold mb-1">02 / Algorithmic Hypothesis</div>
          <p class="text-sm text-secondary leading-relaxed">${note.coreHypothesis}</p>
        </div>
      </div>

      <!-- Key Insights -->
      <div class="mb-6 p-4 rounded-xl bg-surface-card border border-structural">
        <div class="text-xs font-mono text-muted uppercase font-semibold mb-3">Empirical Insights & Findings</div>
        <ul class="space-y-2">
          ${insightsHtml}
        </ul>
      </div>

      <!-- Benchmarks Table -->
      <div class="mb-6 overflow-hidden rounded-xl border border-structural bg-surface-card">
        <div class="px-4 py-3 bg-surface-subtle border-b border-structural flex items-center justify-between">
          <span class="text-xs font-mono font-semibold uppercase text-primary">Experimental Benchmarks</span>
          <span class="text-[11px] font-mono text-muted">Deterministic Test Rig</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-structural text-[11px] font-mono uppercase text-muted bg-surface-subtle/50">
                <th class="py-2 px-3">Evaluation Metric</th>
                <th class="py-2 px-3">Baseline</th>
                <th class="py-2 px-3">Muzaffer's Build</th>
                <th class="py-2 px-3">Performance Delta</th>
              </tr>
            </thead>
            <tbody>
              ${benchmarksHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Code Implementation -->
      ${
        note.codeSnippet
          ? `
        <div class="mb-6 rounded-xl border border-structural overflow-hidden bg-[#0D0F14]">
          <div class="px-4 py-2.5 bg-[#141720] border-b border-structural/60 flex items-center justify-between">
            <span class="text-xs font-mono text-muted">src/core/${note.codeSnippet.filename}</span>
            <button id="copy-modal-code-btn" class="text-xs font-mono text-muted hover:text-white px-2 py-1 rounded bg-[#1B1E28] transition-colors">
              Copy Code
            </button>
          </div>
          <pre class="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed"><code>${escapeHtml(
            note.codeSnippet.code
          )}</code></pre>
        </div>
      `
          : ""
      }

      <!-- Tradeoffs Accepted -->
      <div class="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-4">
        <div class="text-xs font-mono text-amber-500 uppercase font-semibold mb-2">Architectural Trade-Offs Accepted</div>
        <ul class="space-y-1.5">
          ${tradeoffsHtml}
        </ul>
      </div>

      <!-- Footer CTA in modal -->
      <div class="pt-4 border-t border-structural flex items-center justify-between flex-wrap gap-3">
        <div class="text-xs font-mono text-muted">
          Looking to review complete test logs or reproduce benchmarks?
        </div>
        <div class="flex items-center gap-3">
          <a href="${build.links.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span>GitHub Repository</span> ↗
          </a>
          <button onclick="window.closeLabNote()" class="btn-primary text-xs font-mono px-4 py-1.5 rounded-lg">
            Done Reading
          </button>
        </div>
      </div>
    `;

    // Code copy inside modal
    const copyCodeBtn = document.getElementById("copy-modal-code-btn");
    if (copyCodeBtn && note.codeSnippet) {
      copyCodeBtn.addEventListener("click", () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(note.codeSnippet.code);
          showToast(`Copied ${note.codeSnippet.filename} to clipboard`);
        }
      });
    }

    labNoteModal.classList.remove("hidden");
    labNoteModal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeLabNote() {
    if (!labNoteModal) return;
    labNoteModal.classList.add("hidden");
    labNoteModal.classList.remove("flex");
    document.body.style.overflow = "";
  }
  window.closeLabNote = closeLabNote;

  function escapeHtml(string) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return string.replace(/[&<>"']/g, (m) => map[m]);
  }

  /* =========================================================================
   * 7. TECH STACK FILTERING & INSPECTION (Bento Card 1)
   * ========================================================================= */
  function setupSkillFilter() {
    const filterButtons = document.querySelectorAll(".skill-category-filter-btn");
    const skillCards = document.querySelectorAll(".skill-item-card");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selected = btn.getAttribute("data-category");

        filterButtons.forEach((b) => {
          if (b === btn) {
            b.classList.add("bg-vermilion", "text-white");
            b.classList.remove("bg-surface-subtle", "text-muted");
          } else {
            b.classList.remove("bg-vermilion", "text-white");
            b.classList.add("bg-surface-subtle", "text-muted");
          }
        });

        skillCards.forEach((card) => {
          const cat = card.getAttribute("data-category");
          if (selected === "all" || cat === selected) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  /* =========================================================================
   * 8. INTERACTIVE ALGOPULSE MINI SANDBOX (Pathfinder & Complexity Simulator)
   * ========================================================================= */
  function setupAlgoPulseSandbox() {
    const gridEl = document.getElementById("sandbox-grid");
    if (!gridEl) return;

    const rows = 7;
    const cols = 12;
    let grid = [];
    let startNode = { r: 1, c: 1 };
    let endNode = { r: 5, c: 10 };
    let walls = new Set(["2,3", "3,3", "4,3", "3,6", "4,6", "5,6", "2,8", "3,8"]);
    let isRunning = false;
    let animationSpeed = 45;

    // Metric display elements
    const visitedMetricEl = document.getElementById("algo-metric-visited");
    const pathMetricEl = document.getElementById("algo-metric-path");
    const timeMetricEl = document.getElementById("algo-metric-time");
    const algoSelectEl = document.getElementById("algo-select");
    const runBtn = document.getElementById("algo-run-btn");
    const resetBtn = document.getElementById("algo-reset-btn");
    const randomWallsBtn = document.getElementById("algo-random-btn");

    function renderGrid() {
      gridEl.innerHTML = "";
      gridEl.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
      grid = [];

      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const cell = document.createElement("div");
          cell.className = "w-full aspect-square rounded-[4px] border border-structural/40 flex items-center justify-center text-[10px] font-mono cursor-pointer transition-all duration-150 select-none";
          const key = `${r},${c}`;

          if (r === startNode.r && c === startNode.c) {
            cell.classList.add("bg-emerald-500", "text-black", "font-bold");
            cell.textContent = "S";
            cell.title = "Source (Srinagar Base)";
          } else if (r === endNode.r && c === endNode.c) {
            cell.classList.add("bg-vermilion", "text-white", "font-bold");
            cell.textContent = "G";
            cell.title = "Target Goal (Model Deployment)";
          } else if (walls.has(key)) {
            cell.classList.add("bg-[#2D313E]", "border-[#3E4455]");
          } else {
            cell.classList.add("bg-surface-subtle/40", "hover:bg-surface-subtle");
          }

          cell.addEventListener("click", () => {
            if (isRunning) return;
            if ((r === startNode.r && c === startNode.c) || (r === endNode.r && c === endNode.c)) return;

            if (walls.has(key)) {
              walls.delete(key);
            } else {
              walls.add(key);
            }
            renderGrid();
          });

          gridEl.appendChild(cell);
          grid[r][c] = cell;
        }
      }
    }

    async function runAlgorithm() {
      if (isRunning) return;
      isRunning = true;
      runBtn.disabled = true;
      runBtn.classList.add("opacity-50");

      // Reset previous search colors while preserving walls
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const key = `${r},${c}`;
          if (key !== `${startNode.r},${startNode.c}` && key !== `${endNode.r},${endNode.c}` && !walls.has(key)) {
            grid[r][c].className = "w-full aspect-square rounded-[4px] border border-structural/40 flex items-center justify-center text-[10px] font-mono cursor-pointer transition-all duration-150 select-none bg-surface-subtle/40 hover:bg-surface-subtle";
          }
        }
      }

      const selectedAlgo = algoSelectEl ? algoSelectEl.value : "dijkstra";
      const startTime = performance.now();
      let visitedCount = 0;

      // Dijkstra / BFS search implementation
      const queue = [{ r: startNode.r, c: startNode.c, dist: 0 }];
      const visited = new Set([`${startNode.r},${startNode.c}`]);
      const parentMap = new Map();
      let found = false;

      while (queue.length > 0) {
        // Sort for Dijkstra or A*
        if (selectedAlgo === "astar") {
          queue.sort((a, b) => {
            const hA = Math.abs(a.r - endNode.r) + Math.abs(a.c - endNode.c);
            const hB = Math.abs(b.r - endNode.r) + Math.abs(b.c - endNode.c);
            return (a.dist + hA) - (b.dist + hB);
          });
        }

        const curr = queue.shift();
        visitedCount++;
        if (visitedMetricEl) visitedMetricEl.textContent = visitedCount;

        if (curr.r === endNode.r && curr.c === endNode.c) {
          found = true;
          break;
        }

        // Color visited node
        if (!(curr.r === startNode.r && curr.c === startNode.c)) {
          grid[curr.r][curr.c].classList.remove("bg-surface-subtle/40");
          grid[curr.r][curr.c].classList.add("bg-cobalt/25", "border-cobalt/40");
          await new Promise((res) => setTimeout(res, animationSpeed));
        }

        const dirs = [
          { dr: -1, dc: 0 },
          { dr: 1, dc: 0 },
          { dr: 0, dc: -1 },
          { dr: 0, dc: 1 }
        ];

        for (const d of dirs) {
          const nr = curr.r + d.dr;
          const nc = curr.c + d.dc;
          const nKey = `${nr},${nc}`;

          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !walls.has(nKey) && !visited.has(nKey)) {
            visited.add(nKey);
            parentMap.set(nKey, curr);
            queue.push({ r: nr, c: nc, dist: curr.dist + 1 });
          }
        }
      }

      const elapsed = (performance.now() - startTime).toFixed(1);
      if (timeMetricEl) timeMetricEl.textContent = `${elapsed}ms`;

      // Animate Shortest Path
      if (found) {
        let currKey = `${endNode.r},${endNode.c}`;
        let pathLen = 0;
        const pathNodes = [];

        while (parentMap.has(currKey)) {
          const parent = parentMap.get(currKey);
          if (parent.r === startNode.r && parent.c === startNode.c) break;
          pathNodes.unshift(parent);
          currKey = `${parent.r},${parent.c}`;
          pathLen++;
        }

        if (pathMetricEl) pathMetricEl.textContent = `${pathLen + 1} hops`;

        for (const p of pathNodes) {
          grid[p.r][p.c].classList.remove("bg-cobalt/25", "border-cobalt/40");
          grid[p.r][p.c].classList.add("bg-vermilion", "text-white", "font-bold", "scale-105");
          await new Promise((res) => setTimeout(res, 35));
        }
      } else {
        if (pathMetricEl) pathMetricEl.textContent = "Unreachable (0)";
        showToast("Path unreachable! All routes blocked by obstacles.");
      }

      isRunning = false;
      runBtn.disabled = false;
      runBtn.classList.remove("opacity-50");
    }

    renderGrid();

    if (runBtn) runBtn.addEventListener("click", runAlgorithm);
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (isRunning) return;
        renderGrid();
        if (visitedMetricEl) visitedMetricEl.textContent = "0";
        if (pathMetricEl) pathMetricEl.textContent = "0";
        if (timeMetricEl) timeMetricEl.textContent = "0ms";
      });
    }
    if (randomWallsBtn) {
      randomWallsBtn.addEventListener("click", () => {
        if (isRunning) return;
        walls.clear();
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if ((r === startNode.r && c === startNode.c) || (r === endNode.r && c === endNode.c)) continue;
            if (Math.random() < 0.24) {
              walls.add(`${r},${c}`);
            }
          }
        }
        renderGrid();
        if (visitedMetricEl) visitedMetricEl.textContent = "0";
        if (pathMetricEl) pathMetricEl.textContent = "0";
        if (timeMetricEl) timeMetricEl.textContent = "0ms";
      });
    }
  }

  /* =========================================================================
   * 9. MOBILE MENU TOGGLE
   * ========================================================================= */
  function setupMobileMenu() {
    if (!mobileMenuBtn || !mobileMenuDrawer) return;

    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuDrawer.classList.contains("hidden");
      if (isExpanded) {
        mobileMenuDrawer.classList.remove("hidden");
      } else {
        mobileMenuDrawer.classList.add("hidden");
      }
    });

    const mobileLinks = mobileMenuDrawer.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuDrawer.classList.add("hidden");
      });
    });
  }

  /* =========================================================================
   * 10. ACTIVE SCROLL SPY
   * ========================================================================= */
  function setupScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-section-link");

    window.addEventListener("scroll", () => {
      let currentSectionId = "";
      const scrollPos = window.scrollY + 160;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentSectionId}`) {
          link.classList.add("text-vermilion");
          link.classList.remove("text-muted");
        } else {
          link.classList.remove("text-vermilion");
          link.classList.add("text-muted");
        }
      });
    });
  }

  /* =========================================================================
   * INITIALIZATION
   * ========================================================================= */
  document.addEventListener("DOMContentLoaded", () => {
    setupCopyButtons();
    setupBuildTabs();
    setupLabNoteModal();
    setupSkillFilter();
    setupAlgoPulseSandbox();
    setupMobileMenu();
    setupScrollSpy();

    // Render Lucide icons if loaded
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  });

})();

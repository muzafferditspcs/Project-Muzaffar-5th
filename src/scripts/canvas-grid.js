/**
 * INTERACTIVE LATENT-GRID / DOT-MATRIX CANVAS
 * Renders an ambient neural embedding & algorithmic graph field.
 * Handles mouse proximity vector links, ambient drift, and theme reactivity.
 */

(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;

  // Configuration
  const spacing = 36;
  let dots = [];
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

  function initGrid() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(dpr, dpr);

    dots = [];
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          baseX: c * spacing,
          baseY: r * spacing,
          x: c * spacing,
          y: r * spacing,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0015 + Math.random() * 0.002,
          radius: 1.1 + (Math.random() > 0.92 ? 1.0 : 0),
          isNode: Math.random() > 0.88 // 12% are active graph vertices
        });
      }
    }
  }

  function getThemeColors() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    return {
      dotBase: isLight ? "rgba(18, 19, 22, 0.12)" : "rgba(243, 241, 236, 0.14)",
      nodeActive: isLight ? "rgba(232, 74, 39, 0.45)" : "rgba(232, 74, 39, 0.65)",
      vectorLine: isLight ? "rgba(59, 110, 255, 0.15)" : "rgba(59, 110, 255, 0.22)",
      mouseGlow: isLight ? "rgba(232, 74, 39, 0.25)" : "rgba(232, 74, 39, 0.35)"
    };
  }

  let lastTime = 0;

  function render(time) {
    if (!lastTime) lastTime = time;
    const delta = time - lastTime;
    lastTime = time;

    ctx.clearRect(0, 0, width, height);
    const colors = getThemeColors();

    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    const mouseRange = 140;
    const mouseRangeSq = mouseRange * mouseRange;

    // Draw active links between nearby active nodes
    ctx.lineWidth = 0.8;
    for (let i = 0; i < dots.length; i += 3) {
      const d1 = dots[i];
      if (!d1.isNode) continue;

      for (let j = i + 1; j < Math.min(i + 15, dots.length); j++) {
        const d2 = dots[j];
        if (!d2.isNode) continue;

        const dx = d1.x - d2.x;
        const dy = d1.y - d2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 4800) {
          const alpha = (1 - distSq / 4800) * 0.28;
          ctx.strokeStyle = colors.vectorLine.replace(/[\d\.]+\)$/, `${alpha})`);
          ctx.beginPath();
          ctx.moveTo(d1.x, d1.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.stroke();
        }
      }
    }

    // Render individual grid points
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];

      // Ambient harmonic motion
      const wave = Math.sin(time * dot.speed + dot.phase);
      let renderX = dot.baseX + wave * 2.2;
      let renderY = dot.baseY + Math.cos(time * dot.speed * 0.8 + dot.phase) * 2.2;

      // Mouse displacement & interactive attraction
      const dx = mouse.x - renderX;
      const dy = mouse.y - renderY;
      const distSq = dx * dx + dy * dy;

      let radius = dot.radius;
      let fill = dot.isNode ? colors.nodeActive : colors.dotBase;

      if (distSq < mouseRangeSq) {
        const dist = Math.sqrt(distSq);
        const factor = (1 - dist / mouseRange);
        renderX -= (dx / dist) * factor * 16;
        renderY -= (dy / dist) * factor * 16;
        radius += factor * 1.6;

        if (factor > 0.4) {
          fill = colors.mouseGlow;
        }
      }

      dot.x = renderX;
      dot.y = renderY;

      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(renderX, renderY, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Event Listeners
  window.addEventListener("resize", () => {
    initGrid();
  });

  const heroSection = document.getElementById("hero-section");
  if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    });

    heroSection.addEventListener("mouseleave", () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    });
  }

  // Initialize
  initGrid();
  animationFrameId = requestAnimationFrame(render);
})();

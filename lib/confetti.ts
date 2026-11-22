"use client";

/** A small, dependency-free confetti burst from a point (skipped for reduced motion). */
export function burst(x: number, y: number) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#2dd4bf", "#5eead4", "#f9c97c", "#7dd3fc", "#c4a7ff"];
  for (let i = 0; i < 26; i++) {
    const p = document.createElement("span");
    const size = 5 + Math.random() * 5;
    Object.assign(p.style, {
      position: "fixed", left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size * 0.6}px`,
      background: colors[i % colors.length], borderRadius: "2px", pointerEvents: "none", zIndex: "90",
    });
    document.body.appendChild(p);
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 90;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;
    p.animate(
      [
        { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 80}px)) rotate(${Math.random() * 540}deg)`, opacity: 0 },
      ],
      { duration: 800 + Math.random() * 400, easing: "cubic-bezier(.2,.7,.3,1)" }
    ).onfinish = () => p.remove();
  }
}

(() => {
  const B = {
    wa: "201222560698", shown: "01222560698",
    tt: "https://www.tiktok.com/@sadaa.st",
    faqs: [
      ["المقاسات متاحة إزاي؟", "التيشرتات مقاسات واسعة (أوفر سايز)، ابعتلنا طولك ووزنك على واتساب ونرشحلك المقاس."],
      ["بتوصّلوا لكل محافظات مصر؟", "أيوه، التوصيل متاح لجميع محافظات مصر."],
      ["المحل فين بالظبط؟", "في عباس العقاد، القاهرة. تقدر تزورنا أو تطلب أونلاين."],
      ["إزاي أطلب؟", "ابعتلنا اللي عايزه والمقاس على واتساب أو تيك توك، ونأكد معاك الطلب."],
    ],
  };
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const wa = (t) => `https://wa.me/${B.wa}?text=${encodeURIComponent(t)}`;
  const hello = "أهلاً، عايز أطلب من ساده";

  ["#hdWa", "#navWa", "#heroWa", "#dWa", "#bannerWa"].forEach((s) => ($(s).href = wa(hello)));
  ["#heroTt", "#tt", "#fTt", "#dTt"].forEach((s) => ($(s).href = B.tt));
  $("#telWa").href = wa(hello); $("#telWa").textContent = B.shown;
  $("#tt").textContent = "sadaa.st";
  $("#faqList").innerHTML = B.faqs.map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join("");

  $$(".order-btn").forEach((b) => b.addEventListener("click", () => {
    window.open(wa(`أهلاً، عايز أطلب: ${b.dataset.p}\nالمقاس: `), "_blank", "noopener");
  }));

  const nav = $("#nav"), bg = $("#burger");
  const setMenu = (o) => { nav.classList.toggle("open", o); bg.setAttribute("aria-expanded", o); };
  bg.onclick = () => setMenu(!nav.classList.contains("open"));
  nav.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  $("#orderForm").onsubmit = (e) => {
    e.preventDefault();
    const name = $("#fName").value.trim(), items = $("#fItems").value.trim();
    if (!items) { $("#fErr").textContent = "اكتب اللي عايز تطلبه والمقاس."; $("#fItems").focus(); return; }
    $("#fErr").textContent = "";
    const lines = ["أهلاً، عايز أطلب:", "", items];
    if (name) lines.push(`الاسم: ${name}`);
    window.open(wa(lines.join("\n")), "_blank", "noopener");
  };

  $$(".tiles,.pgrid,.trust-in,.why-list").forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty("--d", i * 0.08 + "s")));
  const els = $$(".rv");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => en.forEach((x) => x.isIntersecting && (x.target.classList.add("in"), io.unobserve(x.target))), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  } else els.forEach((e) => e.classList.add("in"));

  let started = false;
  const start = () => {
    if (started) return; started = true;
    $("#loader").classList.add("gone"); root.classList.remove("loading"); root.classList.add("ready");
  };
  if (reduce) start();
  else {
    const min = new Promise((r) => setTimeout(r, 1600));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, loaded]).then(start);
    setTimeout(start, 4500);
  }

  const bar = $("#progress"), header = $(".header");
  let tick = false;
  addEventListener("scroll", () => { if (tick) return; tick = true; requestAnimationFrame(() => { tick = false; const max = root.scrollHeight - innerHeight; bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; header.classList.toggle("stuck", scrollY > 30); }); }, { passive: true });

  if (fine && !reduce) {
    $$(".pc,.tile").forEach((c) => {
      c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; c.style.transform = `perspective(900px) rotateY(${x * -3}deg) rotateX(${y * 3}deg) translateY(-3px)`; });
      c.addEventListener("pointerleave", () => { c.style.transform = ""; });
    });
  }
  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest(".btn"); if (!b || reduce) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), d = document.createElement("span");
    d.className = "ripple"; d.style.cssText = `inline-size:${s}px;block-size:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.append(d); setTimeout(() => d.remove(), 650);
  });
})();

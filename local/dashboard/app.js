const fftBands = [
  { label: "0–50", h: 42 },
  { label: "50–100", h: 68 },
  { label: "100–200", h: 55 },
  { label: "200–400", h: 34 },
  { label: "400+", h: 22 },
];

const thoughts = [
  {
    t: "09:02:11",
    kind: "",
    title: "Context ingested",
    body: "Feature window fw-1842 + RUL=142 h from MQTT topic lab/e32w/features.",
    code: "device_id=E32W-01 · alarm=false",
  },
  {
    t: "09:02:13",
    kind: "tool",
    title: "Schema-valid tool call",
    body: "create_work_order — schedule vibration inspection within 48 h.",
    code: '{"asset":"E32W-01","priority":"medium","due_h":48}',
  },
  {
    t: "09:02:14",
    kind: "",
    title: "Reasoning",
    body: "RMS and low-band FFT rising; crest within ISO Zone B. Recommend inspect, not emergency stop.",
    code: "human_review=false",
  },
  {
    t: "09:02:15",
    kind: "tool",
    title: "ERP mock response",
    body: "WO-2091 created · parts kit reserved · notify maintenance channel.",
    code: "status=accepted · latency=3.4s",
  },
];

const alerts = [
  { sev: "info", label: "INFO", msg: "MQTT stream stable · 0 dropped windows", when: "09:00" },
  { sev: "agent", label: "AGENT", msg: "RUL dipped below 160 h — inspection suggested", when: "09:02" },
  { sev: "reflex", label: "REFLEX", msg: "ISO 10816 Zone B threshold watch (buzzer idle)", when: "08:51" },
  { sev: "info", label: "INFO", msg: "LED D2 smoke test PASS (24 Aug 2026)", when: "W7" },
];

const erp = [
  {
    tool: "create_work_order",
    text: "Inspect KY-002 mount & bearing housing — E32W lab bench.",
    state: "ACCEPTED · WO-2091",
  },
  {
    tool: "notify_maintenance",
    text: "Message posted to simulated Slack/ERP channel #pdm-lab.",
    state: "DELIVERED",
  },
  {
    tool: "hold_spare_parts",
    text: "Reserve vibration sensor spare from inventory mock.",
    state: "HELD · schema OK",
  },
];

function $(id) {
  return document.getElementById(id);
}

function setClock() {
  const now = new Date();
  $("clock").textContent = now.toLocaleString("en-AU", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function renderFft() {
  const el = $("fftBars");
  el.innerHTML = "";
  fftBands.forEach((b, i) => {
    const s = document.createElement("span");
    s.style.height = `${b.h}%`;
    s.style.animationDelay = `${0.1 * i}s`;
    s.title = `${b.label} Hz`;
    el.appendChild(s);
  });
}

function renderRulChart() {
  const svg = $("rulChart");
  const pts = [210, 205, 198, 190, 182, 175, 168, 160, 152, 148, 145, 142];
  const w = 320;
  const h = 90;
  const max = 220;
  const min = 120;
  const step = w / (pts.length - 1);
  const path = pts
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / (max - min)) * (h - 12) - 6;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  svg.innerHTML = `
    <polyline fill="none" stroke="#c45c26" stroke-width="2.5" points=""></polyline>
    <path d="${path}" fill="none" stroke="#c45c26" stroke-width="2.5" />
    <path d="${path} L${w},${h} L0,${h} Z" fill="rgba(196,92,38,0.12)" />
  `;
}

function renderThoughts() {
  const stream = $("thoughtStream");
  stream.innerHTML = thoughts
    .map(
      (t) => `
    <article class="trace ${t.kind}">
      <time>${t.t}</time>
      <div>
        <strong>${t.title}</strong>
        <p>${t.body}</p>
        <code>${t.code}</code>
      </div>
    </article>`
    )
    .join("");
}

function renderAlerts() {
  $("alertList").innerHTML = alerts
    .map(
      (a) => `
    <li>
      <span><span class="sev ${a.sev}">${a.label}</span> · ${a.msg}</span>
      <span>${a.when}</span>
    </li>`
    )
    .join("");
}

function renderErp() {
  $("erpActions").innerHTML = erp
    .map(
      (e) => `
    <div class="erp-card">
      <div class="tool">${e.tool}()</div>
      <p>${e.text}</p>
      <div class="state">${e.state}</div>
    </div>`
    )
    .join("");
}

function jitter(val, amp, digits = 2) {
  return (val + (Math.random() - 0.5) * amp).toFixed(digits);
}

function tickLive() {
  $("rms").textContent = jitter(0.42, 0.04);
  $("peak").textContent = jitter(1.8, 0.12);
  $("crest").textContent = jitter(3.1, 0.15);
  $("temp").textContent = jitter(38.2, 0.4, 1);
  $("latency").textContent = jitter(3.4, 0.8, 1);
  const rul = 140 + Math.round(Math.random() * 4);
  $("rulHours").textContent = String(rul);
}

function init() {
  setClock();
  setInterval(setClock, 1000);
  renderFft();
  renderRulChart();
  renderThoughts();
  renderAlerts();
  renderErp();
  tickLive();
  setInterval(tickLive, 1800);
  setInterval(() => {
    fftBands.forEach((b) => {
      b.h = Math.max(12, Math.min(92, b.h + (Math.random() - 0.5) * 16));
    });
    renderFft();
  }, 2200);
}

init();

// ── TARGET DATES ──
// These are the two dates the countdowns count down to.
// Format: 'YYYY-MM-DDTHH:MM:SS'  (T separates date from time)
const EVENTS = {
  grad: new Date('2026-05-09T14:00:00'),  // May 9 at 2:00 PM
  cr:   new Date('2026-06-18T06:00:00'),  // June 18 at 6:00 AM
};

// ── HELPER: zero-pad numbers ──
// Makes "7" into "07" so the display always shows two digits
function pad(n) {
  return String(Math.floor(Math.max(0, n))).padStart(2, '0');
}

// ── CALCULATE TIME REMAINING ──
// Takes a target Date and returns days/hours/minutes/seconds until it
function getCountdown(target) {
  const diff = target - Date.now(); // milliseconds between now and target
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }; // event already passed
  const totalSec = diff / 1000; // convert to seconds
  return {
    d: Math.floor(totalSec / 86400),           // 86400 seconds in a day
    h: Math.floor((totalSec % 86400) / 3600),  // remaining hours
    m: Math.floor((totalSec % 3600) / 60),     // remaining minutes
    s: Math.floor(totalSec % 60),              // remaining seconds
  };
}

// ── RENDER COUNTDOWN INTO THE DOM ──
// id = 'cd-grad' or 'cd-cr'  (matches the div IDs in the HTML)
// target = one of the EVENTS dates above
function renderCountdown(id, target) {
  const el = document.getElementById(id);
  if (!el) return; // safety check — do nothing if element doesn't exist
  const { d, h, m, s } = getCountdown(target);

  // Inject 4 .unit boxes with the numbers and labels
  el.innerHTML = `
    <div class="unit">
      <span class="unit-num">${pad(d)}</span>
      <span class="unit-label">Days</span>
    </div>
    <div class="unit">
      <span class="unit-num">${pad(h)}</span>
      <span class="unit-label">Hrs</span>
    </div>
    <div class="unit">
      <span class="unit-num">${pad(m)}</span>
      <span class="unit-label">Min</span>
    </div>
    <div class="unit">
      <span class="unit-num">${pad(s)}</span>
      <span class="unit-label">Sec</span>
    </div>
  `;
}

// ── TICK FUNCTION ──
// Runs every second to update both countdowns
function tick() {
  renderCountdown('cd-grad', EVENTS.grad);
  renderCountdown('cd-cr',   EVENTS.cr);
}

tick();                    // run immediately on page load (avoids 1-second blank)
setInterval(tick, 1000);   // then run every 1000ms (1 second) after that

// ── TOGGLE CARD DETAIL PANEL ──
// Called by onclick="toggleCard('grad')" or toggleCard('cr') in the HTML
// Adds/removes the 'open' CSS class — the CSS does the actual animation
function toggleCard(id) {
  const card = document.getElementById('card-' + id);
  card.classList.toggle('open');
  // classList.toggle adds the class if it's missing, removes it if it's there
}
import './style.css';
import { solidWalls } from './phone-geometry';

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
const star = '<svg viewBox="0 0 80 80" fill="currentColor" aria-hidden="true"><path d="m40 0 8 28 26-15-15 27 21 8-28 7-12 25-8-28L6 67l15-27L0 32l28-7z"/></svg>';
const getApp = `<div class="store-availability"><span>Get the app · bald verfügbar</span><button class="store-button" type="button" disabled aria-label="Get the app – bald im App Store verfügbar"><img src="./vendor/app-store-badge.svg" width="120" height="40" alt="Download on the App Store" /></button></div>`;
const lenses = Array.from({ length: 3 }, (_, i) => `<span class="camera-lens lens-${i + 1}">${solidWalls(48, 48, 24)}<i class="lens-rim"></i><i class="lens-glass"></i></span>`).join('');
const monogram = '<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M34 28v32q0 13 13 13h23" stroke="currentColor" stroke-width="9" stroke-linecap="round"/><circle cx="69" cy="33" r="6.5" fill="currentColor"/></svg>';
const stories = [
  { number: '01', tag: 'FESTHALTEN', title: 'Bevor der Moment <br>vorbei ist.', text: 'Ein Gedanke. Ein Foto. Eine Sprachmemo. Mehr brauchst du nicht. Zuordnen kannst du später.', foot: 'Einmal tippen. Gespeichert.', image: 'capture', alt: 'Lernspur zeigt die Erfassung mit Text, Foto und Sprachmemo.' },
  { number: '02', tag: 'WEITERKOMMEN', title: 'Kleine Schritte. <br>Echte Fortschritte.', text: 'Setz dir ein Wochenziel, mach es in deinem Tempo und feiere, was du geschafft hast. Ohne Streak-Stress.', foot: 'Dein Ziel. Dein Tempo.', image: 'goals', alt: 'Ein erreichtes Wochenziel mit Fortschrittsanzeige und Rückgängig-Funktion.' },
  { number: '03', tag: 'VERSTEHEN · PLUS', title: 'Nicht nur merken. <br>Wirklich können.', text: 'Schreib eigene Lernkarten zu deinen Modulen. Erst nachdenken, dann aufdecken. Was noch nicht sitzt, kommt wieder dran.', foot: 'Deine Fragen. Deine Antworten. Ohne KI.', image: 'cards', alt: 'Eine Lernkarte mit aufgedeckter Antwort und den Optionen Noch üben und Gewusst.' },
  { number: '04', tag: 'ZURÜCKBLICKEN', title: 'Kein leeres Blatt <br>vor der Deadline.', text: 'Deine gesammelten Momente sind schon da. Mach daraus einen Lernbericht in sechs IPERKA-Schritten und exportiere ihn als PDF.', foot: 'Aus Alltag wird Lerndokumentation.', image: 'report', alt: 'Ein ausgefüllter Lernbericht mit PDF-Export in der nativen App.' },
];

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<a class="skip-link" href="#main">Zum Inhalt</a>
<header class="site-header">
  <a class="brand" href="#" aria-label="Lernspur, nach oben"><img src="./logo.svg" alt="" width="36" height="36" /><span>lernspur</span></a>
  <nav aria-label="Hauptnavigation"><a href="#entdecken">Entdecken</a><a href="#dein-weg">Dein Lernweg</a><a href="#plus">Free & Plus</a></nav>
  ${getApp}
</header>
<main id="main">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-pin">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> DEIN LERNJOURNAL FÜRS IPHONE</p>
        <h1 id="hero-title">Lernen  <br>passiert. <br><em>Überall.</em></h1>
        <p class="hero-description">Die kleinen Aha-Momente verdienen <br>einen Platz. Hier ist deiner.</p>
        <a class="text-link" href="#entdecken">Entdecke Lernspur ${arrow}</a>
      </div>
      <div class="hero-stage">
        <span class="orbit orbit-one" aria-hidden="true"></span><span class="orbit orbit-two" aria-hidden="true"></span>
        <span class="hero-star" aria-hidden="true">${star}</span>
        <div class="phone-scene" role="img" aria-label="Dreidimensionale Vorschau des iPhones mit der Lernspur-App. Das Telefon dreht sich beim Scrollen.">
          <div class="phone-model">
            <div class="phone-shell">${solidWalls(274, 595, 45)}</div>
            <div class="phone-front"><div class="phone-screen"><img src="./screens/capture.png" width="1206" height="2622" alt="" fetchpriority="high" /><span class="dynamic-island"></span></div></div>
            <div class="phone-back">
              <div class="rear-glass">${solidWalls(246, 416, 28)}<div class="rear-glass-face">${monogram}</div></div>
              <div class="camera-bump">${solidWalls(246, 133, 26)}<div class="camera-face">${lenses}<span class="camera-flash"></span><span class="camera-sensor"></span><span class="camera-mic"></span></div></div>
            </div>
            <div class="phone-button"></div>
          </div>
        </div>
        <span class="floating-note"><span>✳</span> Ein Gedanke reicht.</span>
        <span class="scene-caption">ECHTE APP. BEISPIELINHALTE.</span>
      </div>
      <div class="scroll-hint"><span>SCROLLEN & ENTDECKEN</span><span class="scroll-line"></span></div>
    </div>
  </section>
  <section class="statement" aria-label="Die Idee">
    <p class="eyebrow">FÜR ALLES, WAS DU DAZULERNST</p>
    <h2>Du musst dich nicht an alles erinnern. <br><em>Nur kurz festhalten.</em></h2>
    <div class="statement-footer"><span>Im Betrieb. In der Schule. Im ÜK.</span><span>Ein Ort für deinen Lernalltag ${arrow}</span></div>
  </section>
  <section class="story" id="entdecken" aria-labelledby="story-title">
    <div class="story-pin">
      <div class="story-heading"><div><p class="eyebrow">KLEINE MOMENTE. GROSSER UNTERSCHIED.</p><h2 id="story-title">So wird daraus <em>dein Weg.</em></h2></div><div class="story-controls"><span class="story-count" aria-live="polite">01 / 04</span><button class="rail-prev" aria-label="Vorherige Funktion">${arrow}</button><button class="rail-next" aria-label="Nächste Funktion">${arrow}</button></div></div>
      <div class="story-viewport"><div class="story-track">${stories.map(s => `
        <article class="story-card" aria-label="${s.number} ${s.tag}">
          <div class="story-copy"><span class="story-number">${s.number}</span><p class="eyebrow">${s.tag}</p><h3>${s.title}</h3><p>${s.text}</p><span class="story-foot">${s.foot}</span></div>
          <div class="story-device"><img src="./screens/${s.image}.png" alt="${s.alt}" width="1206" height="2622" loading="lazy" /></div>
        </article>`).join('')}</div></div>
      <div class="story-progress" aria-hidden="true"><span></span></div>
      <p class="swipe-hint">Seitlich wischen oder mit den Pfeilen entdecken ${arrow}</p>
    </div>
  </section>
  <section class="learning" id="dein-weg">
    <div class="learning-visual"><div class="learning-paper"><span class="paper-caption">MEIN NÄCHSTER SCHRITT</span><h3>Heute noch unsicher. <br><em>Morgen ein Aha.</em></h3><div class="paper-rule"></div><span class="paper-check">✓</span><p>Meinen eigenen Lösungsweg erklären.</p><span class="paper-doodle" aria-hidden="true">${star}</span></div><div class="module-chip">Betrieb <span>↗</span> Schule <span>↗</span> ÜK</div></div>
    <div class="learning-copy"><p class="eyebrow">DEIN ALLTAG IST DER LEHRPLAN</p><h2>Passt zu dir. <br><em>Wächst mit dir.</em></h2><p>Lehre, Gymnasium oder Praktikum: Lernspur beginnt mit deinem Weg. Sammle deine Module und Fächer, halte offene Fragen fest und mach sichtbar, was du schon kannst.</p><ul class="feature-lines"><li><span>01</span> Eigene Module, ÜKs und Fächer</li><li><span>02</span> Wochenrückblicke & offene Fragen</li><li><span>03</span> Schnelle Notizen vom Homescreen</li></ul><a class="text-link" href="./native.html">Mehr App-Einblicke ${arrow}</a></div>
  </section>
  <section class="privacy">
    <div class="privacy-symbol" aria-hidden="true"><img src="./logo.svg" alt="" />${star}</div><p class="eyebrow">DEIN JOURNAL GEHÖRT DIR</p><h2>Dein Kopf ist schon voll. <br><em>Deine App muss es nicht sein.</em></h2><p>Kein Login. Kein Feed. Kein Vergleich. <br>Deine Einträge bleiben auf deinem iPhone. <br>Auch dann, wenn du gerade offline bist.</p><div class="privacy-notes"><span>Auf deinem Gerät</span><span>Manuelles Backup</span><span>PDF zum Mitnehmen</span></div>
  </section>
  <section class="plans" id="plus">
    <div class="plans-intro"><p class="eyebrow">WENIGER HÜRDEN. MEHR LERNEN.</p><h2>Ein guter Anfang. <br><em>Ein Plus, wenn du willst.</em></h2><p>Alles für dein Lernjournal ist kostenlos. <br>Plus gibt deinem Wissen noch etwas mehr Raum.</p></div>
    <div class="plan-grid">
      <article class="plan plan-free"><div class="plan-label">LERNSPUR FREE</div><h3>Dein Alltag. <br>Gut aufgehoben.</h3><p class="price">CHF 0 <span>/ dauerhaft</span></p><ul><li>Notizen, Fotos & Sprachmemos</li><li>Module, Wochenziele & Rückblicke</li><li>Lernberichte mit PDF-Export</li><li>Homescreen-Widget & lokales Backup</li></ul><a class="button" href="./walkthrough.html">Basis-Demo öffnen ${arrow}</a></article>
      <article class="plan plan-plus"><div class="plan-label">LERNSPUR PLUS <span>TESTPHASE</span></div><h3>Ein bisschen mehr. <br>Für dein Weiterkommen.</h3><p class="price">CHF 10 <span>/ Monat · geplant</span></p><ul><li>Eigene Lernkarten pro Modul</li><li>Üben, aufdecken & Lernstand behalten</li><li class="coming">Cloud-Sync <span>Geplant</span></li><li class="coming">KI-Zusammenfassungen <span>Geplant</span></li></ul><a class="button button-light" href="#fragen">So funktioniert der Test ${arrow}</a><p class="plan-note">Aktuell kostenlos in der iPhone-App aktivierbar. Kein Kauf. Keine Abbuchung. Cloud und KI sind noch nicht verbunden.</p></article>
    </div>
  </section>
  <section class="faq" id="fragen"><div><p class="eyebrow">NOCH KURZ GEFRAGT</p><h2>Gut zu <em>wissen.</em></h2></div><div class="faq-list">
    <details><summary>Kann ich Lernspur schon ausprobieren?<span>+</span></summary><p>Ja. Die interaktive Browser-Demo zeigt die Grundfunktionen der ersten Version. Die App-Einblicke zeigen die aktuelle native iPhone-App mit Wochenzielen, Widget und Lernkarten. Die iPhone-App wird derzeit als Xcode-Testversion installiert; sie ist noch nicht im App Store.</p><a href="./walkthrough.html">Interaktive Basis-Demo öffnen ↗</a></details>
    <details><summary>Bleiben meine Einträge wirklich lokal?<span>+</span></summary><p>Ja. Die native App speichert auf deinem Gerät. Es gibt keine Anmeldung, keine aktive Cloud-Synchronisation und keine KI-Verarbeitung. Erstelle bei Bedarf ein manuelles Backup, bevor du die App löschst. Die Browser-Demo speichert separat in deinem Browser.</p></details>
    <details><summary>Was bekomme ich mit Plus?<span>+</span></summary><p>Aktuell: eigene Lernkarten, Zuordnung zu Modulen und einen Übungsmodus. Der geplante Preis ist CHF 10 pro Monat. In dieser Testversion schaltet der Abo-Button Plus kostenlos frei. Cloud-Speicher und KI-Zusammenfassungen sind erst geplant und nicht aktiv.</p></details>
    <details><summary>Sind die offiziellen Kompetenzen schon enthalten?<span>+</span></summary><p>Die betrieblichen Handlungskompetenzen sind klar gekennzeichnete Demo-Platzhalter. Du kannst persönliche Module und Fächer anlegen und zulässige Modullisten importieren. Der offizielle Modulbaukasten lässt sich in der App öffnen.</p></details>
  </div></section>
  <section class="outro"><span aria-hidden="true">${star}</span><p class="eyebrow">DER NÄCHSTE AHA-MOMENT KOMMT BESTIMMT.</p><h2>Gib ihm <br><em>eine Lernspur.</em></h2>${getApp}<p>Fürs iPhone. Bald im App Store. <br><a href="./walkthrough.html">Bis dahin: interaktive Basis-Demo ansehen ↗</a></p></section>
</main>
<footer><a class="brand" href="#"><img src="./logo.svg" alt="" width="30" height="30" /><span>lernspur</span></a><span>Für deinen Lernweg. In deinem Tempo.</span><div><a href="./native.html">App-Einblicke</a><a href="https://github.com/platret/lernspur-preview">GitHub ${arrow}</a></div></footer>`;

const hero = document.querySelector<HTMLElement>('.hero')!;
const phone = document.querySelector<HTMLElement>('.phone-model')!;
const story = document.querySelector<HTMLElement>('.story')!;
const track = document.querySelector<HTMLElement>('.story-track')!;
const viewport = document.querySelector<HTMLElement>('.story-viewport')!;
const cards = Array.from(document.querySelectorAll<HTMLElement>('.story-card'));
const counter = document.querySelector<HTMLElement>('.story-count')!;
const progressBar = document.querySelector<HTMLElement>('.story-progress span')!;
const previous = document.querySelector<HTMLButtonElement>('.rail-prev')!;
const next = document.querySelector<HTMLButtonElement>('.rail-next')!;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobile = window.matchMedia('(max-width: 760px)');
let current = 0;
let queued = false;
let travel = 0;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const nativeRail = () => mobile.matches || reducedMotion.matches;

function update() {
  queued = false;
  const heroProgress = clamp(-hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight - window.innerHeight));
  phone.style.transform = reducedMotion.matches ? 'rotateX(3deg) rotateY(-16deg) rotateZ(5deg)' : `translateY(${-heroProgress * 18}px) rotateX(${8 - heroProgress * 14}deg) rotateY(${-24 + heroProgress * 360}deg) rotateZ(${8 - heroProgress * 16}deg)`;
  const progress = nativeRail() ? clamp(viewport.scrollLeft / Math.max(1, travel)) : clamp(-story.getBoundingClientRect().top / Math.max(1, story.offsetHeight - window.innerHeight));
  track.style.transform = nativeRail() ? '' : `translate3d(${-progress * travel}px,0,0)`;
  current = Math.round(progress * (cards.length - 1));
  counter.textContent = `${String(current + 1).padStart(2, '0')} / 04`;
  progressBar.style.transform = `scaleX(${(current + 1) / cards.length})`;
  previous.disabled = current === 0;
  next.disabled = current === cards.length - 1;
}
function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
function measure() {
  travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
  story.style.height = nativeRail() ? '' : `${window.innerHeight + travel}px`;
  schedule();
}
function goTo(index: number) {
  const destination = Math.max(0, Math.min(cards.length - 1, index));
  const fraction = destination / (cards.length - 1);
  const behavior = reducedMotion.matches ? 'instant' : 'smooth';
  if (nativeRail()) viewport.scrollTo({ left: fraction * travel, behavior });
  else window.scrollTo({ top: window.scrollY + story.getBoundingClientRect().top + fraction * (story.offsetHeight - window.innerHeight), behavior });
}
previous.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));
viewport.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', measure);
reducedMotion.addEventListener('change', measure);
mobile.addEventListener('change', measure);
new ResizeObserver(measure).observe(viewport);
measure();

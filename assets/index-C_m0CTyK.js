import"./modulepreload-polyfill-B5Qt9EMX.js";const n='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>',c='<svg viewBox="0 0 80 80" fill="currentColor" aria-hidden="true"><path d="m40 0 8 28 26-15-15 27 21 8-28 7-12 25-8-28L6 67l15-27L0 32l28-7z"/></svg>',L=Array.from({length:13},(e,s)=>`<div class="phone-layer" style="--depth:${s-6}px"></div>`).join(""),S=[{number:"01",tag:"FESTHALTEN",title:"Bevor der Moment <br>vorbei ist.",text:"Ein Gedanke. Ein Foto. Eine Sprachmemo. Mehr brauchst du nicht. Zuordnen kannst du später.",foot:"Einmal tippen. Gespeichert.",image:"capture",alt:"Lernspur zeigt die Erfassung mit Text, Foto und Sprachmemo."},{number:"02",tag:"WEITERKOMMEN",title:"Kleine Schritte. <br>Echte Fortschritte.",text:"Setz dir ein Wochenziel, mach es in deinem Tempo und feiere, was du geschafft hast. Ohne Streak-Stress.",foot:"Dein Ziel. Dein Tempo.",image:"goals",alt:"Ein erreichtes Wochenziel mit Fortschrittsanzeige und Rückgängig-Funktion."},{number:"03",tag:"VERSTEHEN · PLUS",title:"Nicht nur merken. <br>Wirklich können.",text:"Schreib eigene Lernkarten zu deinen Modulen. Erst nachdenken, dann aufdecken. Was noch nicht sitzt, kommt wieder dran.",foot:"Deine Fragen. Deine Antworten. Ohne KI.",image:"cards",alt:"Eine Lernkarte mit aufgedeckter Antwort und den Optionen Noch üben und Gewusst."},{number:"04",tag:"ZURÜCKBLICKEN",title:"Kein leeres Blatt <br>vor der Deadline.",text:"Deine gesammelten Momente sind schon da. Mach daraus einen Lernbericht in sechs IPERKA-Schritten und exportiere ihn als PDF.",foot:"Aus Alltag wird Lerndokumentation.",image:"report",alt:"Ein ausgefüllter Lernbericht mit PDF-Export in der nativen App."}];document.querySelector("#app").innerHTML=`
<a class="skip-link" href="#main">Zum Inhalt</a>
<header class="site-header">
  <a class="brand" href="#" aria-label="Lernspur, nach oben"><img src="./logo.svg" alt="" width="36" height="36" /><span>lernspur</span></a>
  <nav aria-label="Hauptnavigation"><a href="#entdecken">Entdecken</a><a href="#dein-weg">Dein Lernweg</a><a href="#plus">Free & Plus</a></nav>
  <a class="button button-small" href="./walkthrough.html">App ausprobieren ${n}</a>
</header>
<main id="main">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-pin">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> DEIN LERNJOURNAL FÜRS IPHONE</p>
        <h1 id="hero-title">Lernen  <br>passiert. <br><em>Überall.</em></h1>
        <p class="hero-description">Die kleinen Aha-Momente verdienen <br>einen Platz. Hier ist deiner.</p>
        <a class="text-link" href="#entdecken">Entdecke Lernspur ${n}</a>
      </div>
      <div class="hero-stage">
        <span class="orbit orbit-one" aria-hidden="true"></span><span class="orbit orbit-two" aria-hidden="true"></span>
        <span class="hero-star" aria-hidden="true">${c}</span>
        <div class="phone-scene" role="img" aria-label="Dreidimensionale Vorschau des iPhones mit der Lernspur-App. Das Telefon dreht sich beim Scrollen.">
          <div class="phone-model">
            ${L}
            <div class="phone-front"><div class="phone-screen"><img src="./screens/capture.png" width="1206" height="2622" alt="" fetchpriority="high" /><span class="dynamic-island"></span></div></div>
            <div class="phone-back"><div class="camera-bump"><i></i><i></i><i></i><b></b></div><img src="./logo.svg" alt="" /><p>Deine Gedanken. <br>Bleiben deine.</p><small>L E R N S P U R</small></div>
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
    <div class="statement-footer"><span>Im Betrieb. In der Schule. Im ÜK.</span><span>Ein Ort für deinen Lernalltag ${n}</span></div>
  </section>
  <section class="story" id="entdecken" aria-labelledby="story-title">
    <div class="story-pin">
      <div class="story-heading"><div><p class="eyebrow">KLEINE MOMENTE. GROSSER UNTERSCHIED.</p><h2 id="story-title">So wird daraus <em>dein Weg.</em></h2></div><div class="story-controls"><span class="story-count" aria-live="polite">01 / 04</span><button class="rail-prev" aria-label="Vorherige Funktion">${n}</button><button class="rail-next" aria-label="Nächste Funktion">${n}</button></div></div>
      <div class="story-viewport"><div class="story-track">${S.map(e=>`
        <article class="story-card" aria-label="${e.number} ${e.tag}">
          <div class="story-copy"><span class="story-number">${e.number}</span><p class="eyebrow">${e.tag}</p><h3>${e.title}</h3><p>${e.text}</p><span class="story-foot">${e.foot}</span></div>
          <div class="story-device"><img src="./screens/${e.image}.png" alt="${e.alt}" width="1206" height="2622" loading="lazy" /></div>
        </article>`).join("")}</div></div>
      <div class="story-progress" aria-hidden="true"><span></span></div>
      <p class="swipe-hint">Seitlich wischen oder mit den Pfeilen entdecken ${n}</p>
    </div>
  </section>
  <section class="learning" id="dein-weg">
    <div class="learning-visual"><div class="learning-paper"><span class="paper-caption">MEIN NÄCHSTER SCHRITT</span><h3>Heute noch unsicher. <br><em>Morgen ein Aha.</em></h3><div class="paper-rule"></div><span class="paper-check">✓</span><p>Meinen eigenen Lösungsweg erklären.</p><span class="paper-doodle" aria-hidden="true">${c}</span></div><div class="module-chip">Betrieb <span>↗</span> Schule <span>↗</span> ÜK</div></div>
    <div class="learning-copy"><p class="eyebrow">DEIN ALLTAG IST DER LEHRPLAN</p><h2>Passt zu dir. <br><em>Wächst mit dir.</em></h2><p>Lehre, Gymnasium oder Praktikum: Lernspur beginnt mit deinem Weg. Sammle deine Module und Fächer, halte offene Fragen fest und mach sichtbar, was du schon kannst.</p><ul class="feature-lines"><li><span>01</span> Eigene Module, ÜKs und Fächer</li><li><span>02</span> Wochenrückblicke & offene Fragen</li><li><span>03</span> Schnelle Notizen vom Homescreen</li></ul><a class="text-link" href="./native.html">Mehr App-Einblicke ${n}</a></div>
  </section>
  <section class="privacy">
    <div class="privacy-symbol" aria-hidden="true"><img src="./logo.svg" alt="" />${c}</div><p class="eyebrow">DEIN JOURNAL GEHÖRT DIR</p><h2>Dein Kopf ist schon voll. <br><em>Deine App muss es nicht sein.</em></h2><p>Kein Login. Kein Feed. Kein Vergleich. <br>Deine Einträge bleiben auf deinem iPhone. <br>Auch dann, wenn du gerade offline bist.</p><div class="privacy-notes"><span>Auf deinem Gerät</span><span>Manuelles Backup</span><span>PDF zum Mitnehmen</span></div>
  </section>
  <section class="plans" id="plus">
    <div class="plans-intro"><p class="eyebrow">WENIGER HÜRDEN. MEHR LERNEN.</p><h2>Ein guter Anfang. <br><em>Ein Plus, wenn du willst.</em></h2><p>Alles für dein Lernjournal ist kostenlos. <br>Plus gibt deinem Wissen noch etwas mehr Raum.</p></div>
    <div class="plan-grid">
      <article class="plan plan-free"><div class="plan-label">LERNSPUR FREE</div><h3>Dein Alltag. <br>Gut aufgehoben.</h3><p class="price">CHF 0 <span>/ dauerhaft</span></p><ul><li>Notizen, Fotos & Sprachmemos</li><li>Module, Wochenziele & Rückblicke</li><li>Lernberichte mit PDF-Export</li><li>Homescreen-Widget & lokales Backup</li></ul><a class="button" href="./walkthrough.html">Basis-Demo öffnen ${n}</a></article>
      <article class="plan plan-plus"><div class="plan-label">LERNSPUR PLUS <span>TESTPHASE</span></div><h3>Ein bisschen mehr. <br>Für dein Weiterkommen.</h3><p class="price">CHF 10 <span>/ Monat · geplant</span></p><ul><li>Eigene Lernkarten pro Modul</li><li>Üben, aufdecken & Lernstand behalten</li><li class="coming">Cloud-Sync <span>Geplant</span></li><li class="coming">KI-Zusammenfassungen <span>Geplant</span></li></ul><a class="button button-light" href="#fragen">So funktioniert der Test ${n}</a><p class="plan-note">Aktuell kostenlos in der iPhone-App aktivierbar. Kein Kauf. Keine Abbuchung. Cloud und KI sind noch nicht verbunden.</p></article>
    </div>
  </section>
  <section class="faq" id="fragen"><div><p class="eyebrow">NOCH KURZ GEFRAGT</p><h2>Gut zu <em>wissen.</em></h2></div><div class="faq-list">
    <details><summary>Kann ich Lernspur schon ausprobieren?<span>+</span></summary><p>Ja. Die interaktive Browser-Demo zeigt die Grundfunktionen der ersten Version. Die App-Einblicke zeigen die aktuelle native iPhone-App mit Wochenzielen, Widget und Lernkarten. Die iPhone-App wird derzeit als Xcode-Testversion installiert; sie ist noch nicht im App Store.</p><a href="./walkthrough.html">Interaktive Basis-Demo öffnen ↗</a></details>
    <details><summary>Bleiben meine Einträge wirklich lokal?<span>+</span></summary><p>Ja. Die native App speichert auf deinem Gerät. Es gibt keine Anmeldung, keine aktive Cloud-Synchronisation und keine KI-Verarbeitung. Erstelle bei Bedarf ein manuelles Backup, bevor du die App löschst. Die Browser-Demo speichert separat in deinem Browser.</p></details>
    <details><summary>Was bekomme ich mit Plus?<span>+</span></summary><p>Aktuell: eigene Lernkarten, Zuordnung zu Modulen und einen Übungsmodus. Der geplante Preis ist CHF 10 pro Monat. In dieser Testversion schaltet der Abo-Button Plus kostenlos frei. Cloud-Speicher und KI-Zusammenfassungen sind erst geplant und nicht aktiv.</p></details>
    <details><summary>Sind die offiziellen Kompetenzen schon enthalten?<span>+</span></summary><p>Die betrieblichen Handlungskompetenzen sind klar gekennzeichnete Demo-Platzhalter. Du kannst persönliche Module und Fächer anlegen und zulässige Modullisten importieren. Der offizielle Modulbaukasten lässt sich in der App öffnen.</p></details>
  </div></section>
  <section class="outro"><span aria-hidden="true">${c}</span><p class="eyebrow">DER NÄCHSTE AHA-MOMENT KOMMT BESTIMMT.</p><h2>Gib ihm <br><em>eine Lernspur.</em></h2><a class="button" href="./walkthrough.html">Jetzt im Browser ausprobieren ${n}</a><p>Ohne Anmeldung. Mit Beispielinhalten. <br>Die Basis-Demo ist unabhängig von der iPhone-App.</p></section>
</main>
<footer><a class="brand" href="#"><img src="./logo.svg" alt="" width="30" height="30" /><span>lernspur</span></a><span>Für deinen Lernweg. In deinem Tempo.</span><div><a href="./native.html">App-Einblicke</a><a href="https://github.com/platret/lernspur-preview">GitHub ${n}</a></div></footer>`;const b=document.querySelector(".hero"),A=document.querySelector(".phone-model"),a=document.querySelector(".story"),f=document.querySelector(".story-track"),l=document.querySelector(".story-viewport"),t=Array.from(document.querySelectorAll(".story-card")),D=document.querySelector(".story-count"),M=document.querySelector(".story-progress span"),E=document.querySelector(".rail-prev"),k=document.querySelector(".rail-next"),p=window.matchMedia("(prefers-reduced-motion: reduce)"),w=window.matchMedia("(max-width: 760px)");let i=0,u=!1,r=0;const h=e=>Math.max(0,Math.min(1,e)),d=()=>w.matches||p.matches;function R(){u=!1;const e=h(-b.getBoundingClientRect().top/Math.max(1,b.offsetHeight-window.innerHeight));A.style.transform=p.matches?"rotateX(3deg) rotateY(-16deg) rotateZ(5deg)":`translateY(${-e*18}px) rotateX(${8-e*14}deg) rotateY(${-24+e*360}deg) rotateZ(${8-e*16}deg)`;const s=d()?h(l.scrollLeft/Math.max(1,r)):h(-a.getBoundingClientRect().top/Math.max(1,a.offsetHeight-window.innerHeight));f.style.transform=d()?"":`translate3d(${-s*r}px,0,0)`,i=Math.round(s*(t.length-1)),D.textContent=`${String(i+1).padStart(2,"0")} / 04`,M.style.transform=`scaleX(${(i+1)/t.length})`,E.disabled=i===0,k.disabled=i===t.length-1}function m(){u||(u=!0,requestAnimationFrame(R))}function o(){r=Math.max(0,f.scrollWidth-l.clientWidth),a.style.height=d()?"":`${window.innerHeight+r}px`,m()}function y(e){const g=Math.max(0,Math.min(t.length-1,e))/(t.length-1),v=p.matches?"instant":"smooth";d()?l.scrollTo({left:g*r,behavior:v}):window.scrollTo({top:window.scrollY+a.getBoundingClientRect().top+g*(a.offsetHeight-window.innerHeight),behavior:v})}E.addEventListener("click",()=>y(i-1));k.addEventListener("click",()=>y(i+1));l.addEventListener("scroll",m,{passive:!0});window.addEventListener("scroll",m,{passive:!0});window.addEventListener("resize",o);p.addEventListener("change",o);w.addEventListener("change",o);new ResizeObserver(o).observe(l);o();

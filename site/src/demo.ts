import './demo.css';

type Tab = 'capture' | 'journal' | 'reports' | 'coverage';
type Section = 'informieren' | 'planen' | 'entscheiden' | 'realisieren' | 'kontrollieren' | 'auswerten';
interface Capture { id: string; createdAt: string; text: string; photoUri?: string; audioUri?: string; projectId?: string; competencyIds: string[] }
interface Competency { id: string; code: string; title: string; area: string }
interface Project { id: string; name: string }
interface Report { id: string; title: string; authorName: string; dateFrom: string; dateTo: string; competencyIds: string[]; sections: Record<Section, string>; captureIds: string[]; createdAt: string }
interface Journal { version: 1; captures: Capture[]; projects: Project[]; reports: Report[]; draft: Capture }
interface Filters { competency: string; project: string; from: string; to: string }
type Sheet = 'tags' | 'filter' | 'detail' | 'report-tags' | 'sources' | 'help' | 'reset' | null;

const sections: { id: Section; title: string; prompt: string }[] = [
  { id: 'informieren', title: 'Informieren', prompt: 'Was war die Aufgabe? Was musste ich zuerst herausfinden?' },
  { id: 'planen', title: 'Planen', prompt: 'Wie habe ich die Arbeit geplant? Welche Mittel brauchte ich?' },
  { id: 'entscheiden', title: 'Entscheiden', prompt: 'Welchen Lösungsweg habe ich gewählt und warum?' },
  { id: 'realisieren', title: 'Realisieren', prompt: 'Wie habe ich die Lösung umgesetzt?' },
  { id: 'kontrollieren', title: 'Kontrollieren', prompt: 'Wie habe ich das Ergebnis geprüft? Was hat funktioniert?' },
  { id: 'auswerten', title: 'Auswerten', prompt: 'Was habe ich gelernt? Was mache ich nächstes Mal anders?' },
];
const competencies: Competency[] = [
  { id: 'demo-requirements', code: 'DEMO 01', title: 'Anforderungen verstehen', area: 'Entwicklung' },
  { id: 'demo-planning', code: 'DEMO 02', title: 'Lösungen planen', area: 'Entwicklung' },
  { id: 'demo-development', code: 'DEMO 03', title: 'Applikationen entwickeln', area: 'Entwicklung' },
  { id: 'demo-testing', code: 'DEMO 04', title: 'Qualität prüfen', area: 'Entwicklung' },
  { id: 'demo-data', code: 'DEMO 05', title: 'Mit Daten arbeiten', area: 'Zusammenarbeit' },
  { id: 'demo-team', code: 'DEMO 06', title: 'Im Team zusammenarbeiten', area: 'Zusammenarbeit' },
];
const steps: { tab: Tab; title: string; detail: string; icon: string }[] = [
  { tab: 'capture', title: 'Einen Moment festhalten', detail: 'Ein Gedanke, ein Foto oder eine kurze Sprachnotiz.', icon: 'plusbox' },
  { tab: 'journal', title: 'Deinen Alltag wiederfinden', detail: 'Notizen sammeln. Später in Ruhe zuordnen.', icon: 'journal' },
  { tab: 'reports', title: 'Einen Lernbericht schreiben', detail: 'Mit deinen Notizen durch die sechs IPERKA-Schritte.', icon: 'report' },
  { tab: 'coverage', title: 'Deine Fortschritte entdecken', detail: 'Sehen, wo du Spuren hinterlassen hast.', icon: 'grid' },
];
const paths: Record<string, string> = {
  plusbox: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  journal: '<path d="M5 5h14M5 10h14M5 15h10M5 20h12"/>',
  report: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  up: '<path d="M6 18 18 6M6 6h12v12"/>',
  back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  photo: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1.5"/><path d="m21 16-6-6L3 21"/>',
  wave: '<path d="M3 10v4M7 6v12M11 3v18M15 8v8M19 5v14M23 10v4"/>',
  stop: '<rect x="5" y="5" width="14" height="14" rx="3"/>',
  tag: '<path d="M3 3h9l9 9-9 9-9-9z"/><circle cx="8" cy="8" r="1"/>',
  sparkle: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>',
  pencil: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14zM13 21h8"/>',
  filter: '<path d="M3 6h18M6 12h12M9 18h6"/>',
  folder: '<path d="M3 7V5a2 2 0 0 1 2-2h5l3 3h6a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  leaf: '<path d="M20 3C9 2 2 7 5 15s15 6 15-12ZM5 20 15 9"/>',
  share: '<path d="M7 9H5a2 2 0 0 0-2 2v9h18v-9a2 2 0 0 0-2-2h-2M12 15V2m-5 5 5-5 5 5"/>',
  signal: '<path d="M4 18v-3M8 18v-6M12 18V9M16 18V6M20 18V3"/>',
  battery: '<rect x="2" y="6" width="18" height="12" rx="3"/><path d="M23 10v4M5 9h12v6H5z"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 16a6 6 0 0 1 8 0M12 20h.01"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4M10 5h4"/>',
};
const icon = (name: string, className = '') => `<svg aria-hidden="true" viewBox="0 0 24 24" class="${className}">${paths[name] ?? paths.sparkle}</svg>`;
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);
const uid = () => crypto.randomUUID();
const localDate = (value = new Date()) => `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
const dateLabel = (value: string, long = false) => new Date(value.length === 10 ? value + 'T12:00:00' : value).toLocaleDateString('de-CH', long ? { weekday: 'long', day: 'numeric', month: 'long' } : { day: '2-digit', month: '2-digit', year: 'numeric' });
const blankCapture = (): Capture => ({ id: uid(), createdAt: new Date().toISOString(), text: '', competencyIds: [] });
const blankSections = (): Record<Section, string> => ({ informieren: '', planen: '', entscheiden: '', realisieren: '', kontrollieren: '', auswerten: '' });
const daysAgo = (days: number, hour = 14): string => { const date = new Date(); date.setDate(date.getDate() - days); date.setHours(hour, 25, 0, 0); return date.toISOString(); };
const newReport = (): Report => ({ id: uid(), title: '', authorName: '', dateFrom: localDate(new Date(daysAgo(7))), dateTo: localDate(), competencyIds: [], sections: blankSections(), captureIds: [], createdAt: new Date().toISOString() });
function seed(): Journal {
  return {
    version: 1, draft: blankCapture(), projects: [{ id: 'portal', name: 'Kundenportal' }], reports: [],
    captures: [
      { id: uid(), createdAt: daysAgo(0, 10), text: 'Den Fehler im Login gefunden: Der Token wurde nach dem Neuladen nicht mitgeschickt. Mit einem Integrationstest abgesichert.', competencyIds: ['demo-development', 'demo-testing'], projectId: 'portal' },
      { id: uid(), createdAt: daysAgo(1, 15), text: 'Im Code-Review gelernt, warum kleine Funktionen so viel leichter zu testen sind. Morgen direkt beim Refactoring ausprobieren.', competencyIds: ['demo-team'] },
      { id: uid(), createdAt: daysAgo(2, 11), text: 'Die Anforderungen für das Kundenportal mit dem Team geklärt und die offenen Fragen aufgeschrieben.', competencyIds: ['demo-requirements'], projectId: 'portal' },
    ],
  };
}
const storageKey = 'lernspur-walkthrough-v1';
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(x => typeof x === 'string');
const isCapture = (value: unknown): value is Capture => isRecord(value) && typeof value.id === 'string' && typeof value.text === 'string' && typeof value.createdAt === 'string' && Number.isFinite(Date.parse(value.createdAt)) && strings(value.competencyIds) && (value.projectId === undefined || typeof value.projectId === 'string') && (value.photoUri === undefined || (typeof value.photoUri === 'string' && value.photoUri.startsWith('data:image/'))) && (value.audioUri === undefined || (typeof value.audioUri === 'string' && value.audioUri.startsWith('data:audio/')));
const isReport = (value: unknown): value is Report => isRecord(value) && ['id', 'title', 'authorName', 'dateFrom', 'dateTo', 'createdAt'].every(key => typeof value[key] === 'string') && strings(value.competencyIds) && strings(value.captureIds) && isRecord(value.sections) && sections.every(s => typeof (value.sections as Record<string, unknown>)[s.id] === 'string');
function load(): Journal {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return seed();
    const data: unknown = JSON.parse(raw);
    if (isRecord(data) && data.version === 1 && isCapture(data.draft) && Array.isArray(data.captures) && data.captures.every(isCapture) && Array.isArray(data.reports) && data.reports.every(isReport) && Array.isArray(data.projects) && data.projects.every(p => isRecord(p) && typeof p.id === 'string' && typeof p.name === 'string')) return data as unknown as Journal;
    throw new Error('invalid');
  } catch { storageWarning = 'Der Browser-Speicher ist nicht verfügbar oder enthält ungültige Vorschau-Daten. Änderungen können möglicherweise nicht erhalten bleiben.'; return seed(); }
}
let storageWarning = '';
let state = load();
let tab: Tab = 'capture';
let sheet: Sheet = null;
let detail: Capture | null = null;
let activeReport: Report | null = null;
let reportSetup = false;
let filter: Filters = { competency: '', project: '', from: '', to: '' };
let saved = false;
let recorder: MediaRecorder | null = null;
let recording = false;
let mediaBusy = false;
let toastTimer: ReturnType<typeof setTimeout> | undefined;
let toastMessage = '';
const root = document.querySelector<HTMLDivElement>('#app')!;

function persist(): boolean {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); return true; }
  catch { toast('Der Browser-Speicher ist voll oder gesperrt. Bitte entferne einen Anhang. Deine Eingabe bleibt geöffnet.'); return false; }
}
function toast(message: string) {
  toastMessage = message;
  mountToast();
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { toastMessage = ''; document.querySelector('.toast')?.remove(); }, 4500);
}
function mountToast() {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'toast'; toast.setAttribute('role', 'status'); toast.textContent = toastMessage;
  document.querySelector('.phone')?.append(toast);
}
const competencyLabel = (id: string) => competencies.find(c => c.id === id);
const projectName = (id?: string) => state.projects.find(p => p.id === id)?.name;
const hasContent = (capture: Capture) => Boolean(capture.text.trim() || capture.photoUri || capture.audioUri);
const completion = (report: Report) => sections.filter(s => report.sections[s.id].trim()).length;
const ready = (report: Report) => Boolean(report.title.trim() && report.authorName.trim() && report.competencyIds.length && report.dateFrom && report.dateTo && report.dateFrom <= report.dateTo && completion(report) === 6);
const matches = (capture: Capture, f: Filters) => (!f.competency || capture.competencyIds.includes(f.competency)) && (!f.project || capture.projectId === f.project) && (!f.from || localDate(new Date(capture.createdAt)) >= f.from) && (!f.to || localDate(new Date(capture.createdAt)) <= f.to);
const reportCaptures = (report: Report) => state.captures.filter(c => matches(c, { from: report.dateFrom, to: report.dateTo, competency: '', project: '' }) && c.competencyIds.some(id => report.competencyIds.includes(id)));
const heading = (eyebrow: string, title: string, subtitle: string) => `<div class="page-eyebrow">${escape(eyebrow)}</div><h2 class="page-title">${title}</h2><p class="page-subtitle">${subtitle}</p>`;
const chips = (capture: Capture) => capture.competencyIds.length ? `<div class="chips">${capture.competencyIds.map(id => `<span class="chip">${escape(competencyLabel(id)?.code ?? id)}</span>`).join('')}</div>` : '<span class="unassigned">Noch nicht zugeordnet</span>';
const attachment = (capture: Capture, removable = false) => `${capture.photoUri ? `<img class="photo-preview" src="${escape(capture.photoUri)}" alt="Foto zum Eintrag"/>${removable ? '<button class="remove" data-action="remove-photo">Foto entfernen</button>' : ''}` : ''}${capture.audioUri ? `<div class="memo"><audio controls src="${escape(capture.audioUri)}" aria-label="Sprachmemo abspielen"></audio></div>${removable ? '<button class="remove" data-action="remove-audio">Memo entfernen</button>' : ''}` : ''}`;
const empty = (title: string, text: string, symbol = 'journal') => `<div class="empty">${icon(symbol)}<b>${title}</b>${text}</div>`;

function capturePage(): string {
  const draft = state.draft;
  const tags = [draft.competencyIds.length ? `${draft.competencyIds.length} Kompetenzen` : '', projectName(draft.projectId)].filter(Boolean).join(' · ');
  return `<div class="app-brand"><div class="brand"><img src="./logo.svg" alt=""/>lernspur</div><span class="local">${icon('lock')}Nur auf deinem Gerät</span></div>
  ${heading(dateLabel(new Date().toISOString(), true), 'Was bleibt von heute?', 'Ein Gedanke reicht. Den Rest ordnest du später.')}
  <div class="note-card"><label class="note-label" for="capture-text">DEINE NOTIZ ${icon('pencil')}</label>
  <textarea id="capture-text" placeholder="Was hast du gemacht, gelöst&#10;oder zum ersten Mal verstanden?">${escape(draft.text)}</textarea>
  <div class="note-actions"><label class="upload-label">${icon('photo')}Foto<input id="photo-input" type="file" accept="image/*" aria-label="Foto hinzufügen" ${mediaBusy ? 'disabled' : ''}/></label>
  <button data-action="record" ${mediaBusy ? 'disabled' : ''}>${icon(recording ? 'stop' : 'wave')}${recording ? 'Stopp' : 'Sprachmemo'}</button></div></div>
  ${recording ? '<div class="recording" role="status">● Aufnahme läuft · zum Beenden auf Stopp tippen</div>' : ''}${attachment(draft, true)}
  <button class="optional" data-action="tags">${icon('tag')}<span><b>Kompetenz oder Projekt</b><small>${tags ? escape(tags) : 'Optional · geht auch später'}</small></span>${icon('plus')}</button>
  <div class="nudge">${icon('sparkle')}<span>Auch kleine Aha-Momente<br/>sind eine Spur wert.</span></div>`;
}
function captureCard(capture: Capture): string {
  return `<button class="capture-card" data-action="detail" data-id="${capture.id}"><div class="capture-meta"><span>${new Date(capture.createdAt).toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}</span><span>${capture.photoUri ? icon('photo') : ''}${capture.audioUri ? icon('wave') : ''}${icon('up')}</span></div>
  <p>${escape(capture.text || (capture.photoUri ? 'Ein Moment in Bildern' : 'Ein Gedanke als Sprachmemo'))}</p>
  ${capture.projectId ? `<div class="project">${icon('folder')}${escape(projectName(capture.projectId) ?? '')}</div>` : ''}${chips(capture)}</button>`;
}
function journalPage(): string {
  const captures = state.captures.filter(c => matches(c, filter)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const days = [...new Set(captures.map(c => localDate(new Date(c.createdAt))))];
  return `${heading('Dein Lernjournal', 'Eine Spur nach<br/>der anderen.', 'Was du festhältst, geht nicht verloren.')}
  <div class="list-toolbar"><span>${captures.length} Einträge</span><button data-action="filter">${icon('filter')}Filtern</button></div>
  ${Object.values(filter).some(Boolean) ? '<button class="remove" data-action="clear-filter">Filter zurücksetzen</button>' : ''}
  ${captures.length ? days.map(day => `<div class="day-label">${escape(dateLabel(day, true))}</div>${captures.filter(c => localDate(new Date(c.createdAt)) === day).map(captureCard).join('')}`).join('') : empty('Hier ist es noch ruhig.', 'Passe die Filter an oder halte einen neuen Moment fest.')}`;
}
function reportsPage(): string {
  if (activeReport) return reportPage(activeReport);
  return `${heading('Deine Lerndokumentation', 'Aus Momenten<br/>wird ein Bericht.', 'Deine Notizen sind schon da.<br/>Jetzt bringst du sie zusammen.')}
  <button class="primary" data-action="new-report">${icon('plus')}Lernbericht erstellen</button>
  ${state.reports.length ? state.reports.map(report => `<button class="report-card" data-action="open-report" data-id="${report.id}"><small>${dateLabel(report.dateFrom)} – ${dateLabel(report.dateTo)}</small><h3>${escape(report.title || 'Unbenannter Lernbericht')}</h3><div class="progress"><i style="width:${completion(report) / 6 * 100}%"></i></div><p>${completion(report)} von 6 Abschnitten</p><footer><span class="chip">${ready(report) ? 'Bereit für PDF' : 'Entwurf'}</span>${icon('up')}</footer></button>`).join('') : empty('Der Anfang ist schon gemacht.', 'Wähle einen Zeitraum und eine Kompetenz. Deine Einträge begleiten dich durch IPERKA.', 'report')}`;
}
function reportPage(report: Report): string {
  return `<button class="back-button" data-action="report-back">${icon('back')}Alle Berichte</button>
  ${heading('Lernbericht · IPERKA', reportSetup ? 'Deine Momente<br/>zusammenbringen.' : 'Deine Erfahrung.<br/>Deine Worte.', reportSetup ? 'Wähle die Grundlage für deinen Bericht.' : `${completion(report)} von 6 Abschnitten ausgefüllt`)}
  ${!reportSetup ? `<div class="progress"><i style="width:${completion(report) / 6 * 100}%"></i></div>` : ''}
  <div class="form-field"><label class="form-label" for="report-title">Titel</label><input class="text-input" id="report-title" placeholder="Zum Beispiel: Den Login verbessern" value="${escape(report.title)}"/></div>
  <div class="form-field"><label class="form-label" for="report-author">Autor / Autorin</label><input class="text-input" id="report-author" autocomplete="name" placeholder="Dein Vor- und Nachname" value="${escape(report.authorName)}"/></div>
  <div class="date-row"><div><label class="form-label" for="report-from">Von</label><input class="text-input" type="date" id="report-from" value="${report.dateFrom}"/></div><div><label class="form-label" for="report-to">Bis</label><input class="text-input" type="date" id="report-to" min="${report.dateFrom}" value="${report.dateTo}"/></div></div>
  ${reportSetup ? `<div class="form-field"><label class="form-label" for="report-competency">Handlungskompetenz</label><select class="select-input" id="report-competency"><option value="">Bitte wählen</option>${competencies.map(c => `<option value="${c.id}" ${report.competencyIds.includes(c.id) ? 'selected' : ''}>${c.code} · ${c.title}</option>`).join('')}</select></div><div class="notice">Demo-Platzhalter · Noch keine offiziellen Bildungsplan-Codes.</div>
  <p class="form-label">Passende Einträge · ${reportCaptures(report).length}</p>${reportCaptures(report).map(c => `<div class="source-note"><small>${dateLabel(c.createdAt)}</small><p>${escape(c.text || 'Eintrag mit Anhang')}</p></div>`).join('') || '<p class="notice">Keine passenden Einträge. Du kannst deinen Bericht trotzdem selbst schreiben.</p>'}
  <button class="primary" data-action="create-report" ${report.competencyIds.length && report.dateFrom && report.dateTo && report.dateFrom <= report.dateTo ? '' : 'disabled'}>Mit IPERKA beginnen ${icon('arrow')}</button>` : `
  <button class="secondary" data-action="report-tags">${icon('tag')}${report.competencyIds.length} Handlungskompetenzen</button>
  <button class="secondary" data-action="sources">${icon('journal')}${report.captureIds.length} ausgewählte Einträge ${icon('up')}</button>
  ${sections.map((s, i) => `<section class="iperka-section"><label class="iperka-title" for="section-${s.id}"><span>0${i + 1}</span>${s.title}</label><p>${s.prompt}</p><textarea id="section-${s.id}" class="text-input" placeholder="Deine Gedanken …">${escape(report.sections[s.id])}</textarea></section>`).join('')}
  <button class="primary" id="export-report" data-action="export" ${ready(report) ? '' : 'disabled'}>${icon('share')}Als PDF exportieren</button>
  <p class="notice">Für das fertige PDF: Titel, Name, mindestens eine Kompetenz und alle sechs Abschnitte ausfüllen. In dieser Webvorschau öffnet sich der Druckdialog.</p><p class="saved-caption">Änderungen werden in diesem Browser gespeichert.</p><button class="danger-button" data-action="delete-report">Bericht löschen</button>`}`;
}
function coveragePage(): string {
  const count = (id: string) => state.captures.filter(c => c.competencyIds.includes(id)).length;
  const covered = competencies.filter(c => count(c.id) > 0).length;
  return `${heading('Deine Handlungskompetenzen', 'Dein Lernen<br/>wird sichtbar.', 'Entdecke, was du schon festgehalten hast<br/>und wo noch Platz für Neues ist.')}
  <div class="coverage-summary"><b>${covered} von ${competencies.length} mit Einträgen</b>${icon('leaf')}</div><div class="progress"><i style="width:${covered / competencies.length * 100}%"></i></div>
  <div class="coverage-grid">${competencies.map(c => `<button class="competency-card ${count(c.id) ? 'has-captures' : ''}" data-action="coverage-filter" data-id="${c.id}"><small>${c.code}</small><b>${c.title}</b><span class="count">${count(c.id)}<small>${count(c.id) === 1 ? 'Eintrag' : 'Einträge'}</small></span></button>`).join('')}</div>
  <div class="notice">Demo-Kompetenzen · Platzhalter für deinen Bildungsplan. Die Anzahl zeigt gesammelte Einträge, keine erreichte Qualifikation.</div>`;
}

function tagsSheet(report = false): string {
  const target = report ? activeReport : detail ?? state.draft;
  if (!target) return '';
  return `<p class="notice">${report ? 'Wähle die Kompetenzen für diesen Bericht.' : 'Freiwillig. Du kannst alles später zuordnen.'}</p><div class="section-label">Handlungskompetenzen</div>
  ${competencies.map(c => `<label class="check-row"><input type="checkbox" data-competency="${c.id}" ${target.competencyIds.includes(c.id) ? 'checked' : ''}/><span><small>${c.code}</small>${c.title}</span></label>`).join('')}
  <p class="notice">Demo-Kompetenzen · Die verbindlichen Einträge aus deinem Bildungsplan werden noch eingesetzt.</p>
  ${!report ? `<div class="section-label">Projekt</div><label class="sr-only" for="tag-project">Projekt auswählen</label><select class="select-input" id="tag-project"><option value="">Ohne Projekt</option>${state.projects.map(p => `<option value="${p.id}" ${('projectId' in target && target.projectId === p.id) ? 'selected' : ''}>${escape(p.name)}</option>`).join('')}</select><div class="inline-project"><input class="text-input" id="new-project" placeholder="Neues Projekt" aria-label="Neues Projekt"/><button data-action="add-project">Hinzufügen</button></div>` : ''}`;
}
function sheetBody(): string {
  if (sheet === 'tags' || sheet === 'report-tags') return tagsSheet(sheet === 'report-tags');
  if (sheet === 'filter') return `<div class="form-field"><label class="form-label" for="filter-competency">Handlungskompetenz</label><select id="filter-competency" class="select-input"><option value="">Alle Kompetenzen</option>${competencies.map(c => `<option value="${c.id}" ${filter.competency === c.id ? 'selected' : ''}>${c.code} · ${c.title}</option>`).join('')}</select></div>
  <div class="form-field"><label class="form-label" for="filter-project">Projekt</label><select id="filter-project" class="select-input"><option value="">Alle Projekte</option>${state.projects.map(p => `<option value="${p.id}" ${filter.project === p.id ? 'selected' : ''}>${escape(p.name)}</option>`).join('')}</select></div>
  <div class="date-row"><div><label class="form-label" for="filter-from">Von</label><input class="text-input" type="date" id="filter-from" value="${filter.from}"/></div><div><label class="form-label" for="filter-to">Bis</label><input class="text-input" type="date" id="filter-to" min="${filter.from}" value="${filter.to}"/></div></div><button class="secondary" data-action="clear-filter">Alle Filter zurücksetzen</button>`;
  if (sheet === 'detail' && detail) return `<p class="page-eyebrow">${dateLabel(detail.createdAt, true)}</p><label class="sr-only" for="detail-text">Eintrag bearbeiten</label><textarea class="text-input" id="detail-text">${escape(detail.text)}</textarea>${attachment(detail)}<button class="secondary" data-action="tags">${icon('tag')}Kompetenzen und Projekt zuordnen</button>${chips(detail)}${detail.projectId ? `<p class="notice">Projekt: ${escape(projectName(detail.projectId) ?? '')}</p>` : ''}<button class="danger-button" data-action="delete-capture">Eintrag löschen</button><button class="secondary" data-action="cancel-detail">Änderungen verwerfen</button>`;
  if (sheet === 'sources' && activeReport) {
    const report = activeReport;
    return `<p class="notice">Wähle deine Belege und übernimm Notiztexte in einen IPERKA-Abschnitt.</p>${reportCaptures(report).map(c => `<div class="source-note"><label><input type="checkbox" data-source="${c.id}" ${report.captureIds.includes(c.id) ? 'checked' : ''}/><span>${dateLabel(c.createdAt)}</span></label><p>${escape(c.text || 'Eintrag mit Anhang')}</p>${attachment(c)}${c.text ? `<label class="sr-only" for="source-section-${c.id}">Zielabschnitt</label><select class="select-input" id="source-section-${c.id}">${sections.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}</select><button data-action="insert-source" data-id="${c.id}">Text in Abschnitt übernehmen</button>` : ''}</div>`).join('') || empty('Keine passenden Einträge', 'Passe Zeitraum oder Kompetenzen an.')}`;
  }
  if (sheet === 'help') return `<p class="intro-copy">Das ist die interaktive Basis-Demo von Lernspur 1.0. Wochenziele, Widget und Lernkarten findest du in der nativen App 1.2.0. Alle vier Bereiche sind anklickbar. Drei Beispielnotizen zeigen dir den Ablauf.</p><p class="notice">Deine Eingaben bleiben nur in diesem Browser und sind getrennt von der nativen iPhone-App. Die Kompetenzen sind Demo-Platzhalter.</p><button class="primary" data-action="example">Beispielnotiz ausprobieren ${icon('arrow')}</button><div class="section-label">Die native App</div><p class="page-subtitle">Die vollständige SwiftUI-App speichert Notizen, Fotos, Sprachmemos und Berichte lokal in SQLite. Sie exportiert mehrseitige PDFs direkt über das iPhone-Teilen-Menü.</p><a class="secondary" href="./native.html">Die echte iPhone-App ansehen ${icon('up')}</a><p class="page-subtitle">Diese Vorschau funktioniert auch, wenn dein Mac ausgeschaltet ist. Die native App wird separat mit Xcode auf deinem iPhone installiert.</p><button class="secondary" data-action="reset">Vorschau zurücksetzen</button>`;
  if (sheet === 'reset') return `<p class="intro-copy">Alle eigenen Eingaben in dieser Webvorschau löschen und die drei Beispielnotizen wiederherstellen?</p><p class="notice">Die Daten in der nativen iPhone-App sind davon unabhängig.</p><button class="primary" data-action="confirm-reset">Vorschau zurücksetzen</button><button class="secondary" data-action="close-sheet">Abbrechen</button>`;
  return '';
}
function modal(): string {
  if (!sheet) return '';
  const titles: Record<Exclude<Sheet, null>, string> = { tags: 'Zuordnen', filter: 'Journal filtern', detail: 'Dein Moment', 'report-tags': 'Kompetenzen', sources: 'Deine Quellen', help: 'Entdecke Lernspur.', reset: 'Neu anfangen?' };
  return `<div class="modal-shade"><section class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabindex="-1"><header><h2 id="sheet-title">${titles[sheet]}</h2><button data-action="close-sheet">${sheet === 'detail' ? 'Speichern' : sheet === 'filter' ? 'Anwenden' : 'Fertig'}</button></header>${sheetBody()}</section></div>`;
}
function render(resetScroll = false) {
  const entrance = !root.hasChildNodes();
  const oldScroll = resetScroll ? 0 : document.querySelector('.phone-content')?.scrollTop ?? 0;
  const oldSheetScroll = document.querySelector('.sheet')?.scrollTop ?? 0;
  const focusId = (document.activeElement as HTMLElement | null)?.id;
  root.innerHTML = `<header class="site-header"><div class="brand"><img src="./logo.svg" alt="Lernspur Logo"/>lernspur</div><span class="small">Dein Lernen hinterlässt Spuren.</span><a class="preview-badge" href="./"><i class="dot"></i>Zur Lernspur-Website ↗</a></header>
  <main class="layout ${entrance ? 'enter' : ''}"><aside class="intro"><div class="eyebrow">Für deinen Weg durch die Lehre</div><h1>Lernen passiert.<br/><em>Halte es fest.</em></h1><p class="intro-copy">Der gelöste Fehler. Das erste Code-Review. Der kleine Aha-Moment. Aus deinem Arbeitsalltag wird ein Lernjournal — ganz nebenbei.</p><span class="pill">${icon('leaf')}Kleine Momente. Sichtbarer Fortschritt.</span>
  <nav class="tour" aria-label="Interaktive Tour"><div class="tour-heading"><span>ENTDECKE LERNSPUR</span><button data-action="help">So funktioniert’s</button></div>${steps.map((step, i) => `<button class="tour-step ${tab === step.tab ? 'active' : ''}" data-tab="${step.tab}" ${tab === step.tab ? 'aria-current="step"' : ''}><span class="tour-number">0${i + 1}</span><span><span class="step-title">${step.title}</span><span class="step-detail" style="display:block">${step.detail}</span></span>${tab === step.tab ? icon('arrow') : ''}</button>`).join('')}</nav><div class="privacy-note">${icon('lock')}Ohne Konto. Ohne Cloud. Einfach dein Journal.</div></aside>
  <div class="phone-column"><div class="phone"><div class="mobile-preview"><span>Interaktive Vorschau · Lernspur</span><button data-action="help">Entdecken ${icon('arrow')}</button></div>
  <div class="statusbar" aria-hidden="true"><span>9:41</span><div class="island"></div><span class="status-icons">${icon('signal')}${icon('wifi')}${icon('battery')}</span></div>
  <div class="phone-content" ${sheet ? 'inert' : ''}>${tab === 'capture' ? capturePage() : tab === 'journal' ? journalPage() : tab === 'reports' ? reportsPage() : coveragePage()}</div>
  ${tab === 'capture' ? `<div class="save-area" ${sheet ? 'inert' : ''}><button class="primary" id="save-capture" data-action="save" ${(!hasContent(state.draft) && !recording) || mediaBusy ? 'disabled' : ''}>${icon(saved ? 'check' : 'plus')}<span>${saved ? 'Im Journal gespeichert' : 'Moment festhalten'}</span>${icon('arrow', 'end')}</button><small>Automatisch datiert. Ganz ohne Pflichtfelder.</small></div>` : ''}
  <nav class="tabbar" aria-label="App-Navigation" ${sheet ? 'inert' : ''}>${steps.map(step => `<button class="tab ${tab === step.tab ? 'active' : ''}" data-tab="${step.tab}" ${tab === step.tab ? 'aria-current="page"' : ''}>${icon(step.icon)}<span>${({ capture: 'Festhalten', journal: 'Journal', reports: 'Berichte', coverage: 'Kompetenzen' })[step.tab]}</span></button>`).join('')}</nav>${modal()}</div><div class="phone-caption">${icon('phone')}Alles anklickbar. Probier’s aus.</div></div></main>
  <footer class="site-footer"><span>Für Schweizer Lernende · EFZ & eine Menge Aha-Momente</span><span>Ein kleiner Moment. Ein Schritt weiter.</span></footer>`;
  const scroll = document.querySelector('.phone-content'); if (scroll) scroll.scrollTop = oldScroll;
  const sheetElement = document.querySelector<HTMLElement>('.sheet');
  if (sheetElement) { sheetElement.scrollTop = oldSheetScroll; sheetElement.focus({ preventScroll: true }); }
  if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true });
  if (toastMessage) mountToast();
}
function saveReport(): boolean {
  if (!activeReport || reportSetup) return true;
  const index = state.reports.findIndex(r => r.id === activeReport?.id);
  if (index >= 0) state.reports[index] = activeReport; else state.reports.unshift(activeReport);
  return persist();
}
function reconcileSources() {
  if (!activeReport) return;
  const matching = new Set(reportCaptures(activeReport).map(c => c.id));
  activeReport.captureIds = activeReport.captureIds.filter(id => matching.has(id));
}
function updateSaveButton() {
  const button = document.querySelector<HTMLButtonElement>('#save-capture');
  if (button) {
    button.disabled = (!hasContent(state.draft) && !recording) || mediaBusy;
    button.innerHTML = `${icon('plus')}<span>Moment festhalten</span>${icon('arrow', 'end')}`;
  }
  const exportButton = document.querySelector<HTMLButtonElement>('#export-report');
  if (exportButton && activeReport) exportButton.disabled = !ready(activeReport);
}
function closeSheet(): boolean {
  if (sheet === 'tags' && detail) { sheet = 'detail'; render(); return true; }
  if (sheet === 'detail' && detail) {
    if (!hasContent(detail)) { toast('Schreibe etwas oder behalte einen Anhang.'); return false; }
    const index = state.captures.findIndex(c => c.id === detail?.id);
    const previous = state.captures[index]; state.captures[index] = detail;
    if (!persist()) { state.captures[index] = previous; return false; }
    detail = null;
  }
  if (sheet === 'filter' && filter.from && filter.to && filter.from > filter.to) { toast('Das Enddatum muss nach dem Startdatum liegen.'); return false; }
  if (sheet === 'tags' && !persist()) return false;
  if ((sheet === 'report-tags' || sheet === 'sources') && !saveReport()) return false;
  sheet = null; render(); return true;
}
async function saveCapture() {
  if (recording) await stopRecording();
  if (!hasContent(state.draft) || mediaBusy) return;
  const capture = { ...state.draft, createdAt: new Date().toISOString() };
  const oldDraft = state.draft;
  state.captures.unshift(capture); state.draft = blankCapture();
  if (!persist()) { state.captures.shift(); state.draft = oldDraft; return; }
  saved = true; (document.activeElement as HTMLElement)?.blur(); render(); toast('Dein Moment ist im Journal.');
}
function fileData(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Datei nicht lesbar')); reader.onerror = () => reject(new Error('Datei nicht lesbar')); reader.readAsDataURL(file); });
}
async function importPhoto(file: File) {
  mediaBusy = true; updateSaveButton();
  try {
    const data = await fileData(file);
    const image = new Image(); image.src = data; await image.decode();
    const ratio = Math.min(1, 1200 / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas'); canvas.width = image.width * ratio; canvas.height = image.height * ratio;
    const context = canvas.getContext('2d'); if (!context) throw new Error('Foto konnte nicht gelesen werden');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const old = state.draft.photoUri; state.draft.photoUri = canvas.toDataURL('image/jpeg', 0.75);
    if (!persist()) { state.draft.photoUri = old; return; }
  } catch { toast('Dieses Foto konnte nicht geöffnet werden. Versuche JPG oder PNG.'); }
  finally { mediaBusy = false; render(); }
}
async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') { toast('Dieser Browser unterstützt keine Sprachaufnahme. In der nativen App ist sie verfügbar.'); return; }
  mediaBusy = true; updateSaveButton();
  let stream: MediaStream | undefined;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mimeType = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find(type => MediaRecorder.isTypeSupported(type));
    recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    recorder.start(); recording = true; mediaBusy = false; render();
    const current = recorder;
    window.setTimeout(() => { if (recording && current === recorder) { void stopRecording().then(() => { render(); toast('Die Webvorschau begrenzt Memos auf 60 Sekunden.'); }); } }, 60000);
  } catch { stream?.getTracks().forEach(track => track.stop()); mediaBusy = false; render(); toast('Mikrofonzugriff nicht möglich. Erlaube den Zugriff in Safari oder halte deinen Gedanken als Text fest.'); }
}
function stopRecording(): Promise<void> {
  return new Promise(resolve => {
    const current = recorder;
    if (!current || current.state === 'inactive') { recording = false; resolve(); return; }
    const chunks: Blob[] = [];
    current.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
    current.onstop = () => {
      current.stream.getTracks().forEach(track => track.stop());
      void (async () => {
        try {
          const data = await fileData(new Blob(chunks, { type: current.mimeType || 'audio/mp4' }));
          const old = state.draft.audioUri; state.draft.audioUri = data;
          if (!persist()) state.draft.audioUri = old;
        } catch { toast('Die Sprachmemo konnte nicht gespeichert werden.'); }
        finally { recorder = null; recording = false; mediaBusy = false; resolve(); }
      })();
    };
    mediaBusy = true; current.stop();
  });
}
function exportPDF(report: Report) {
  if (!ready(report) || !saveReport()) return;
  document.querySelector('#print-report')?.remove();
  const print = document.createElement('article'); print.id = 'print-report'; print.style.display = 'none';
  print.innerHTML = `<small>LERNBERICHT · LERNSPUR</small><h1>${escape(report.title)}</h1><p>${dateLabel(report.dateFrom)} – ${dateLabel(report.dateTo)}<br/>Autor / Autorin: ${escape(report.authorName)}</p><p>Handlungskompetenzen:<br/>${report.competencyIds.map(id => { const c = competencyLabel(id); return c ? `${c.code} · ${c.title}` : escape(id); }).join('<br/>')}</p><small>Demo-Kompetenzen · Keine offiziellen Bildungsplan-Codes.</small>${sections.map((s, index) => `<section><h2>${index + 1} · ${s.title}</h2><p>${escape(report.sections[s.id])}</p></section>`).join('')}<div class="signature"><h2>Besprochen und geprüft</h2><p>_________________________　　　________________________________<br/>Ort, Datum　　　　　　　　　　　 Unterschrift Berufsbildner/in</p></div>`;
  document.body.append(print); window.print();
}

root.addEventListener('click', event => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('[data-action], [data-tab]');
  if (!target) return;
  const newTab = target.dataset.tab as Tab | undefined;
  if (newTab) {
    void (async () => { if (recording) await stopRecording(); if (activeReport && !saveReport()) return; tab = newTab; activeReport = null; reportSetup = false; detail = null; sheet = null; render(true); })(); return;
  }
  const action = target.dataset.action;
  const id = target.dataset.id;
  switch (action) {
    case 'save': void saveCapture(); break;
    case 'tags': sheet = 'tags'; render(); break;
    case 'help': sheet = 'help'; render(); break;
    case 'filter': sheet = 'filter'; render(); break;
    case 'close-sheet': closeSheet(); break;
    case 'clear-filter': filter = { competency: '', project: '', from: '', to: '' }; sheet = null; render(true); break;
    case 'detail': detail = structuredClone(state.captures.find(c => c.id === id) ?? null); sheet = 'detail'; render(); break;
    case 'cancel-detail': detail = null; sheet = null; render(); break;
    case 'coverage-filter': filter = { competency: id ?? '', project: '', from: '', to: '' }; tab = 'journal'; render(true); break;
    case 'example': tab = 'capture'; state.draft.text = 'Heute zum ersten Mal einen Pull Request reviewed. Dabei einen Randfall gefunden, den unsere Tests noch nicht abdecken.'; sheet = null; persist(); render(true); document.querySelector<HTMLTextAreaElement>('#capture-text')?.focus(); break;
    case 'reset': sheet = 'reset'; render(); break;
    case 'confirm-reset': { const previous = state; state = seed(); if (!persist()) { state = previous; break; } activeReport = null; detail = null; filter = { competency: '', project: '', from: '', to: '' }; tab = 'capture'; sheet = null; saved = false; render(true); break; }
    case 'remove-photo': delete state.draft.photoUri; persist(); render(); break;
    case 'remove-audio': delete state.draft.audioUri; persist(); render(); break;
    case 'record': if (recording) void stopRecording().then(() => render()); else void startRecording(); break;
    case 'add-project': {
      const input = document.querySelector<HTMLInputElement>('#new-project'); const name = input?.value.trim(); if (!name) return;
      let project = state.projects.find(p => p.name.toLocaleLowerCase('de-CH') === name.toLocaleLowerCase('de-CH'));
      if (!project) { project = { id: uid(), name }; state.projects.push(project); }
      (detail ?? state.draft).projectId = project.id; persist(); render(); break;
    }
    case 'delete-capture': {
      if (!detail || !window.confirm('Diesen Eintrag mit allen Anhängen endgültig löschen?')) return;
      const old = structuredClone(state); const captureId = detail.id;
      state.captures = state.captures.filter(c => c.id !== captureId);
      state.reports.forEach(r => { r.captureIds = r.captureIds.filter(id => id !== captureId); });
      if (!persist()) { state = old; return; } detail = null; sheet = null; render(); break;
    }
    case 'new-report': activeReport = newReport(); reportSetup = true; render(true); break;
    case 'create-report': {
      if (!activeReport || !activeReport.competencyIds.length || activeReport.dateFrom > activeReport.dateTo) return;
      activeReport.title = activeReport.title.trim() || 'Mein Lernbericht'; activeReport.captureIds = reportCaptures(activeReport).map(c => c.id); reportSetup = false;
      if (saveReport()) render(true); else reportSetup = true;
      break;
    }
    case 'open-report': activeReport = structuredClone(state.reports.find(r => r.id === id) ?? null); reportSetup = false; render(true); break;
    case 'report-back': if (!saveReport()) return; activeReport = null; reportSetup = false; render(true); break;
    case 'report-tags': sheet = 'report-tags'; render(); break;
    case 'sources': sheet = 'sources'; render(); break;
    case 'insert-source': {
      const capture = state.captures.find(c => c.id === id); const selected = document.querySelector<HTMLSelectElement>(`#source-section-${id}`)?.value as Section | undefined;
      if (!capture || !activeReport || !selected) return;
      activeReport.sections[selected] += (activeReport.sections[selected] ? '\n\n' : '') + capture.text;
      if (!activeReport.captureIds.includes(capture.id)) activeReport.captureIds.push(capture.id);
      saveReport(); render(); toast(`Text in «${sections.find(s => s.id === selected)?.title}» übernommen.`); break;
    }
    case 'export': if (activeReport) exportPDF(activeReport); break;
    case 'delete-report': {
      if (!activeReport || !window.confirm('Diesen Bericht löschen? Die Journaleinträge bleiben erhalten.')) return;
      const old = state.reports; state.reports = state.reports.filter(r => r.id !== activeReport?.id);
      if (!persist()) { state.reports = old; return; } activeReport = null; render(true); break;
    }
  }
});

root.addEventListener('input', event => {
  const input = event.target as HTMLInputElement | HTMLTextAreaElement;
  if (input.id === 'capture-text') { state.draft.text = input.value; saved = false; persist(); updateSaveButton(); }
  if (input.id === 'detail-text' && detail) detail.text = input.value;
  if (activeReport) {
    if (input.id === 'report-title') activeReport.title = input.value;
    else if (input.id === 'report-author') activeReport.authorName = input.value;
    else if (input.id.startsWith('section-')) { const section = input.id.slice(8) as Section; if (sections.some(s => s.id === section)) activeReport.sections[section] = input.value; }
    else return;
    saveReport(); updateSaveButton();
  }
});
root.addEventListener('change', event => {
  const input = event.target as HTMLInputElement | HTMLSelectElement;
  if (input.id === 'photo-input' && input instanceof HTMLInputElement && input.files?.[0]) { void importPhoto(input.files[0]); return; }
  if (input.dataset.competency && input instanceof HTMLInputElement) {
    const target = sheet === 'report-tags' ? activeReport : detail ?? state.draft;
    if (target) { const id = input.dataset.competency; target.competencyIds = input.checked ? [...new Set([...target.competencyIds, id])] : target.competencyIds.filter(value => value !== id); }
    if (sheet === 'report-tags') { reconcileSources(); saveReport(); } else if (!detail) persist();
  }
  if (input.id === 'tag-project') { (detail ?? state.draft).projectId = input.value || undefined; if (!detail) persist(); }
  if (input.id.startsWith('filter-')) {
    const key = input.id.slice(7) as keyof Filters; filter[key] = input.value;
    if (filter.from && filter.to && filter.to < filter.from) filter.to = filter.from;
    render();
  }
  if (activeReport) {
    if (input.id === 'report-from') { activeReport.dateFrom = input.value; if (activeReport.dateTo < input.value) activeReport.dateTo = input.value; }
    else if (input.id === 'report-to') activeReport.dateTo = input.value;
    else if (input.id === 'report-competency') activeReport.competencyIds = input.value ? [input.value] : [];
    else if (input.dataset.source && input instanceof HTMLInputElement) {
      const id = input.dataset.source; activeReport.captureIds = input.checked ? [...new Set([...activeReport.captureIds, id])] : activeReport.captureIds.filter(value => value !== id);
    } else return;
    reconcileSources(); saveReport(); render();
  }
});
document.addEventListener('keydown', event => {
  if (!sheet) return;
  if (event.key === 'Escape') { event.preventDefault(); if (sheet === 'detail') { detail = null; sheet = null; render(); } else closeSheet(); }
  if (event.key === 'Tab') {
    const elements = [...document.querySelectorAll<HTMLElement>('.sheet button, .sheet input, .sheet textarea, .sheet select, .sheet a')].filter(el => !el.hasAttribute('disabled'));
    const first = elements[0], last = elements.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement?.classList.contains('sheet'))) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && recording) void stopRecording().then(() => render()); });
render();
if (storageWarning) toast(storageWarning);

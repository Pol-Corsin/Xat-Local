// ! # INFORMACIO SOBRE LA PANTALLA

export function ScreenWidth(): number {
    return window.innerWidth;
}
export function ScreenHeight(): number {
    return window.innerHeight;
}
export function ScreenAvWidth(): number {
    return window.screen.availWidth;
}
export function ScreenAvHeight(): number {
    return window.screen.availHeight;
}

// ! # INFORMACIO SOBRE EL NAVEGADOR

export function UserAgent(): string {
    return navigator.userAgent;
}
export function MobileDevice(): boolean {
    return /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent);
}
export function OperatingSystem(): string {
    const ua = navigator.userAgent;
    if (/Windows/i.test(ua)) return "Windows";
    if (/Android/i.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
    if (/Mac OS X|Macintosh/i.test(ua)) return "macOS";
    if (/Linux/i.test(ua)) return "Linux";
    return "Unknown";
}
export function BrowserLang(): string {
    return navigator.language;
}

// ! # INFORMACIO SOBRE LA URL ACTUAL

export function CurrentURL(): string {
    return window.location.href;
}
export function Protocol(): string {
    return window.location.protocol; // "https:"
}
export function Host(): string {
    return window.location.host; // "localhost:5173"
}
export function Hostname(): string {
    return window.location.hostname; // "localhost"
}
export function Port(): string {
    return window.location.port;
}
export function Path(): string {
    return window.location.pathname;
}
export function QueryString(): string {
    return window.location.search; // "?id=3"
}
export function Hash(): string {
    return window.location.hash;
}

/**
 * Llegeix un parametre de la url. Si la url es "xat-ind.html?id=X1",
 * getParam("id") torna "X1". Si no existeix torna null.
 */
export function getParam(name: string): string | null {
    // URLSearchParams ja sap separar "?id=X1&a=2" en parelles clau/valor
    return new URLSearchParams(QueryString()).get(name);
}

// ! # Obrir i tancar finestres

/**
 * Crea UNA finestra amb les mesures i la posició indicades.
 * @param url     adreça a obrir
 * @param width   ample en px
 * @param height  alt en px
 * @param left    posició horitzontal en px
 * @param top     posició vertical en px
 * @returns la finestra creada, o null si el navegador bloqueja el popup
 */
export function createWindow(
    // ? DADES
    url: string,
    width: number,
    height: number,
    left: number,
    top: number
): Window | null {
    const features = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, "_blank", features);
}

/**
 * Crea `count` finestres repartides per la pantalla (quadrícula).
 * @param count número de finestres
 * @param url   adreça que obrirà cada una
 */
export function distributeWindows(count: number, url: string): Window[] {
    const aw = ScreenAvWidth();
    const ah = ScreenAvHeight();
    const cols = Math.ceil(Math.sqrt((count * aw) / ah));
    const rows = Math.ceil(count / cols);
    const w = Math.floor(aw / cols);
    const h = Math.floor(ah / rows);

    const wins: Window[] = [];
    for (let i = 0; i < count; i++) {
        const left = (i % cols) * w;
        const top = Math.floor(i / cols) * h;
        const win = createWindow(url, w, h, left, top);
        if (win) wins.push(win);
    }
    return wins;
}

/**
 * Diu si una finestra segueix oberta.
 * Torna false si es null (mai s'ha obert) o si l'usuari l'ha tancada.
 */
export function isWindowOpen(win: Window | null): boolean {
    return win !== null && !win.closed;
}

/**
 * Tanca una finestra nomes si existeix i segueix oberta.
 */
export function closeWindow(win: Window | null): void {
    if (win !== null && !win.closed) win.close();
}

// ! # Crear pestaña

/**
 * Crea UNA pestanya nova.
 * @param url adreça a obrir (per defecte, en blanc)
 * @returns la pestanya creada, o null si el navegador bloqueja el popup
 */
export function createTab(url: string = ""): Window | null {
    return window.open(url, "_blank");
}

// ! # Crear iFrames

/**
 * Crea un iframe dins d'un element (per defecte, el body).
 */
export function createIFrame(
    // ? DADES
    url: string,
    width: number,
    height: number,
    parent: HTMLElement = document.body
): HTMLIFrameElement {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = String(width);
    iframe.height = String(height);
    parent.appendChild(iframe);
    return iframe;
}

// ! # LOCALSTORAGE

// ? localStorage nomes guarda TEXT (string). Per guardar objectes o arrays
// ? els hem de convertir a text amb JSON.stringify i, al llegir, tornar-los
// ? a convertir amb JSON.parse.

/**
 * Guarda qualsevol valor (objecte, array, numero...) com a JSON.
 */
export function saveJSON(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Llegeix un valor guardat amb saveJSON.
 * @param key     la clau
 * @param defecte el que tornem si la clau no existeix o el json esta trencat
 */
export function loadJSON<T>(key: string, defecte: T): T {
    const text = localStorage.getItem(key); // string o null
    if (text === null) return defecte;
    try {
        return JSON.parse(text) as T;
    } catch {
        // si algu ha guardat text que no es json valid no volem que peti tot
        return defecte;
    }
}

/**
 * Esborra una clau del localStorage.
 */
export function removeKey(key: string): void {
    localStorage.removeItem(key);
}


// ! # SCROLL

/**
 * Baixa l'scroll d'un element fins al final.
 * scrollHeight = alcada total del contingut, scrollTop = fins on hem baixat.
 * Si posem scrollTop = scrollHeight, es veu l'ultima linia.
 * S'ha de cridar DESPRES d'haver canviat el text, sino calcula amb el text vell.
 */
export function scrollToBottom(el: HTMLElement): void {
    el.scrollTop = el.scrollHeight;
}

// ! # DADES DEL XAT (compartides entre l'admin i les finestres d'usuari)

// ? claus del localStorage. Les posem aqui perque les facin servir tots dos
// ? fitxers i no ens equivoquem escrivint-les a ma dues vegades.
export const KEY_ENTRADA = "xat_entrada";     // l'usuari hi deixa el missatge nou, l'admin el llegeix
export const KEY_HISTORIAL = "xat_historial"; // l'admin hi guarda tots els missatges, els usuaris el llegeixen

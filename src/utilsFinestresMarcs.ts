
// ! # INFORMACIO SOBRE LA PANTALLA                                                                      # INFORMACIO SOBRE LA PANTALLA

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

// ! # INFORMACIO SOBRE EL NAVEGADOR                                                                    # INFORMACIO SOBRE EL NAVEGADOR

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
// ! # INFORMACIO SOBRE LA URL ACTUAL                                                                   # INFORMACIO SOBRE LA URL ACTUAL
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

// ! # Obrir finestres                                                                                                      # Obrir finestres

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


// ! # Crear pestaña

/**
 * Crea UNA pestanya nova.
 * @param url adreça a obrir (per defecte, en blanc)
 * @returns la pestanya creada, o null si el navegador bloqueja el popup
 */
export function createTab(url: string = ""): Window | null {
    return window.open(url, "_blank");
}


// ! # Crear iFrames                                                                                                       # Crear iFrames

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



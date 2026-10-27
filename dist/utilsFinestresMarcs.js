export function ScreenWidth() {
    return window.innerWidth;
}
export function ScreenHeight() {
    return window.innerHeight;
}
export function ScreenAvWidth() {
    return window.screen.availWidth;
}
export function ScreenAvHeight() {
    return window.screen.availHeight;
}
export function UserAgent() {
    return navigator.userAgent;
}
export function MobileDevice() {
    return /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent);
}
export function OperatingSystem() {
    const ua = navigator.userAgent;
    if (/Windows/i.test(ua))
        return "Windows";
    if (/Android/i.test(ua))
        return "Android";
    if (/iPhone|iPad|iPod/i.test(ua))
        return "iOS";
    if (/Mac OS X|Macintosh/i.test(ua))
        return "macOS";
    if (/Linux/i.test(ua))
        return "Linux";
    return "Unknown";
}
export function BrowserLang() {
    return navigator.language;
}
export function CurrentURL() {
    return window.location.href;
}
export function Protocol() {
    return window.location.protocol;
}
export function Host() {
    return window.location.host;
}
export function Hostname() {
    return window.location.hostname;
}
export function Port() {
    return window.location.port;
}
export function Path() {
    return window.location.pathname;
}
export function QueryString() {
    return window.location.search;
}
export function Hash() {
    return window.location.hash;
}
export function getParam(name) {
    return new URLSearchParams(QueryString()).get(name);
}
export function createWindow(url, width, height, left, top) {
    const features = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, "_blank", features);
}
export function distributeWindows(count, url) {
    const aw = ScreenAvWidth();
    const ah = ScreenAvHeight();
    const cols = Math.ceil(Math.sqrt((count * aw) / ah));
    const rows = Math.ceil(count / cols);
    const w = Math.floor(aw / cols);
    const h = Math.floor(ah / rows);
    const wins = [];
    for (let i = 0; i < count; i++) {
        const left = (i % cols) * w;
        const top = Math.floor(i / cols) * h;
        const win = createWindow(url, w, h, left, top);
        if (win)
            wins.push(win);
    }
    return wins;
}
export function isWindowOpen(win) {
    return win !== null && !win.closed;
}
export function closeWindow(win) {
    if (win !== null && !win.closed)
        win.close();
}
export function createTab(url = "") {
    return window.open(url, "_blank");
}
export function createIFrame(url, width, height, parent = document.body) {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = String(width);
    iframe.height = String(height);
    parent.appendChild(iframe);
    return iframe;
}
export function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function loadJSON(key, defecte) {
    const text = localStorage.getItem(key);
    if (text === null)
        return defecte;
    try {
        return JSON.parse(text);
    }
    catch {
        return defecte;
    }
}
export function removeKey(key) {
    localStorage.removeItem(key);
}
export function scrollToBottom(el) {
    el.scrollTop = el.scrollHeight;
}
export const KEY_ENTRADA = "xat_entrada";
export const KEY_HISTORIAL = "xat_historial";
//# sourceMappingURL=utilsFinestresMarcs.js.map
import { createWindow, closeWindow, isWindowOpen, ScreenAvHeight, ScreenAvWidth, saveJSON, loadJSON, removeKey, KEY_ENTRADA, KEY_HISTORIAL, scrollToBottom } from "./utilsFinestresMarcs.js";
const NOM_ADMIN = "Admin";
const bStart = document.getElementById("bStart");
const ta = document.getElementById("ta");
const iMsg = document.getElementById("iMsg");
const bSend = document.getElementById("bSend");
const bClear = document.getElementById("bClear");
const bClose1 = document.getElementById("closeW1");
const bClose2 = document.getElementById("closeW2");
const finestres = [null, null];
function obreFinestra(i) {
    const width = Math.floor(ScreenAvWidth() / 2);
    const height = Math.floor(ScreenAvHeight() / 2);
    const left = ScreenAvWidth() - width;
    const top = i * height;
    finestres[i] = createWindow(`xat-ind.html?id=X${i + 1}`, width, height, left, top);
}
function pinta(historial) {
    ta.value = historial.map(m => `${m.user}: ${m.text}`).join("\n");
    scrollToBottom(ta);
}
function afegeixMissatge(m) {
    const historial = loadJSON(KEY_HISTORIAL, []);
    historial.push(m);
    saveJSON(KEY_HISTORIAL, historial);
    pinta(historial);
}
function start() {
    saveJSON(KEY_HISTORIAL, []);
    removeKey(KEY_ENTRADA);
    pinta([]);
    obreFinestra(0);
    obreFinestra(1);
}
function enviaAdmin() {
    const text = iMsg.value.trim();
    if (text === "")
        return;
    afegeixMissatge({ id: Date.now(), user: NOM_ADMIN, text });
    iMsg.value = "";
}
function esborra() {
    saveJSON(KEY_HISTORIAL, []);
    pinta([]);
    for (let i = 0; i < finestres.length; i++) {
        if (!isWindowOpen(finestres[i]))
            obreFinestra(i);
    }
}
bStart.addEventListener("click", start);
bSend.addEventListener("click", enviaAdmin);
bClear.addEventListener("click", esborra);
bClose1.addEventListener("click", () => closeWindow(finestres[0]));
bClose2.addEventListener("click", () => closeWindow(finestres[1]));
window.addEventListener("storage", (e) => {
    if (e.key !== KEY_ENTRADA)
        return;
    if (e.newValue === null)
        return;
    const m = JSON.parse(e.newValue);
    afegeixMissatge(m);
});
//# sourceMappingURL=main.js.map
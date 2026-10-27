import { getParam, loadJSON, saveJSON, KEY_ENTRADA, KEY_HISTORIAL, scrollToBottom } from "./utilsFinestresMarcs.js";
const meuId = getParam("id") ?? "Desconegut";
const spanUsuari = document.getElementById("usuari");
const ta = document.getElementById("ta");
const iMsg = document.getElementById("iMsg");
const bSend = document.getElementById("bSend");
spanUsuari.textContent = meuId;
document.title = meuId;
function pinta(historial) {
    ta.value = historial.map(m => `${m.user}: ${m.text}`).join("\n");
    scrollToBottom(ta);
}
function envia() {
    const text = iMsg.value.trim();
    if (text === "")
        return;
    const m = { id: Date.now(), user: meuId, text };
    saveJSON(KEY_ENTRADA, m);
    iMsg.value = "";
}
bSend.addEventListener("click", envia);
window.addEventListener("storage", (e) => {
    if (e.key !== KEY_HISTORIAL)
        return;
    pinta(loadJSON(KEY_HISTORIAL, []));
});
pinta(loadJSON(KEY_HISTORIAL, []));
//# sourceMappingURL=xat-ind.js.map
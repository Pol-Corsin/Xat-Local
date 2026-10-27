import { getParam, loadJSON, saveJSON, KEY_ENTRADA, KEY_HISTORIAL, scrollToBottom } from "./utilsFinestresMarcs.js";

// ! # QUI SOC

// l'admin ens obre amb "xat-ind.html?id=X1", aixi que el nom surt de la url
// ?? es "si es null, fes servir aixo altre"
const meuId = getParam("id") ?? "Desconegut";

// ! # ELEMENTS DEL HTML

const spanUsuari = document.getElementById("usuari") as HTMLSpanElement;
const ta = document.getElementById("ta") as HTMLTextAreaElement;
const iMsg = document.getElementById("iMsg") as HTMLInputElement;
const bSend = document.getElementById("bSend") as HTMLButtonElement;

spanUsuari.textContent = meuId;
document.title = meuId;

// ! # FUNCIONS

function pinta(historial: Missatge[]): void {
    ta.value = historial.map(m => `${m.user}: ${m.text}`).join("\n");
    scrollToBottom(ta); // baixem fins l'ultim missatge, sempre despres de canviar el text
}

function envia(): void {
    const text = iMsg.value.trim();
    if (text === "") return;

    const m: Missatge = { id: Date.now(), user: meuId, text };

    // nomes deixem el missatge a la clau d'entrada, l'admin s'encarrega de la resta
    // l'id amb Date.now() es important: si guardessim dues vegades exactament
    // el mateix text, el valor no canvia i l'event storage no saltaria
    saveJSON(KEY_ENTRADA, m);
    iMsg.value = "";
}

// ! # EVENTS

bSend.addEventListener("click", envia);

// quan l'admin actualitza l'historial (nou missatge o esborrar) ens arriba l'avis
window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key !== KEY_HISTORIAL) return;
    pinta(loadJSON<Missatge[]>(KEY_HISTORIAL, []));
});

// en obrir la finestra pintem el que ja hi hagi guardat
// (l'event storage no salta pel que ja existia abans d'obrir-nos)
pinta(loadJSON<Missatge[]>(KEY_HISTORIAL, []));

import {
    createWindow, closeWindow, isWindowOpen,
    ScreenAvHeight, ScreenAvWidth,
    saveJSON, loadJSON, removeKey,
    KEY_ENTRADA, KEY_HISTORIAL,
    scrollToBottom
} from "./utilsFinestresMarcs.js";


const NOM_ADMIN = "Admin";

// ! # ELEMENTS DEL HTML

const bStart = document.getElementById("bStart") as HTMLButtonElement;
const ta = document.getElementById("ta") as HTMLTextAreaElement;
const iMsg = document.getElementById("iMsg") as HTMLInputElement;
const bSend = document.getElementById("bSend") as HTMLButtonElement;
const bClear = document.getElementById("bClear") as HTMLButtonElement;
const bClose1 = document.getElementById("closeW1") as HTMLButtonElement;
const bClose2 = document.getElementById("closeW2") as HTMLButtonElement;

// ! # FINESTRES

// guardem les dues finestres per poder-les tancar i saber si segueixen obertes
// la posicio 0 es X1 (dalt) i la 1 es X2 (baix)
const finestres: (Window | null)[] = [null, null];

/**
 * Obre (o torna a obrir) la finestra de l'usuari numero i (0 o 1).
 * Ocupa la meitat dreta de la pantalla: la 0 a dalt i la 1 a baix.
 */
function obreFinestra(i: number): void {
    const width = Math.floor(ScreenAvWidth() / 2);
    const height = Math.floor(ScreenAvHeight() / 2);
    const left = ScreenAvWidth() - width; // enganxada a la dreta
    const top = i * height;               // i=0 -> 0 (dalt), i=1 -> height (baix)

    finestres[i] = createWindow(`xat-ind.html?id=X${i + 1}`, width, height, left, top);
}

// ! # XAT

/**
 * Dibuixa l'historial a l'area de text.
 * L'historial ja esta ordenat amb el missatge mes nou el primer,
 * aixi que nomes cal unir-los amb salts de linia.
 */
function pinta(historial: Missatge[]): void {
    ta.value = historial.map(m => `${m.user}: ${m.text}`).join("\n");
    scrollToBottom(ta); // baixem fins l'ultim missatge, sempre despres de canviar el text
}

/**
 * Afegeix un missatge al principi de l'historial, el guarda
 * i el pinta a la pantalla de l'admin.
 * Aqui es el "centre" del xat: tots els missatges passen per aquesta funcio.
 */
function afegeixMissatge(m: Missatge): void {
    const historial = loadJSON<Missatge[]>(KEY_HISTORIAL, []);
    // historial.unshift(m); // unshift = afegir al principi de l'array
    historial.push(m)
    saveJSON(KEY_HISTORIAL, historial); // aixo avisa les finestres dels usuaris
    pinta(historial); // l'admin no rep l'avis (vegeu mes avall), l'hem de pintar nosaltres
}

// ! # ACCIONS DELS BOTONS

function start(): void {
    // comencem de zero: historial buit i cap missatge pendent
    // ho fem ABANS d'obrir les finestres perque en carregar ja el trobin buit
    saveJSON(KEY_HISTORIAL, []);
    removeKey(KEY_ENTRADA);
    pinta([]);

    obreFinestra(0);
    obreFinestra(1);
}

function enviaAdmin(): void {
    const text = iMsg.value.trim(); // trim treu els espais del principi i del final
    if (text === "") return;       // no enviem missatges buits

    afegeixMissatge({ id: Date.now(), user: NOM_ADMIN, text });
    iMsg.value = "";
}

function esborra(): void {
    saveJSON(KEY_HISTORIAL, []); // els usuaris reben l'avis i es buiden sols
    pinta([]);

    // si alguna finestra s'havia tancat, la tornem a obrir
    // (es fa despres de guardar l'historial buit perque en obrir-se el trobi buit)
    for (let i = 0; i < finestres.length; i++) {
        if (!isWindowOpen(finestres[i])) obreFinestra(i);
    }
}

// ! # EVENTS

bStart.addEventListener("click", start);
bSend.addEventListener("click", enviaAdmin);
bClear.addEventListener("click", esborra);
bClose1.addEventListener("click", () => closeWindow(finestres[0]));
bClose2.addEventListener("click", () => closeWindow(finestres[1]));

// l'event "storage" salta quan UNA ALTRA finestra (mateix origen) canvia el localStorage
// important: no salta a la finestra que ha fet el canvi
// aqui rebem els missatges que escriuen les finestres dels usuaris
window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key !== KEY_ENTRADA) return;   // ens passen tots els canvis, filtrem pel nostre
    if (e.newValue === null) return;     // null vol dir que s'ha esborrat la clau, no hi ha missatge

    const m = JSON.parse(e.newValue) as Missatge; // del text json tornem a tenir un objecte
    afegeixMissatge(m);
});

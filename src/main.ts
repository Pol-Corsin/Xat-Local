import { createWindow, ScreenAvHeight, ScreenAvWidth } from "./utilsFinestresMarcs.js"


/**
 * Obre 2 finestres a la dreta (adalt y abaix)
 */
function start(): { topWin: Window | null; botWin: Window | null} {

    const width = Math.floor(ScreenAvWidth() / 2);
    const height = Math.floor(ScreenAvHeight() / 2)
    const left = ScreenAvWidth() - width;

    const topWin = createWindow("xat-ind.html?id=X1", width, height, left, 0);
    const botWin = createWindow("xat-ind.html?id=X2", width, height, left, height);

    return { topWin, botWin }
}

// ? width = screenW / 2 y left = screenW - width colocan ambas ventanas en la mitad derecha.
// ? height = screenH / 2: la de arriba va en top = 0 y la de abajo en top = height, así se reparten la altura completa sin solaparse

// TODO enviar missatge, guardar a localstorage y mostrar en el text area

const ta = <HTMLTextAreaElement>document.getElementById("ta");
const iMsg = <HTMLInputElement>document.getElementById("iMsg");
const bSend = <HTMLButtonElement>document.getElementById("bSend");
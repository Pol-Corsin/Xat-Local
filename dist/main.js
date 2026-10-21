import { createWindow, ScreenAvHeight, ScreenAvWidth } from "./utilsFinestresMarcs";
start();
function start() {
    const width = Math.floor(ScreenAvWidth() / 2);
    const height = Math.floor(ScreenAvHeight() / 2);
    const left = ScreenAvWidth() - width;
    const topWin = createWindow("xat-ind.html?id=X1", width, height, left, 0);
    const botWin = createWindow("xat-ind.html?id=X2", width, height, left, height);
    return { topWin, botWin };
}
//# sourceMappingURL=main.js.map
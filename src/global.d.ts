type Missatge = {
    id: number;   // Date.now() la faig servir com a identificador
    user: string; // qui l'ha escrit ("Admin", "X1", "X2")
    text: string; // el contingut
}
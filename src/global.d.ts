type Missatge = {
    id: number;   // Date.now(): fa que cada missatge sigui diferent
    user: string; // qui l'ha escrit ("Admin", "X1", "X2")
    text: string; // el contingut
}
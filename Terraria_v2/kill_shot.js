// Skottets position om skottet överstiger eller hamnar på toppen av skärmen
function kamehamehaCheck(){
    if(kamehamehaShot.y <= 0){
        kamehameha = false;
        kamehamehaShot.speedY = 0; // Nollställer skottets hastighet
        kamehamehaShot.y = myGamePiece.y; // Placerar skottet i höjd med karaktären
        isFired = false;  // Skottet är falskt, tills den skjuts igen
    }
}

// Träffytor och villkor på när skottet träffar Alien.
function positionCollision(){
    // Ger en träffyta på Alien 1
    var alienRight = alien.width + alien.x;
    var alienLeft = alien.x;
    var alienBottom = alien.height + alien.y;
    var alienTop = alien.y;

    // Ger en träffyta på Alien 2
    var alienTwoRight = alienTwo.width + alienTwo.x;
    var alienTwoLeft = alienTwo.x;
    var alienTwoBottom = alienTwo.height + alienTwo.y;
    var alienTwoTop = alienTwo.y;

    // Skott - Alien kolliderar
    if((alienBottom > kamehamehaShot.y) && (alienLeft < kamehamehaShot.x) && (alienTop < kamehamehaShot.y) && (alienBottom < myGameArea.canvas.height - 175) && (alienRight > kamehamehaShot.x)){
        alien.y = 0; // Nollställer höjden på Alien
        alien.x = Math.random() * (800 - 50) - 50; // Randomizer X position på Alien
        // alienHitSound.play(); // Spelar upp dödsljudet
        kills++; // Ökar killscore
        isFired = false; // Ger ett falskt värde på skjutning, så att den inte ritas ut, och återställer position
        kamehamehaShot.speedY = 0;  // Återställer hastighet på skott
        kamehamehaShot.y = myGamePiece.y; // Återställer höjd till samma som karaktären
        money += 100;
    }

    // Skott - Alien 2 kolliderar --> Samma kodsnutt som ovan
    if((alienTwoBottom > kamehamehaShot.y) && (alienTwoLeft < kamehamehaShot.x) && (alienTwoTop < kamehamehaShot.y) && (alienTwoBottom < myGameArea.canvas.height - 175) && (alienTwoRight > kamehamehaShot.x)){
        // alienHitSound.play();
        alienTwo.y = 0;
        alienTwo.x = Math.random() * (800 - 50) - 50;
        kills++
        money += 100;
        isFired = false;
        kamehamehaShot.speedY = 0;
        kamehamehaShot.y = myGamePiece.y;
    }

}
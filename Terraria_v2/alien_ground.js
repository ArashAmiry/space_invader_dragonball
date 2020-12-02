function alienVelocity(){

    // Alien 1 träffar marken
    if(alien.y > (myGameArea.canvas.height - 176)){
        alien.y = 0; // Återställer höjd
        alien.x = Math.random() * (800 - 50) - 50; // Randomizerar position i x-led
        hurtSound.play(); // Spelar upp skadeljud

        // Om den träffar marken och antal liv är över 1 så minskas det
        if(lifeStatus > 1){
            lifeStatus--;
        }
        // Annars skall spelet stoppas och ett meddelande skall skrivas
        else{
            myGameArea.stop();
            lifeStatus = 0; // Minskar life counter med 1
            myBackground.update();
            killCounter.x = 150;
            killCounter.y = 250;
            killCounter.width = "100px";
            levels.x = 290;
            levels.y = 300;
            levels.width = "50px";
            alien.y = 900;
            alien.x = 300;
            myGamePiece.y = 900;
            myGamePiece.x = 370;
            alienTwo.y = 900;
            alienTwo.x = 430;
        }
    }

    // Alien 2 träffar marken --> Samma kodsnutt som ovan
    if(alienTwo.y > (myGameArea.canvas.height - 176)){
        alienTwo.y = 0;
        alienTwo.x = Math.random() * (800 - 50) - 50;
        hurtSound.play();

        if(lifeStatus > 1){
            lifeStatus--;
        }
        else{
            myGameArea.stop();
            lifeStatus = 0; // Minskar life counter med 1
            myBackground.update();
            killCounter.x = 150;
            killCounter.y = 250;
            killCounter.width = "100px";
            levels.x = 290;
            levels.y = 300;
            levels.width = "50px";
            alien.y = 900;
            alien.x = 300;
            myGamePiece.y = 900;
            myGamePiece.x = 370;
            alienTwo.y = 900;
            alienTwo.x = 430;
        }
    }
}
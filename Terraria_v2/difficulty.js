function difficultyLevel(){
    // Level 10
    if (kills >= 45) {
        
        alienTwo.speedY = 0.8;
        alien.speedY = 0.8;

        spawnInAlien();
        
        levelNumber = 10;
        levels.text = "LEVEL : " + levelNumber +" ⚔";
    }
    // Level 9
    else if (kills >= 40) {
        
        alienTwo.speedY = 0.7;
        alien.speedY = 0.7;

        spawnInAlien();
         
        levelNumber = 9;
        levels.text = "LEVEL : " + levelNumber +" ⚔";
    }

    // Level 8
    else if (kills >= 35) {
        
        alienTwo.speedY = 0.6;
        alien.speedY = 0.6;

        spawnInAlien();
         
        levelNumber = 8;
        levels.text = "LEVEL : " + levelNumber +" ⚔";
    }

    // Level 7
    else if (kills >= 30) {
        
        alienTwo.speedY = 0.5;
        alien.speedY = 0.5;

        spawnInAlien();   
        
        levelNumber = 7;
        levels.text = "LEVEL : " + levelNumber +" ⚔";
    }

    // Level 6
    else if (kills >= 25) {
        
        alienTwo.speedY = 0.4;
        alien.speedY = 0.4;

        spawnInAlien();
          
        levelNumber = 6;
        levels.text = "LEVEL : " + levelNumber +" ⚔";
    }
    // Level 5
    else if (kills >= 20) {
        
        alienTwo.speedY = 0.3;
        alien.speedY = 0.3;

        spawnInAlien();
              
        levelNumber = 5;
        levels.text = "LEVEL : " + levelNumber +" ⚔";
    }
    
    // Level 4
     else if (kills >= 15) {
        
        alienTwo.speedY = 0.2;
        alien.speedY = 0.2;

        spawnInAlien();
        
        levelNumber = 4;
        levels.text = "LEVEL : " + levelNumber +" ⚔";
    }
    
    // Level 3
    else if (kills >= 10){
        alien.speedY = 0;
        alienTwo.speedY = 0;
        
        // För att ändra positionen på andra Alien, så att den inte spawnar längst åt vänster, när den ritas ut.
        if(isSpawnedAlien2){
            alienTwo.x = Math.random() * (800 - 50) - 50;
            isSpawnedAlien2 = false;
        }

        spawnInAlien();
        
        levelNumber = 3;
        levels.text = "LEVEL : " + 3 +" ⚔";
    }
    
    // Level 2
    else if (kills >= 5){
        alien.speedY = 0.2; 
        
        levelNumber = 2;
        levels.text = "LEVEL : " + 2 +" ⚔";
    }
    
    // Level 1
    else if (kills < 5){
        levelNumber = 1;
        levels.text = "LEVEL : "+ levelNumber + "  ⚔";
    }
}

function spawnInAlien(){
    // Gör så att de inte spawnar i varandra
    if (alien.x < alienTwo.x + alienTwo.width &&
    alien.x + alien.width > alienTwo.x &&
    alien.y < alienTwo.y + alienTwo.height &&
    alien.y + alien.height > alienTwo.y){

        alien.x = Math.random() * (800 - 50) - 50;
        console.log("krock");
    }

    alienTwo.newPos();
    alienTwo.update();

}
// Tangenttryck för rörelse och skott
var leftPressed = Boolean;
var rightPressed = Boolean;
var upPressed = Boolean;
var downPressed = Boolean;
var spacebarPressed = Boolean;
var kPressed = Boolean;
var lPressed = Boolean;
var pPressed = Boolean;
var pPressedDisable = true;
var isFired = false;

// Ljud till olika situationer
var backgroundMusic;
var alienHitSound;
var hurtSound;

// Kamehameha - skott
var kamehameha = false;
var kamehamehaSpeed = 0;

// Antal livräknare
var startLife;
var lifeStatus = 5;

// Game Score variabler
var killCounter;
var kills = 0;

// Level
var levels;
var levelNumber;

// Restart
var restart;

var i = 0; //Ändrar längd på karaktär varje sekund

// Alien egenskaper
var alienSpeedX = 0;
var alienSpeedY = 1;
var xVelocityMax = 2;
var xVelocityMin = -2;
// $isSpawned är till för att byta x-position vid när den ritas ut för första gången, så att den inte hamnar åt vänster.
// Resten av koden finns i difficulty.js
var isSpawnedAlien2 = true;
var isSpawnedAlien3 = true;

// Bank/superkrafter
var bank;
var money = 0;

// var run;
var runSpeed = 8;
var runCountImage = 0;
var shotCountImage = 1;
// var runCost;
// var runBuyLetter;




var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 15);
        window.addEventListener('keydown', function (e) {
                    if(e.keyCode == 68){
                         rightPressed = true;
                    }
                    else if (e.keyCode == 65){
                        leftPressed = true;
                    }
                    else if(e.keyCode == 87){
                        upPressed = true;
                    }
                    else if(e.keyCode == 32){
                        spacebarPressed = true;
                        isFired = true;
                    }
                    else if(e.keyCode == 83){
                        downPressed = true;
                    }
                    else if (e.keyCode == 75){
                        kPressed = true;
                    }
                    else if (e.keyCode == 76){
                        lPressed = true;
                    }
                    else if (e.keyCode == 80){
                        pPressed = true;
                    }
                    else if(e.keyCode == 82){
                        location.reload();
                    }

                    });
                
                    window.addEventListener('keyup', function (e) {
                        if(e.keyCode == 68){
                            rightPressed = false;
                        }
                        else if (e.keyCode == 65){
                            leftPressed = false;
                        }
                        else if(e.keyCode == 87){
                            upPressed = false; 
                        }
                        else if(e.keyCode == 32){
                            spacebarPressed = false;
                        }
                        else if(e.keyCode == 83){
                            downPressed = false;
                        }
                        else if(e.keyCode == 75){
                            kPressed = false;
                        }
                        else if (e.keyCode == 76){
                            lPressed = false;
                        }
                        else if (e.keyCode == 80){
                            pPressed = false;
                        }
                        console.log(e.keyCode);
                    });    
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, source, x, y, type){
    this.type = type;

    if(type == "image" || type == "background"){
        this.image = new Image();
        this.image.src = source;
    }

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 1.5;
    this.update = function() {
        ctx = myGameArea.context;

    if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
     } 
     else if(this.type == "text"){
         ctx.font = this.width + " " + this.height;
         ctx.fillStyle = source;
         ctx.fillText(this.text, this.x, this.y);
     }
    else{
            ctx.fillStyle = kamehamehaShot.source;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            // console.log(source);
        }
    }    

    this.newPos = function() {
        //Gravitationen för karaktären/Aliens ner.
        this.x += this.speedX;
        this.y += this.speedY + this.gravity; 
        this.hitBottom();
        this.sideBorder();
    };

    // hitBottom tillför att inte gå under marken.
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - 175;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }

    // sideBorder tillför att inte gå utanför sidorna och himlen
    this.sideBorder = function() {	
        var sideBorder = myGameArea.canvas.width - this.width;
        var sideTopBorder = myGameArea.canvas.height - this.height;
        if(this.x > sideBorder){
            this.x = sideBorder;
        }
        if (this.x < 0){
            this.x = 0;
        }
        if(this.y > sideTopBorder){
            this.y = sideTopBorder;
        }
        if (this.y < 0){
            this.y = 0;
        }
    };

    // Kollidering mellan alien och karaktär 
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

// Ljud vid skott
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        // this.sound.play();
    }
    this.stop = function(){
        // this.sound.pause();
    }    
}

// Ändrar på längden så det ser ut som den andas
function change() {
  var lengthOfPlayer = [67, 70]; //   Längden som den varierar (pixel)
  myGamePiece.height = lengthOfPlayer[i];
  i = (i + 1) % lengthOfPlayer.length;
}

setInterval(change, 400); // Funktionen change utförs varje 400ms

function updateGameArea() {
    myGameArea.clear();
    myBackground.update();    
    myGamePiece.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    kamehameha.speedX = 0;
    kamehameha.speedY = kamehamehaSpeed;
    
    
     // Krocka med Alien 1 för att återföda honom på toppen.
    if(myGamePiece.crashWith(alien)){
        alien.y = 0;
        alien.x = Math.random() * (800 - 50) - 50;
        hurtSound.play();

        if(lifeStatus > 1){
            lifeStatus--; // Minskar life counter med 1
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

    // Krocka med Alien 2 för att återföda honom på toppen.
    if(myGamePiece.crashWith(alienTwo)){
        alienTwo.y = 0;
        alienTwo.x = Math.random() * (800 - 50) - 50;
        hurtSound.play();

        if(lifeStatus > 1){
            lifeStatus--; // Minskar life counter med 1
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

    kamehamehaCheck();
    positionCollision();
    alienVelocity();
    difficultyLevel();

    // Skottet följer med karaktär, såvida inte skottet avfyras
    if(isFired == false){
        kamehamehaShot.x = myGamePiece.x + 19.65;
        kamehamehaShot.y = myGamePiece.y;
    }

    if (leftPressed == true) {
          myGamePiece.speedX = -runSpeed;
          myGamePiece.image.src = "playersprite_left.png"; // Ändrar en bild så att karaktären kollar vänster, när den springer vänster
        }

    
    if (rightPressed == true) {
              myGamePiece.speedX = runSpeed;
                  myGamePiece.image.src = "playersprite.png"; // Ändrar en bild så att karaktären kollar höger, när den springer höger
        }
    
    if (upPressed == true){
        myGamePiece.speedY = -6.5; // Så att karaktären motverkar gravitation och kan flyga
    }

    if (downPressed == true){
        myGamePiece.speedY = 2; // Landa på marken snabbare, gravitation och fart.
    }

    // spacebarPressed -- skottet avfyras och isFired true gör att värdet inte behåller samma koordinat som karaktär
    if(spacebarPressed == true || isFired == true){
        if(shotCountImage == 3){
            kamehamehaShot.speedY = -26;
        } else if(shotCountImage == 2){
            kamehamehaShot.speedY = -23;
        }
        else{
            kamehamehaShot.speedY = -20;
        }
        
        isFired = true;
        kamehamehaShot.newPos();
        kamehamehaShot.update();
    }

    if(kPressed == true && money >= 500){
        if(runSpeed < 8.9){
            money -= 500;
            bank.update();
            runSpeed += 0.3;
            runCountImage++;
            kPressed = false;
        }
    }

    
    if(lPressed == true && money >= 1000){
        if(shotCountImage == 1){
            money -= 1000;
            bank.update();
            shot.image.src = "shotUpgrade_3.png";
            shot.update();
            kamehamehaShot.width = 5;
            kamehamehaShot.height = 15;
            kamehamehaShot.source = "#b950d9";  
            shotCountImage++; 
        }
        else if(shotCountImage == 2){
            money -= 1000;
            bank.update();
            shot.image.src = "shotUpgrade_disable.png";
            shot.update();
            kamehamehaShot.width = 10;
            kamehamehaShot.height = 20;
            kamehamehaShot.source = "#e8423c";
            shotCountImage++; 
        }
        lPressed = false;
    }

    if(pPressed == true && lifeStatus >= 1 && pPressedDisable == true && money >= 2000){
        money -= 2000;
        bank.update();
        lifeStatus += 3;
        pPressedDisable = false;
        lifeBuy.image.src = "heart_disabled.png";
    }
    
    if(runSpeed >= 8.9){
        run.image.src = "run_disable.png";
    }
    else if(runCountImage == 1){
        run.image.src = "runOneThird.png";
    }
    else if(runCountImage == 2){
        run.image.src = "runTwoThird.png";
    }
        myGamePiece.newPos();
        myGamePiece.update();
        alien.newPos();
        alien.update();
        startLife.text = "LIFE: " + lifeStatus;
        startLife.update();
        killCounter.text = "KILLS : " + kills + " ☠";
        killCounter.update();
        levels.update();
        restart.text = "RESTART [R]";
        restart.update();
        bank.text = "MONEY: " + money + " $";
        bank.update();
        run.update();
        runBuyLetter.text = "[K]";
        runBuyLetter.update();
        runCost.text = "500$";
        runCost.update();
        shot.update();
        shotBuyLetter.text = "[L]";
        shotBuyLetter.update();
        shotCost.text = "1000$";
        shotCost.update();
        lifeBuy.update();
        lifeBuyLetter.text = "[P]";
        lifeBuyLetter.update();
        lifeCost.text = "2000$";
        lifeCost.update();
        backgroundMusic.play();
}

function startGame() {
    myGamePiece = new component(45, 70, "playersprite.png", 380, 325, "image");
    kamehamehaShot = new component(2, 10, "aqua", 399.65, 325);
    myBackground = new component(800, 500, "background.png", 0, 0, "background");
    alien = new component(50, 75, "alien.png", 380 , 0, "image");
    alienTwo = new component(50, 75, "alien.png", -200 , 0, "image");
    alienHitSound = new sound("kamehameha1.mp3");
    hurtSound = new sound("hurtsound.mp3");
    startLife = new component("28px", "Arcade", "aqua", 690, 30, "text");
    killCounter = new component("28px", "Arcade", "aqua", 40, 30, "text");
    levels = new component("28px", "Arcade", "aqua", 40, 55, "text");
    restart = new component("28px", "Arcade", "aqua", 40, 475, "text");
    backgroundMusic = new sound("background_music.mp3");
    bank = new component("24px", "Arcade", "aqua", 360, 475, "text");
    run = new component(35, 35, "run.png", 557, 450, "image");
    runBuyLetter = new component("15px", "Arcade", "aqua", 563, 449, "text");
    runCost = new component("15px", "Arcade", "aqua", 560, 493, "text");
    shot = new component(28, 28, "shotUpgrade_2.png", 637, 453, "image");
    shotBuyLetter = new component("15px", "Arcade", "aqua", 642, 449, "text");
    shotCost = new component("15px", "Arcade", "aqua", 633, 493, "text");
    lifeBuy = new component(40, 40, "heart.png", 712, 447, "image");
    lifeBuyLetter = new component("15px", "Arcade", "aqua", 723, 449, "text");
    lifeCost = new component("15px", "Arcade", "aqua", 715, 493, "text");
    myGameArea.start();
}
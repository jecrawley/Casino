(function () {

    var money = parseInt(sessionStorage.getItem("money"));
    var moneyLabel = document.getElementById("money");
    var bet = 0;
    var reelCount;
    var isRunning = false;
    var stoppedReels = 0;

    this.getMoney = function () { return money; }
    this.setMoney = function (amount) { money = amount; }
    this.getMoneyLabel = function () {return moneyLabel; }
    this.getStoppedReels = function () { return stoppedReels; }
    this.setStoppedReels = function (reels) { stoppedReels = reels; }
    this.getIsRunning = function () {return isRunning;}
    this.setIsRunning = function (running) { isRunning = running; }
    this.getReelCount = function () { return reelCount; }
    this.setReelCount = function (reels) { reelCount = reels; }
    this.getBet = function () { return bet; }
    this.setBet = function (amount) {
        if (!isRunning) {
            bet = amount;

            var betLabel = document.getElementById("bet");

            betLabel.innerHTML = "Bet: $" + bet;
        }
    }

    sessionStorage.setItem("money", money);
    moneyLabel.innerHTML = "Money: $" + money;

}());

function run (reels) {

    if (!(getIsRunning()) && getBet() > 0 && getMoney() >= getBet()) {

        var reel;

        setIsRunning(true);
        setReelCount(reels);
        setStoppedReels(0);

        for (let i = 0; i < reels; i++) {

            reel = "reel" + i;
            run[reel] =  new activeReel(reel);

        }
    }
}

function activeReel (reel) {

    var face = Math.floor(Math.random() * 8);
    var spin = setInterval(changeFace, 250);

    this.getFace = function () { return face; }
    this.setFace = function (val) { face = val;}
    this.getSpin = function () { return spin; }

    function changeFace () {
        var index = eval("run." + reel).getFace();
        var image = document.getElementById(reel);
        var colors = ["#A22", "#2A2", "#22A", "#AA2", "#2AA", "#A2A", "#222", "#AAA"];

        image.style.borderColor = colors[index];
        //Idea to use eval from Stack Overflow
        //http://stackoverflow.com/questions/10953303/javascript-interpret-string-as-object-reference
        eval("run." + reel).setFace(++index % colors.length);
    }

}

function stopChangeFace (reel) {

    stoppedReels = getStoppedReels();
    setStoppedReels(stoppedReels + 1);

    clearInterval(eval("run." + reel).getSpin());
    if (getStoppedReels() === getReelCount()) {
        checkVictory();
    }
}

function checkVictory () {

    var didWin = true;
    var reelCount = getReelCount();
    var thisReel;
    var nextReel;

    for (var i = 0; i < reelCount - 1; i++) {
        thisReel = eval("run.reel" + i).getFace();
        nextReel = eval("run.reel" + (i + 1)).getFace();
        if (thisReel !== nextReel) {
            didWin = false;
            break;
        }
    }

    setIsRunning(false);
    payout(didWin);
}

function payout (didWin) {

    var money = getMoney();
    var moneyLabel = getMoneyLabel();
    var bet = getBet();

    money += (didWin) ? bet : -bet;
    setMoney(money);
    sessionStorage.setItem("money", money);
    moneyLabel.innerHTML = "Money: $" + money;

}

function backHome () {

    if (!(getIsRunning())) {

        return window.location = "index.html";

    }
}

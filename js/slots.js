var stopped;
var reelCount;
var isRunning = false;
var money = 1000;
var bet;

function run (reels) {

    if (!isRunning && bet > 0) {
        isRunning = true;
        reelCount = reels;
        stopped = 0;
        var reel;

        for (let i = 0; i < reels; i++) {
            reel = "reel" + i;
            run[reel] =  new activeReel(reel);
        }
    }
}

function setBet (amount) {
    bet = amount;
    var betLabel = document.getElementById("bet");

    if (!isRunning) {
        betLabel.innerHTML = "Bet: $" + bet;
    }
}

function activeReel (reel) {

    var face = Math.floor(Math.random() * 8);

    this.getFace = function () { return face; }
    this.setFace = function (val) { face = val;}
    this.spin = setInterval(changeFace, 250);

    function changeFace () {
        var index = eval("run." + reel).getFace();
        var image = document.getElementById(reel);
        var colors = ["#A22", "#2A2", "#22A", "#AA2", "#2AA", "#A2A", "#222", "#AAA"];

        image.style.borderColor = colors[index];
        eval("run." + reel).setFace(++index % colors.length);
    }

}

function stopChangeFace (reel) {

    stopped++;

    clearInterval(eval("run." + reel).spin);
    if (stopped === reelCount) {
        checkVictory();
    }
}

function checkVictory () {

    moneyCount = document.getElementById("money");
    isRunning = false;
    var didWin = true;
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
    payout(didWin);
}

function payout (didWin) {

    money += (didWin) ? bet : -bet;
    moneyCount.innerHTML = "Money: $" + money;

}

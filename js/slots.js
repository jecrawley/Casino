var stopped;
var reelCount;
var money = 1000;

function run (reels) {
    reelCount = reels;
    stopped = 0;
    var reel;

    for (var i = 0; i < reels; i++) {
        reel = "reel" + i
        run[reel] = new activeReel(reel);
    }
}

function activeReel (reel) {
    var face = 0;
    this.getFace = function () { return face; }
    this.setFace = function (val) { face = val;}
    this.spin = setInterval(changeFace, 1000);

    function changeFace () {
        var index = eval("run." + reel).getFace();
        var image = document.getElementById(reel);
        var colors = ["#A22", "#2A2", "#22A"];
        image.style.borderColor = colors[index];
        eval("run." + reel).setFace(++index % 3);
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
    money += (didWin) ? 500 : -500;

    moneyCount.innerHTML = "Money: $" + money;

}

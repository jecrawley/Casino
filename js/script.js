(function () {

    var money = parseInt(sessionStorage.getItem("money"));
    var moneyLabel = document.getElementById("money");

    this.getMoney = function () { return money; }
    this.setMoney = function (amount) { money = amount; }
    this.getMoneyLabel = function () { return moneyLabel; }

    money = (isNaN(money)) ? 0 : money;
    sessionStorage.setItem("money", money);
    moneyLabel.innerHTML = "Money: $" + money;

}());

function addMoney () {

    var moneyLabel = getMoneyLabel();
    var money = getMoney();
    var moneyForm = document.getElementById("money-form");
    //this.wasUsed = false;

    if (!(isNaN(parseInt(moneyForm.value)))) {
        money += parseInt(moneyForm.value);
        setMoney(money);
        sessionStorage.setItem("money", money);
        moneyLabel.innerHTML = "Money: $" + money;
        moneyForm.value = "";
    }
}

function toSlots() {

    return window.location = "slots.html";

}

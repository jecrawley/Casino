QUnit.test( "Correct current value", function( assert ) {
    
    var money = sessionStorage.getItem("money");
    var moneyLabel = document.getElementById("money");
    var moneyForm = document.getElementById("money-form");

    assert.equal("Money: $" + money, moneyLabel.innerHTML, "The label is correct.");
});

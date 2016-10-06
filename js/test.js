QUnit.test( "Correct current value", function( assert ) {
    var money = sessionStorage.getItem("money");
    money = "Money: $" + money;
    var moneyLabel = document.getElementById("money");
    assert.equal( money, moneyLabel.innerHTML, "The label is correct." );
});

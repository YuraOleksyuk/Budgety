
// BUDGET CONTROLLER
var budgetController = (function() {

})();


var UIController = (function() {

    return {
        getinput: function() {
            return {
                type: document.querySelector('.add__type').value, // item inc or exp
                value: document.querySelector('.add__value').value,
                description: document.querySelector('.add__description').value
            }
        }
    }
})();


var controller = (function() {

    var controlAddItem = function() {

        var input = UIController.getinput();
        console.log(input);
    }

    document.querySelector('.add__btn').addEventListener('click', function(e) {
        controlAddItem();
    });

    document.addEventListener('keypress', function(event) {
        console.log(event);
        if( event.keyCode === 13 ) {
            controlAddItem();
       }
    });



})(budgetController, UIController);
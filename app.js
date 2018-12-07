
// BUDGET CONTROLLER
var budgetController = (function() {

    var Expence = function(id, desription, value) {
        this.id = id;
        this.description = desription;
        this.value = value;
    };

    var Income = function(id, desription, value) {
      this.id = id;
      this.description = desription;
      this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            // new id create
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length.id - 1] + 1;
            } else {
                ID = 0;
            }

            // create new item on 'inc' or 'exp'
            if (type === 'exp') {
                newItem = new Expence(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // push data to array
            data.allItems[type].push(newItem);
            console.log(data);
            // return the new item
            return newItem;
        }
    }
})();


var UIController = (function() {

    var DomStrings = {
        inputType: '.add__type',
        inputValue: '.add__value',
        inputDescription: '.add__description',
        inputBtn: '.add__btn'
    };

    return {
        getinput: function() {
            return {
                type: document.querySelector(DomStrings.inputType).value, // item inc or exp
                value: document.querySelector(DomStrings.inputValue).value,
                description: document.querySelector(DomStrings.inputDescription).value
            };
        },

        getDomStrings: function() {
            return DomStrings;
        }
    }
})();


var controller = (function() {
    var DOM = UIController.getDomStrings();

    var controlAddItem = function() {
        var input, newItem;
        input = UIController.getinput();

        newItem = budgetController.addItem(input.type, input.description, input.value);
    };

    document.querySelector(DOM.inputBtn).addEventListener('click', function(e) {
        controlAddItem();
    });

    document.addEventListener('keypress', function(event) {
        // console.log(event);
        if( event.keyCode === 13 ) {
            controlAddItem();
       }

    });



})(budgetController, UIController);
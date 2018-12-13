
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

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum = sum + Number(cur.value);
        });



        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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
            // console.log(data);
            // return the new item
            return newItem;
        },
        calculateBudget: function () {
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;
            console.log(Math.round((data.totals.exp / data.totals.inc) * 100));
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.totals.percentage
            }
        }
    }
})();


var UIController = (function() {

    var DomStrings = {
        inputType: '.add__type',
        inputValue: '.add__value',
        inputDescription: '.add__description',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expContainer: '.expenses__list'
    };

    return {
        getinput: function() {
            return {
                type: document.querySelector(DomStrings.inputType).value, // item inc or exp
                value: document.querySelector(DomStrings.inputValue).value,
                description: document.querySelector(DomStrings.inputDescription).value
            };
        },

        addListItem: function(object, type) {
            // create html
            var html, newHtml, element;
            if (type === 'inc') {
                element = DomStrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                element = DomStrings.expContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace the placeholder tet to actual data
            newHtml = html.replace('%id%', object.id);
            newHtml = newHtml.replace('%description%', object.description);
            newHtml = newHtml.replace('%value%', object.value);

            // insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
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

        UIController.addListItem(newItem, input.type);

        updateBudget();
    };

    var updateBudget = function() {
        budgetController.calculateBudget();

        var budget = budgetController.getBudget();
        console.log(budget);
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
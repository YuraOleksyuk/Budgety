
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
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
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

            // return the new item
            return newItem;
        },

        deleteItem: function(id, type) {
            var ids, index;

            ids = data.allItems[type].map(function(cur) {
                return cur.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

            console.log(data.allItems[type]);

        },

        calculateBudget: function () {
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;

            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
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
        expContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        budgetPercantageLabel: '.budget__expenses--percentage',
        container: '.container'
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

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                element = DomStrings.expContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">%percentage%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace the placeholder tet to actual data
            newHtml = html.replace('%id%', object.id);
            newHtml = newHtml.replace('%description%', object.description);
            newHtml = newHtml.replace('%value%', object.value);
            newHtml = newHtml.replace('%percentage%', 21);

            // insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(ID) {
            document.getElementById(ID).remove();
        },

        displayBudget: function(obj) {
            document.querySelector(DomStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DomStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DomStrings.expensesLabel).textContent = obj.totalExp;

            if( obj.percentage > 0 ) {
                document.querySelector(DomStrings.budgetPercantageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DomStrings.budgetPercantageLabel).textContent = '---';
            }
        },

        getDomStrings: function() {
            return DomStrings;
        }
    }
})();


var controller = (function() {

    var setupEventListeners = function() {
        var DOM = UIController.getDomStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', function(e) {
            controlAddItem();
        });

        document.addEventListener('keypress', function(event) {
            // console.log(event);
            if( event.keyCode === 13 ) {
                controlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    };


    var controlAddItem = function() {
        var input, newItem;
        input = UIController.getinput();

        newItem = budgetController.addItem(input.type, input.description, input.value);

        UIController.addListItem(newItem, input.type);

        updateBudget();
    };

    var ctrlDeleteItem = function(event) {
        var itemId, splitId, type, ID;

        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemId) {

            if(confirm('Delete this item ?')) {

                splitId = itemId.split('-');
                type = splitId[0];
                ID = parseInt(splitId[1]);

                budgetController.deleteItem(ID, type);

                UIController.deleteListItem(itemId);
            }
        }
    };

    var updateBudget = function() {
        budgetController.calculateBudget();

        var budget = budgetController.getBudget();

        UIController.displayBudget(budget);
    };


    return {
        init: function() {
            console.log("App init");
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();
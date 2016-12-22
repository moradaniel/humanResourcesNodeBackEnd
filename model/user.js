//Private
var privateVariable = true;

//Public
module.exports = User;

function User(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.enabled = data.enabled;
    this.password = data.password;
    this.roles=data.roles;
}

User.prototype.addRole = function (role) {
    this.roles.push(role);
};

User.prototype.removeRoleById = function (id) {
    for (var i = 0; i < this.roles.length; i++) {
        if (this.roles[i].id === id) {
            this.roles.splice(i, 1);
            break;
        }
    }
};

/*
function User() {
    //shopping cart model
    function shoppingCart() {
        this.itemsToPurchase = [];
    };
    shoppingCart.prototype.addItem = function (data) {
        this.itemsToPurchase.push(new shoppingCartItem(data));
    };
    shoppingCart.prototype.calculateTotalPrice = function () {
        this.totalPrice = 0;
        for (var i = 0; i < this.itemsToPurchase.length; i++) {
            this.totalPrice += this.itemsToPurchase[i].calculatePrice();
        }
    };
    shoppingCart.prototype.removeItemById = function (id) {
        for (var i = 0; i < this.itemsToPurchase.length; i++) {
            if (this.itemsToPurchase[i].id === id) {
                this.itemsToPurchase.splice(i, 1);
                break;
            }
        }
    };

    //shopping cart item model
    function shoppingCartItem(data) {
        this.id = data.id;
        this.price = data.price;
        this.productName = data.name;
        this.discount = data.discount;
    }

    shoppingCartItem.prototype.calculatePrice = function () {
        return this.price - this.discount;
    };
    function createShoppingCart() {
        return new shoppingCart();
    }


    return {createShoppingCart: createShoppingCart};
}*/
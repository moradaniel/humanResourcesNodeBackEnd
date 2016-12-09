//Private
var privateVariable = true;

//Public
module.exports = User;

function User(id,name) {
    this.id = id,
    this.name = name;
}

User.prototype.foobar = function (){

}
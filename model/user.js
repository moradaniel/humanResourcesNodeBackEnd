//Private
var privateVariable = true;

//Public
module.exports = User;

function User(id,name,password) {
    this.id = id,
    this.name = name;
    this.password = password;

}

User.prototype.foobar = function (){

}
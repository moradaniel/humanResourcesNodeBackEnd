//Private
var privateVariable = true;

//Public
module.exports = Response;

function Response(results) {
    this.results = results;
}

Response.prototype.foobar = function (){

}
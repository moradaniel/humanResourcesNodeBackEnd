
var express = require('express'),
    router = express.Router();

var _ = require('lodash');

var Response = require('../../response/response');

var diContainer = require('../../config').diContainer;

var userService = diContainer.get('userService');

/* GET users listing. */
router.get('/', function(req, res, next) {
   // res.send('show api options');

    var userFilter =    {
        //id:381,
        enabled:true
    };


    userService.findUsers(userFilter)
        .then(function(results) {

            //var response = new Response(_.values(results));
            var response = new Response(results);
            res.json(response);
        })
        .catch(function(err) {
            res.json(err);
            next(err);
        });

});


router.route('/:id')
    .get(function(req, res) {

        var userFilter =    {
            id:req.params.id,
            enabled:true
        };

        userService.findUsers(userFilter)
            .then(function(results) {

                //var response = new Response(_.values(results));
                var response = new Response(results);
                res.json(response);
            })
            .catch(function(err) {
                res.json(err);
                next(err);
            });

        //res.json({ message: 'hooray! welcome to our api!' });
        //res.json(users[req.params.id]);

        /*mongoose.model('Blob').findById(req.id, function (err, blob) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + blob._id);
                var blobdob = blob.dob.toISOString();
                blobdob = blobdob.substring(0, blobdob.indexOf('T'))
                res.format({
                    html: function(){
                        res.render('blobs/show', {
                            "blobdob" : blobdob,
                            "blob" : blob
                        });
                    },
                    json: function(){
                        res.json(blob);
                    }
                });
            }
        });*/
    });



router.post("/", function(req, res) {

    var username = req.body.name;
    //var password = req.body.password;
    console.log(username);

    //res.json(req.body);

    var response = new Response(_.values(req.body));
    res.json(response);

});


router.put("/", function(req, res) {

    var username = req.body.name;
    //var password = req.body.password;
    console.log(username);

    var response = new Response(_.values(req.body));
    res.json(response);

});


module.exports = router;

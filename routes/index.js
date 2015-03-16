var express = require('express');
var Firebase = require("firebase");
var router = express.Router();
var myFirebaseRef = new Firebase("https://mbdrop.firebaseio.com");

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};


// GET index page list of messages.
router.get('/', function(req, res, next) {
  var full_db = "https://mbdrop.firebaseio.com/.json"
  var ref = new Firebase("https://mbdrop.firebaseio.com/");

  res.render('index', { title: 'Express', ref: ref });
});


//POST specify to change by firebase ID
router.post('/message/:fbid', function(req, res, next) {
  var fbid = req.params.fbid;
  var r = JSON.stringify(req.body);
  r = r.replaceAll("{","");
  r = r.replaceAll("}","");
  r = r.replaceAll('"','');
  r = r.split("^");
  
  var fbById = new Firebase("https://mbdrop.firebaseio.com/" + fbid);
  var p = fbById.set({
    request_name: r[0],
    msg_body: r[1],
    state: r[2],
    date: r[3],
    err: r[4]
  });
  console.log(p.key());
  res.send(p.key());
});

//POST to push in new message, will return firebase ID
router.post('/message', function(req, res, next) {
  var r = JSON.stringify(req.body);
  r = r.replaceAll("{","");
  r = r.replaceAll("}","");
  r = r.replaceAll('"','');
  r = r.split("^");
  
  var p = myFirebaseRef.push({
    request_name: r[0],
    msg_body: r[1],
    state: r[2],
    date: r[3],
    err: r[4]
  });
  
  console.log(p.key());
  res.send(p.key());
});



//GET Message (for testing)
// router.get('/message', function(req, res, next) {
//   myFirebaseRef.push({
//   request_type: "Vendor Import",
//   msg_guid: "1234",
//   success: true, 
//   });
//   res.render('submitted', { title: req.body}); 
// });

//GET testing set by ID
// router.get('/message/:fbid', function(req, res, next) {
//   var fbid = req.params.fbid;
//   var fbById = new Firebase("https://mbdrop.firebaseio.com/" + fbid);
//   var p = fbById.set({
//     request_name: "Test",
//     msg_body: "r[1]",
//     state: "Pending",
//     date: "01/1/2323",
//     err: "r[4]"
//   }); 
// });



module.exports = router;

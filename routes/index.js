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

router.get('/messagetest', function(req, res, next){
  ranguid = (Math.random() * 1500+10).toString();
  ranfail = Math.floor(Math.random()+0.5);
  console.log(ranfail);
  if ( ranfail == 1 ){
    end_state = "success";
    end_err = "";
  }else {
    end_state = "failed";
    end_err = "Purpose failed from test."
  }
  
  ll = myFirebaseRef.push({
    date: "3/20/2015 4:59:43 PM",
    request_name: "Test Message",
    msg_guid: Math.floor(ranguid),
    msg_body: "ProjectNumber : 161616\\r\\nCISNumber : \\r\\nCISVerificationDate : \\r\\nCISExpiryDate : \\r\\nCISRate : \\r\\nAddressNumber : 123454\\r\\nAlphaName : Aa Test Vendor 4\\r\\nTaxID : 462382666\\r\\nTaxExempt : 6693056708\\r\\nVerificationNumber : V1001782304\\r\\nSocialSecurity : \\r\\nWithholdingPercent : 20\\r\\nSelfCertificationAllowed : Y\\r\\nRegistration Number : 0234324\\r\\nAddressLine1 : 222 Highland Dr\\r\\nAddressLine2 : Hendglade House\\r\\nAddressLine3 : 46 New Road\\r\\nAddressLine4 : \\r\\nCity : Sourdough\\r\\nState : CA\\r\\nCounty : West Midlands\\r\\nCountry : \\r\\nZipCode : DY8 1PA\\r\\n",
    state: "pending", 
    err: ""
  });
  
  setTimeout(function(){
    ll.set({
      date: "3/20/2015 4:59:43 PM",
      request_name: "Test Message",
      msg_guid: Math.floor(ranguid),
      msg_body: "ProjectNumber : 161616\\r\\nCISNumber : \\r\\nCISVerificationDate : \\r\\nCISExpiryDate : \\r\\nCISRate : \\r\\nAddressNumber : 123454\\r\\nAlphaName : Aa Test Vendor 4\\r\\nTaxID : 462382666\\r\\nTaxExempt : 6693056708\\r\\nVerificationNumber : V1001782304\\r\\nSocialSecurity : \\r\\nWithholdingPercent : 20\\r\\nSelfCertificationAllowed : Y\\r\\nRegistration Number : 0234324\\r\\nAddressLine1 : 222 Highland Dr\\r\\nAddressLine2 : Hendglade House\\r\\nAddressLine3 : 46 New Road\\r\\nAddressLine4 : \\r\\nCity : Sourdough\\r\\nState : CA\\r\\nCounty : West Midlands\\r\\nCountry : \\r\\nZipCode : DY8 1PA\\r\\n",
      state: end_state, 
      err: end_err
    });
}, 6000);
  
  
  //res.render('index'); 
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

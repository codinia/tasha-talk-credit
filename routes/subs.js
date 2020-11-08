var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/add', function(req, res) {
  
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phone = req.body.phone;

  let query = "INSERT INTO `subscriber` (FirstName, LastName, PhoneNumber,Email) VALUES('"+firstName+"','"+lastName+"','"+email+"','"+phone+"')";
  db.query(query, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    }
    res.sendStatus(200);
});

});

router.get('/get-all', function(req, res) {
  
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phone = req.body.phone;
  
    let query = "SELECT * FROM `subscriber` ";
    db.query(query, (err, result) => {
      if (err) {
          return res.status(500).send(err);
          
        }
        res.send(result);

  });
  
});

module.exports = router
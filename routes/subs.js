var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/add', function(req, res) {
  
    console.log(req.body)
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phone = req.body.phone;
  let personalCreditReport = req.body.personalCreditReport;
  let goalWithCredit = req.body.goalWithCredit;
  let doItYourself = req.body.doItYourself;
  let businessCard = req.body.businessCard;
  let businessCreditCheck = req.body.businessCreditCheck

  let checkQuery = "SELECT COUNT(Id) as count FROM subscriber WHERE Email = '"+email+"' or PhoneNumber = '"+phone+"'"

  db.query(checkQuery, (err,result)=>{
      console.log(result);
    if(err)
        return res.status(500).send(err);
    if(result && result[0].count > 0)
        return res.status(400).send('User Already Exist')
    else
    {
        let insertSubQuery = "INSERT INTO `subscriber` (FirstName, LastName, PhoneNumber,Email) VALUES('"+firstName+"','"+lastName+"','"+phone+"','"+email+"')";
        db.query(insertSubQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else
            {
                let insertAQuery = "INSERT INTO `subscriber_answer`(`SubId`, `PersonalCreditReport`, `GoalWithCredit`, `DoItYourself`, `BusinessCard`, `BusinessCreditCheck`) \
                                    SELECT subscriber.Id , '"+personalCreditReport+"', '"+goalWithCredit+"','"+doItYourself+"','"+businessCard+"','"+businessCreditCheck+"' \
                                    FROM subscriber WHERE subscriber.Email = '"+email+"' AND subscriber.PhoneNumber = '"+phone+"'";
                db.query(insertAQuery,(err,result)=>
                {
                    if(err){
                        return res.status(500).send(err);
                        
                    }
                    res.sendStatus(200);
                });
            }
            
        });
    }
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
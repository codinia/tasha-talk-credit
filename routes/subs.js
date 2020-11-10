var express = require('express');
var router = express.Router();

var isLoggedIn = require('../middle-wares/auth')

/* GET users listing. */
router.post('/add', function(req, res) {
  
    console.log(req.body)
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phone = req.body.phone;
  let personalCreditReport = req.body.pcrList;
  let goalWithCredit = req.body.ggcList;
  let doItYourself = req.body.doItYourSelf;
  let businessCard = req.body.businessCard;
  let businessCreditCheck = req.body.ccList
  let message = req.body.message;

  let checkQuery = "SELECT COUNT(Id) as count FROM subscriber WHERE Email = '"+email+"' or PhoneNumber = '"+phone+"'"

  db.query(checkQuery, (err,result)=>{
      console.log(result);
    if(err)
        return res.status(500).json(err);
    if(result && result[0].count > 0)
        return res.status(500).json('Already Subscribed')
    else
    {
        let insertSubQuery = "INSERT INTO `subscriber` (FirstName, LastName, PhoneNumber,Email, Message) VALUES('"+firstName+"','"+lastName+"','"+phone+"','"+email+"', '"+message+"')";
        db.query(insertSubQuery, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            else
            {
                let insertAQuery = "INSERT INTO `subscriber_answer`(`SubId`, `PersonalCreditReport`, `GoalWithCredit`, `DoItYourself`, `BusinessCard`, `BusinessCreditCheck`) \
                                    SELECT subscriber.Id , '"+personalCreditReport+"', '"+goalWithCredit+"','"+doItYourself+"','"+businessCard+"','"+businessCreditCheck+"' \
                                    FROM subscriber WHERE subscriber.Email = '"+email+"' AND subscriber.PhoneNumber = '"+phone+"'";
                db.query(insertAQuery,(err,result)=>
                {
                    if(err){
                        return res.status(500).json(err);
                        
                    }
                  return  res.status(200).json('Successfully Subscribed');
                });
            }
            
        });
    }
  });


});

router.get('/get-all' , isLoggedIn, function(req, res) {
  
    let query = "SELECT * FROM subscriber JOIN subscriber_answer ON subscriber.Id = subscriber_answer.SubId ";
    db.query(query, (err, result) => {
      if (err) {
          return res.status(500).json(err);
          
        }
     return  res.status(200).json(result);

  });
  
});

module.exports = router
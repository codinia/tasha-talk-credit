var express = require('express');

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/create-admin-user', function (req, res, next) {

  console.log(req.body)
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      db.query(
        `INSERT INTO user ( Email,Username, Password) VALUES ( ${db.escape(req.body.email)} ,${db.escape(req.body.username)}, ${db.escape(hash)})`,
        (err, result) => {
          if (err) {
;
            return res.status(400).json(err);
          }
          return res.status(201).send({
            msg: 'Registered!'
          });
        }
      );
    }
  });
});


router.post('/login', (req, res, next) => {
  console.log(req.body)
  db.query(
    `SELECT * FROM user WHERE Username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.status(400).json(err);
      }
      if (!result.length) {
        console.log("user not found in db")
        return res.status(401).json('Username or password is incorrect!');
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['Password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(401).json('Username or password is incorrect!');
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
            db.query(
              `UPDATE user SET Lastlogin = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).json({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).json(
            'Username or password is incorrect!'
          );
        }
      );
    }
  );
});
module.exports = router;

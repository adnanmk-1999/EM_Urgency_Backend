const config = require('../config/auth.config');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var tokenList = {}                //Object to store refreshToken

const userDao = require("../dao/user.dao");
const roleDao = require("../dao/role.dao");
const responseDao = require('../dao/response.dao');

//For Gmail Login
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');

const users = [];


dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


function signUp(req, res) {
  let newUser = {
    Username: req.body.username,
    Email: req.body.email,
    Password: bcrypt.hashSync(req.body.password, 8),
    Contact: req.body.contact,
    Gender: req.body.gender,
    Name: req.body.name,
    department_id: req.body.departmentId,
    location_id: req.body.locationId,
    grade_id: req.body.gradeId,
    job_title_id: req.body.jobtitleId,
    Image: req.body.image,
  }
  userDao.userCreate(newUser)

    .then(user => {
      if (req.body.roles) {
        roleDao.findRoles(req.body.roles)

          .then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User registered successfully!" });
            });
          });
      }
      else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

function signIn(req, res) {

  userDao.userfind(req.body.username)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.Password);

      if (!passwordIsValid) {
        return res.status(401).send({
          // accessToken: null,
          message: "Invalid Password!"
        });
      }

      var accessToken = jwt.sign({ id: user.Id }, config.secret, {
        expiresIn: config.accessExpire       //1 Hour
      });

      var refreshToken = jwt.sign({ id: user.Id }, config.secret, {
        expiresIn: config.refreshExpire      //1 day
      });

      //To store the generated token in the tokenList as new object(value of object refresh token)
      const response = {
        "accessToken": accessToken,
        "refreshToken": refreshToken
      }
      tokenList[refreshToken] = response;

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("Role:" + roles[i].Type.toUpperCase());
        }
        res.status(200).send({
          id: user.Id,
          username: user.Username,
          email: user.Email,
          roles: authorities,
          accessToken: accessToken,
          refreshToken: refreshToken
        });
        console.log(`Login success ${authorities}`)
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });


}

//relogin in with refreshToken
function reSignIn(req, res) {
  const refreshToken = req.body.refreshToken;

  if ((refreshToken) && (refreshToken in tokenList)) {

    //decode refreshToken to get user id
    jwt.verify(refreshToken, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      var userId = decoded.id;
      var accessToken = jwt.sign({ id: userId }, config.secret, {

        expiresIn: config.accessExpire
      });
      const response = {
        "accessToken": accessToken,
      }
      // update the token in the list
      tokenList[refreshToken].accessToken = accessToken;
      res.status(200).json(response);
    });
  } else {
    res.status(404).send('Invalid request!')
  }
}

function getUsers(req, res) {

  userDao.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(401).send({ message: "users not found." })

    });
}


function getAlerts(req, res) {

  var accessToken = req.header('x-access-token');

  //Decode accessToken to get User Id
  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    else {
      var userId = decoded.id;
      console.log(userId)
      responseDao.findAllAlerts(userId)
        .then((data) => {
          res.status(200).send({
            message: "Alerts",
            data: data
          });
        })
        .catch((error) => {
          res.status(500).send({ message: "Error", error });
        });
    }
  })

}

async function GsignIn(req, res) {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email } = ticket.getPayload();
  upsert(users, { name, email });

  userDao.findByEmail({ name, email })
    .then((data) => {
      const UserId = data[0].Id;
      const Username = data[0].Username
      var accessToken = jwt.sign({ id: UserId }, config.secret, {
        expiresIn: config.accessExpire       //1 Hour
      });
      console.log(accessToken)

      var refreshToken = jwt.sign({ id: UserId }, config.secret, {
        expiresIn: config.refreshExpire      //1 day
      });
      var role = ['Role:USER'];
      res.status(200).send({ name, email, accessToken, refreshToken, role, Username });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error", error });
    });
}

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}


var userController = {
  signUp: signUp,
  signIn: signIn,
  GsignIn: GsignIn,
  reSignIn: reSignIn,
  getUsers: getUsers,
  getAlerts: getAlerts
}

module.exports = userController;















// function getAlerts(req, res) {

//   var accessToken = req.body.accessToken;

//   //Decode accessToken to get User Id
//   jwt.verify(accessToken, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!"
//       });
//     }
//     else {
//       var userId = decoded.id;
//       userDao.finduser(userId)
//         .then(user => {
//           var userAlerts = []
//           user.getAlerts()
//             .then(alerts => {
//               for (let i = alerts.length-1 ; i >= 0; i--) {
//                 userAlerts.push({
//                   id : alerts[i].Id,
//                   date : alerts[i].Date,
//                   subject : alerts[i].Subject,
//                   message : alerts[i].Message,
//                   categoryId : alerts[i].category_id
//                 });
//               }
//               res.status(200).send(userAlerts);
//             });
//         })
//         .catch(() => {
//           res.status(500).send({ message: "Error" });
//         });
//     }
//   })

// }
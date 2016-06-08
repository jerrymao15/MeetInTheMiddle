'use strict';
const pg = require('pg').native;
const Sequelize = require('sequelize');
const request = require('request');
const bcrypt = require('bcryptjs');
const SALT_VALUE = 10;
const privateKeys = require('./../privateKeys.js');

//instantiates and logs in to the postgreSQL database on heroku
const sequelize = new Sequelize(privateKeys.postgresURI, {
  native: true,
  ssl: true,
  dialect: 'postgres',
});

var User = sequelize.define('users', {
    _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: Sequelize.STRING, allowNull: false},
    lastname: {type: Sequelize.STRING, allowNull: false},
    username: {type: Sequelize.STRING, allowNull: false, unique: true, validate: {notEmpty: true}},
    password: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
  },
  //set up the hook (like when we authenticated in mongo using pre 'save') to bcrypt the password before every user is made;
  { hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, SALT_VALUE);
      }
    }
  }
);

var Address = sequelize.define('addresses', {
  _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING, allowNull: false},
  street: {type: Sequelize.STRING, allowNull: false},
  city: {type: Sequelize.STRING, allowNull: false},
  state: {type: Sequelize.STRING, allowNull: false},
  username: {type: Sequelize.STRING, allowNull: false},
});

// User.belongsTo(Address);


const databaseOps = {
  // reference to user model
  usersModel: User,

  // reference to address model
  addressesModel: Address,

  // creates a user in the database
  createUser: (req, res, next) => {
    let Users = databaseOps.usersModel;
    //establish connection with database and prepare to add new user
    let usersTablePromise = Users.sync({ logging: console.log });
    usersTablePromise.then(() => {
    	// userData is being passed via the request body
      Users.create(req.body.userData)
      .then((databaseResponse) => {
        //when we get a response from the database we will pass that back to the front end to prove a successful database save
        //TODO: add error handling
        req.body.databaseResponse = JSON.stringify(databaseResponse);
        next();
      }).catch(function(err) {
        req.body.databaseResponse = err;
        next();
      });
    });
  },
  //TODO: write the function to receive the user input from the login screen and compare against the password and username stored in the database
  verifyUser: (req, res, next) => {
    // user login verification details will come in on the req body
    // think about bcrypt.compareSync(myPlaintextPassword, hash); // true
    let Users = databaseOps.usersModel;
    Users.findOne({ where: {username: req.body.userData.username} }).then(function(user) {
      if (!user) {
        res.status(404).send({message: 'Incorrect username.'});
      } else if (!bcrypt.compareSync(req.body.userData.password, user.password)) {
        res.status(404).send({message: 'Incorrect password.'});
      } else {
        res.cookie('username', req.body.userData.username);
        next();
      }
    });
  },

  // addressData is passed via the request body
  createAddress: (req, res, next) => {
    let Addresses = databaseOps.addressesModel;

    //set up that one user can have multiple addresses
    // TODO: Need to add an element to the client that identified the user
    //Addresses.belongsTo(databaseOps.usersModel);

    //establishes connection with database and prepare to add new addresses
    let addressesTablePromise = Addresses.sync({ logging: console.log });

    addressesTablePromise.then(() => {
      req.body.username = req.cookies.username;
      Addresses.create(req.body)
      .then((databaseResponse) => {
        //when we get a response from the database we will pass that back to the front end to prove a successful database save
        req.body.databaseResponse = JSON.stringify(databaseResponse);
        next();
      }).catch(function(err) {
        req.body.databaseResponse = err;
        next();
      });;
    });
  },

  getUserAddressBook: (req, res, next) => {
    let Address = databaseOps.addressesModel;
    Address.findAll( {
      where: {
        username: req.cookies.username,
      }
    } ).then(databaseResponse => {
      var addressObj = databaseResponse.map(instance => {
        return instance.dataValues;
      });
      req.body.databaseResponse = addressObj;
      next();
    });
  }
};

module.exports = databaseOps;

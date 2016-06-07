var request = require('supertest')(server);
// import request from 'supertest'(server);
import { expect } from 'chai';
import server from './../server/server';
import bcrypt from 'bcryptjs';
import databaseOps from './../db/database';



describe('description here', function() {
  before(function() {
    const Users = databaseOps.usersModel;
  })

  // afterEach(function(done) {
  //   Users.findOne({where: {username: 'i'}})
  //   .then(function(user) {
  //     return user.destroy();
  //   })
  // })

  it('should sign u up fam', function(done) {
    request
      .post('/createuser')
      .send({userData: {
          firstname: 'i',
          lastname: 'hate',
          username: 'testing!!!!',
          password: 'password'
        }
      })
      .type('form')
      .expect(200, function(err, res) {
        console.log(err);
        if (err) return done(err)
        console.log(res);
        done();
      })
      // .type('form')
      // .end(function(err,res) {
      //   console.log('in end');
      //   databaseOps.usersModel.find({where: {username: 'i'}})
      //   .then(function(user) {
      //     console.log(user);
      //     expect(user).to.exist
      //     done();
      //   })
      // })
  })

  // it('should do stuff', function() {
  //   request
  //     .post('/login')
  //     .
  // })








})

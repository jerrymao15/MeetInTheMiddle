var request = require('supertest')(server);
// import request from 'supertest'(server);
import { expect } from 'chai';
import server from './../server/server';
import bcrypt from 'bcryptjs';
import databaseOps from './../db/database';



describe('Server Test', function() {
  before(function() {
    const Users = databaseOps.usersModel;
  })

  xit('should sign u up fam', function(done) {
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


  it ('should return a list of results ', function(done) {
    request
    .post('/meet')
    .send({
      inputArray: [
        {
          name: 'Jerry',
          street:'5300 Beethoven St',
          city:'Los Angeles',
          state: 'CA'
        },
        {
          name: 'Jerry',
          street:'5300 Beethoven St',
          city:'Los Angeles',
          state: 'CA'
        }
      ]
    })
    .type('form')
    .expect(function(req, res) {
      console.log(res.body);
      done()
    }, done)
  })

  // it('should do stuff', function() {
  //   request
  //     .post('/login')
  //     .
  // })








})

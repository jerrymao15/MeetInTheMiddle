'use strict';
const React = require('react');
const ReactDom = require('react-dom');
const ActivityChoice = require('./activityChoices.jsx');
const AddressForm = require('./addressForm.jsx');
const MapResults = require('./map.jsx');
const ResultList = require('./resultListItem.jsx');
const SignUp = require('./SignUp.jsx');
const UserLogin = require('./userLogin.jsx');
const $ = require('jquery');
const AddAddress = require('./AddAddress.jsx');

var App = React.createClass({

  getInitialState: function () {
    return ({
      numberOfPeople: 2,
      currentPage: 'signUpPage',
      resultsData: '',
      username: '',
      password: '',
      addAddress: {
        name: '',
        street: '',
        city: '',
        state: '',
      },
    });
  },

  addForms: function () {
    let formArray = [];
    for (let i = 0; i < this.state.numberOfPeople; i++) {
      formArray.push(<AddressForm id={i} />);
    }
    return formArray;
  },

  addSingleForm: function (e) {
    e.preventDefault();
    const people = this.state.numberOfPeople + 1;
    this.setState({ numberOfPeople: people });
  },

  addActivities: function () {
    const activityTypes = ['Restaurant', 'Park', 'Movie Theater', 'Mall'];
    let activitiesArray = [];
    for (let i = 0, len = activityTypes.length; i < len; i++) {
      activitiesArray.push(<ActivityChoice activity={activityTypes[i]} />);
    }
    return activitiesArray;
  },

  formData: function() {
    // submiting ALL form data not just first one
    let formDataArray = [];
    for (let i = 0; i < this.state.numberOfPeople; i++) {
      var friendId = 'form #friend' + i;
      var streetId = 'form #street' + i;
      var cityId = 'form #city' + i;
      var stateId = 'form #state' + i;
      let personData = {};
      personData.name = $(friendId).val();
      personData.street = $(streetId).val();
      personData.city = $(cityId).val();
      personData.state = $(stateId).val();
      formDataArray.push(personData);
    }
    return formDataArray;
  },

  activityData: function () {
    let checkedBoxes = $('input[name="activityBox"]:checked');
    var checkedBoxesValues = [];
    for (var i = 0; i < checkedBoxes.length; i++) {
      checkedBoxesValues.push(checkedBoxes[i].value);
    }
    return checkedBoxesValues;
  },

  submitInputData: function () {
    let addressFormData = { inputArray: this.formData() };
    let checkedActivities = this.activityData();
    const friends = [];
    for (let i = 0; i < addressFormData.inputArray.length; i++) {
      friends.push(addressFormData.inputArray[i].name)
    }
    // Only posting addressFormData for now
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/meet',
      data: addressFormData,
      success: function (response) {
        let result = response;
        this.setState({
          friends: friends,
          resultsData: result,
          currentPage: 'resultsPage',
        });
      }.bind(this),
    });
  },
  //userlogin for all these handlers below (3)
  handleSubmit: function(e) {
    e.preventDefault();
    //need to send username and password
    //and check database to see if it is in there
    var userDataObj = { userData: {
      username:this.state.username,
      password:this.state.password,
      }
    }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/login',
      data: userDataObj,
      success: function (response) {
        this.setState({
          currentPage: 'addressesPage',
        });
      }.bind(this),
      error: function(err) {
        return alert('Wrong Info');
      }
    });
  },

  handleUserChange: function(e) {
    this.setState({username:e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password:e.target.value});
  },

  userData: function() {
    var firstNameId = 'form #firstName';
    var lastNameId = 'form #lastName';
    var usernameId = 'form #username';
    var passwordId = 'form #password';
    let userData = {};
    userData.firstname = $(firstNameId).val();
    userData.lastname = $(lastNameId).val();
    userData.username = $(usernameId).val();
    userData.password = $(passwordId).val();
    return userData;
  },

  signUpUser: function () {
    var userDataObj = { userData: this.userData() };

    if (userDataObj.userData.firstname === '' ||
    userDataObj.userData.lastname === '' ||
    userDataObj.userData.password === '' ||
    userDataObj.userData.username === '') {
      return alert('Please fill out all fields ;)');
    }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/createuser',
      data: userDataObj,
      success: function (response) {
        this.setState({
          currentPage: 'addressesPage',
        });
      }.bind(this),
      error: function(err) {
        return alert('Username already exists, please choose another one');
      }
    });
  },
  handleChangeAddName: function(e) {
    this.setState({
      addAddress: {
        name: e.target.value,
        street: this.state.addAddress.street,
        city: this.state.addAddress.city,
        state: this.state.addAddress.state,
      },
    });
  },
  handleChangeAddStreet: function(e) {
    this.setState({
      addAddress: {
        name: this.state.addAddress.name,
        street: e.target.value,
        city: this.state.addAddress.city,
        state: this.state.addAddress.state,
      },
    });
  },
  handleChangeAddCity: function(e) {
    this.setState({
      addAddress: {
        name: this.state.addAddress.name,
        street: this.state.addAddress.street,
        city: e.target.value,
        state: this.state.addAddress.state,
      },
    });
  },
  handleChangeAddState: function(e) {
    this.setState({
      addAddress: {
        name: this.state.addAddress.name,
        street: this.state.addAddress.street,
        city: this.state.addAddress.city,
        state: e.target.value,
      },
    });
  },
  handleAddAddress: function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/addAddress',
      data: this.state.addAddress,
      success: function (response) {
        console.log('add address successfully')
        this.state.addAddress = {};
      }.bind(this),
      error: function(err) {
        console.log('error adding address to the database');
      },
    });
  },
  render: function () {
    if (this.state.currentPage === 'addressesPage') {
      var formFields = this.addForms();
      var activityCheckboxes = this.addActivities();
      return (
        <div>
          <AddAddress
            handleAddAddress={this.handleAddAddress}
            handleChangeAddName={this.handleChangeAddName}
            handleChangeAddStreet={this.handleChangeAddStreet}
            handleChangeAddCity={this.handleChangeAddCity}
            handleChangeAddState={this.handleChangeAddState} />
          {formFields}
          <button className="button-primary" onClick={this.addSingleForm}>Add Address</button>
          <h4>Where do you want to meet?</h4>
          <div className="row">
            {activityCheckboxes}
          </div>
          <button className="button-primary" onClick={this.submitInputData}>Meet in the middle!</button>
        </div>
      );
    }

    if (this.state.currentPage === 'resultsPage') {
      return (
        <div>
          <MapResults data={this.state.resultsData} />
          <ResultList data={this.state.resultsData} />
        </div>
      );
    }

    if (this.state.currentPage === 'signUpPage') {
      return (
        <div>
          <UserLogin
            userValue={this.state.username}
            passwordValue ={this.state.password}
            handleSubmit={this.handleSubmit}
            handleUserChange={this.handleUserChange}
            handlePasswordChange={this.handlePasswordChange}
            />
          <SignUp />
          <button className="button-primary" >Sign Up</button>
        </div>
      );
    }
  },

});

module.exports = App;

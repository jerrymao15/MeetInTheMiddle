'use strict';

const React = require('react');

const AddressBook = React.createClass ({
 render: function () {
   //for loop making p tags to put inside of div
   var contactList = [];
   for (let i = 0; i < this.props.contactNames.length; i++) {
     if(i === 0) {
       contactList.push(<p onClick={this.props.handleContactNameClick}>{this.props.contactNames[i]}</p>);
     } else {
       contactList.push(<p onClick={this.props.handleContactNameClick}>{this.props.contactNames[i].name}</p>);
    }
   }
   return (
     <div>
       {contactList}
     </div>
   );
 },
});


module.exports = AddressBook;

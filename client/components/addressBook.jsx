'use strict';

const React = require('react');
import { Dropdown, DropdownMenu, Button, Arrow, NavItem } from 'rebass'
const AddressBook = React.createClass ({
  getInitialState: function () {
    return ({
      isOpen: false
    });
  },

  handleDropdownClick: function(e) {
    if (this.state.isOpen === true) {
      this.setState({isOpen:false});
    } else {
      this.setState({isOpen:true});
    }
  },

 render: function () {
   //for loop making p tags to put inside of div
   var contactList = [];
   for (let i = 0; i < this.props.contactNames.length; i++) {
     if(i === 0) {
       contactList.push(<p onClick={this.props.handleContactNameClick}><NavItem children={this.props.contactNames[i]} /></p>);
     } else {
       contactList.push(<p onClick={this.props.handleContactNameClick}><NavItem children={this.props.contactNames[i].name} /></p>);
    }
   }
   return (
     <div  onClick={this.handleDropdownClick}>
       <Dropdown>
         <Button>
           Contacts <Arrow />
         </Button>
         <DropdownMenu open={this.state.isOpen} >
          <div className='contact-list-dropdown'>
           {contactList}
          </div>
         </DropdownMenu>
       </Dropdown>
     </div>
   );
 },
});


module.exports = AddressBook;

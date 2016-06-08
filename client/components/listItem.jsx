'use strict'
const React = require('react');
import {ModalContainer, ModalDialog} from 'react-modal-dialog';



var ListItem = React.createClass({
  getInitialState: function() {
    return {
      isShowingModal: false
    }
  },

  handleClick: function() {
    this.props.findDistance
    this.setState({
      isShowingModal: true
    });
  },

  handleClose: function(){
    this.setState({isShowingModal: false})
  },

  render: function() {
    return (
      <div className="four columns singleItem" onClick={this.handleClick}>
        <h5>{this.props.name}</h5>
        <p>Phone: {this.props.phone}</p>
        <img role="presentation" src={this.props.ratingImgURL} />
        <p>{this.props.text}</p>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <h1>Dialog Content</h1>
            <p>More Content. Anything goes here</p>
          </ModalDialog>
        </ModalContainer>
        }
      </div>
    );
  }

});


module.exports = ListItem;

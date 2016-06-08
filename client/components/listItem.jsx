'use strict'
const React = require('react');
import {ModalContainer, ModalDialog} from 'react-modal-dialog';



var ListItem = React.createClass({
  getInitialState: function() {
    return {
      isShowingModal: false,
      modalInfo: []
    }
  },

  handleClick: function() {
    const renderArr = [];
    this.props.findDistance();
    if (this.props.friends) {
      for(let i = 0; i < this.props.friends.length; i++) {
        renderArr.push(<p>
          Hey {this.props.friends[i]}! You are currently <span font-weight="bolder">{this.props.travelData[i].distance}</span> away.
        It will take you <span font-weight="bolder">{this.props.travelData[i].travelTime}</span> to reach your destination bruh.
        </p>
      )
    }
  }
    this.setState({
      isShowingModal: true,
      renderArr:renderArr
    });
  },

  handleClose: function(){
    this.setState({isShowingModal: false})
  },

  render: function() {
    return (
      <div className="four columns singleItem yelp" onClick={this.handleClick}>
        <h5>{this.props.name}</h5>
        <p>Phone: {this.props.phone}</p>
        <img role="presentation" src={this.props.ratingImgURL} />
        <p>{this.props.text}</p>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h1>{this.props.name}</h1>
              <a href={this.props.yelpURL}>Read more reviews</a>
              { this.state.renderArr }
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    );
  }

});


module.exports = ListItem;

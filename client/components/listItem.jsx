'use strict'
const React = require('react');
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { Block, Heading, Stat, Text, Space, Panel, PanelHeader} from 'rebass';



var ListItem = React.createClass({
  getInitialState: function() {
    return {
      isShowingModal: false,
      modalInfo: []
    }
  },

  blockMaker: function(friend, distance, time) {
    return (
      <div>
      <Space x={2} />
      <Block
        borderLeft
        borderColor="grey"
        mx={3}
        color="black"
        px={3}
      >
        <Text
          level={1}
          size={0}
          >
            {friend.toUpperCase()}
        </Text>
        <Stat
          value={distance.replace(/[A-Za-z]/g,'')}
          unit="mi"
          label="how far you are"
          />
        <Space x={3} />
        <Stat
          value={time.replace(/[A-Za-z]/g,'')}
          unit="min"
          label="you better get going"
          />
      </Block>
      </div>
    )
  },

  handleClick: function() {
    const renderArr = [];
    this.props.findDistance();
    if (this.props.friends) {
      for(let i = 0; i < this.props.friends.length; i++) {
        renderArr.push(this.blockMaker(this.props.friends[i], this.props.travelData[i].distance, this.props.travelData[i].travelTime))
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
        <Panel theme="secondary">
          <PanelHeader
            inverted
            theme="secondary"
            >
            {this.props.name}
          </PanelHeader>
          <img role="presentation" src={this.props.ratingImgURL} />
          <Text>
            Phone: {this.props.phone} <br />
            {this.props.text}
          </Text>
        </Panel>
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

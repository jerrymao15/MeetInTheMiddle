const React = require('react');



var ListItem = React.createClass({

  render: function() {
    return (
      <div className="four columns singleItem" onClick={this.props.findDistance}>
        <h5>{this.props.name}</h5>
        <p>Phone: {this.props.phone}</p>
        <img role="presentation" src={this.props.ratingImgURL} />
        <p>{this.props.text}</p>
      </div>
    );
  }

});


module.exports = ListItem;

const React = require('react');
const ListItem = require('./listItem.jsx');
import {Divider} from 'rebass'

var ResultListItem = React.createClass({

  displayListItems: function () {
    var suggestionArray = [];
    var meetSuggestions = this.props.data.meetSuggestions;
    meetSuggestions.forEach((suggestion,i) => {
      suggestionArray.push(<ListItem
        key={i}
        name={suggestion.name}
        phone={suggestion.display_phone}
        ratingImgURL={suggestion.rating_img_url_large}
        text={suggestion.snippet_text}
        yelpURL={suggestion.url}
        findDistance={this.props.findDistance.bind(this,i)}
        travelData={this.props.travelData}
        friends={this.props.friends}
        />);
    });
    return suggestionArray;
  },

  render: function () {
    var suggestionList = this.displayListItems();
    return (
      <div className="listItems">
        <Divider />
        <Divider
          width={500}

           />
        {suggestionList}
      </div>
    );
  },

});

module.exports = ResultListItem;

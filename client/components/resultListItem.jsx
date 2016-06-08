const React = require('react');
const ListItem = require('./listItem.jsx');

var ResultListItem = React.createClass({

  displayListItems: function () {
    var suggestionArray = [];
    var meetSuggestions = this.props.data.meetSuggestions;
    meetSuggestions.forEach(function (suggestion,i) {
      suggestionArray.push(<ListItem
        id={i}
        name={suggestion.name}
        phone={suggestion.display_phone}
        ratingImgURL={suggestion.rating_img_url_large}
        text={suggestion.snippet_text}
        />);
    });
    return suggestionArray;
  },

  render: function () {
    var suggestionList = this.displayListItems();
    return (
      <div className="listItems">
        {suggestionList}
      </div>
    );
  },

});

module.exports = ResultListItem;

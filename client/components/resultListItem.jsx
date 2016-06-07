const React = require('react');
const ListItem = require('./listItem.jsx');

var ResultListItem = React.createClass({

  displayListItems: function () {
    var suggestionArray = [];
    var meetSuggestions = this.props.data.meetSuggestions;
    meetSuggestions.forEach(function (suggestion,i) {
      suggestionArray.push(<ListItem id={i}/>);
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

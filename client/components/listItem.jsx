const React = require('react');



var ListItem = React.createClass({

  render: function() {
    return (
      <div className="four columns singleItem">
        <h5>{suggestion.name}</h5>
        <p>Phone: {suggestion.display_phone}</p>
        <img role="presentation" src={suggestion.rating_img_url_large} />
        <p>{suggestion.snippet_text}</p>
      </div>
    );
  }

});


module.exports = ListItem;

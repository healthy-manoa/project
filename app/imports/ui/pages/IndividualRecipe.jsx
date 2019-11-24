import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipes';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class IndividualRecipe extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">{this.props.recipe.name}</Header>
        <p>{this.props.recipe.description}</p>
        <p>{this.props.recipe.ingredients}</p>
        <p>{this.props.recipe.steps}</p>
        <p>{this.props.recipe.tags}</p>
        <p>{this.props.recipe.owner}</p>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
IndividualRecipe.propTypes = {
  recipe: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Recipe');
  return {
    recipe: Recipes.find({}).fetch(),
    ready: subscription.ready(),
  };
})(IndividualRecipe);

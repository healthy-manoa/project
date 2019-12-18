import React from 'react';
import { Container, Header, Loader, Image } from 'semantic-ui-react';
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
        <div className='content-wrap'>
        <div className={'vendor-background'} >
          <Container>
            <Header as="h2" textAlign="center" inverted>{this.props.recipe.name}</Header>
            <Image src={this.props.recipe.image} size={'large'}/>
            <Header as="h3" textAlign="left" inverted>Description</Header>
            <p className={'white-text'}>{this.props.recipe.description}</p>
            <Header as="h3" textAlign="left" inverted>Ingredients</Header>
            <p className={'white-text'}>{this.props.recipe.ingredients.join(', ')}</p>
            <Header as="h3" textAlign="left" inverted>Steps</Header>
            <p className={'white-text'}>{this.props.recipe.steps}</p>
            <Header as="h3" textAlign="left" inverted>Tags</Header>
            <p className={'white-text'}>{this.props.recipe.tags.join(' || ')}</p>
            <Header as="h4" textAlign="left" inverted>Publisher: {this.props.recipe.owner}</Header>
          </Container>
        </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
IndividualRecipe.propTypes = {
  recipe: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('PublicRecipes');
  return {
    recipe: Recipes.findOne(documentId),
    ready: subscription.ready(),
  };
})(IndividualRecipe);

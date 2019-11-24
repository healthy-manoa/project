import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipes';
import PublicRecipe from '../components/PublicRecipe';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRecipes extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Recipes</Header>
          <Grid>
            <Card.Group>
              {this.props.recipes.map((recipes) => <PublicRecipe key={recipes} recipe={recipes} />)}
            </Card.Group>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListRecipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('PublicRecipes');
  return {
    recipes: Recipes.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListRecipes);

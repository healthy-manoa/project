import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

class UserRecipe extends React.Component {
  render() {
    return (
        <Card as={ Link } to={`/recipes/${this.props.recipe._id}`}>
          <Card.Content>
            <Card.Header>{this.props.recipe.name}</Card.Header>
            <Card.Description>Description: {this.props.recipe.description}</Card.Description>
            <Card.Description>
              Ingredients:
              <li>{this.props.recipe.ingredients}</li>
            </Card.Description>
            <Card.Description>Steps: {this.props.recipe.steps}</Card.Description>
            <Card.Description>Tags: {this.props.recipe.tags}</Card.Description>
            <Card.Meta>{this.props.recipe.owner}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.recipe._id}`}>Edit</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
UserRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserRecipe);

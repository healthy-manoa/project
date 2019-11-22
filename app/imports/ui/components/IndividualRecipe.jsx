import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

class IndividualRecipe extends React.Component {
  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Card.Header>{this.props.recipe.name}</Card.Header>
            <Card.Header>{this.props.recipe.description}</Card.Header>
            <Card.Header>{this.props.recipe.ingredients}</Card.Header>
            <Card.Header>{this.props.recipe.steps}</Card.Header>
            <Card.Header>{this.props.recipe.tags}</Card.Header>
            <Card.Header>{this.props.recipe.owner}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.recipe._id}`}>Edit</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
IndividualRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IndividualRecipe);

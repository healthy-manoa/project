import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

class UserRecipe extends React.Component {
  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Card.Header>{this.props.recipes.name}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.recipes._id}`}>Edit</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
// eslint-disable-next-line no-undef
UserRecipe.propTypes = {
  recipes: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
// eslint-disable-next-line no-undef
export default withRouter(UserRecipe);

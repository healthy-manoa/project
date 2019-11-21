import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Inventory extends React.Component {
  render() {
    return (
        <Card>
          <Image src= {this.props.inventory.image} />
          <Card.Content>
            <Card.Header>{this.props.inventory.vendor}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.inventory.location}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.inventory.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.inventory._id}`}>Edit</Link>
          </Card.Content>
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
Inventory.propTypes = {
  inventory: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Inventory);

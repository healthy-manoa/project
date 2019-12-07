import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorAdmin extends React.Component {
  render() {
    return (
        <Link to={`/individual-vendor/${this.props.vendor._id}`} className={'vendor-button'}>
        <Card>
          <Image className = {'vendor-image'}  src= {this.props.vendor.image} />
          <Card.Content>
            <Card.Header>{this.props.vendor.name}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.vendor.location}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.vendor.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit-vendor/${this.props.vendor._id}`}>Edit</Link>
          </Card.Content>
        </Card>
        </Link>
    );
  }
}

/** Require a document to be passed to this component. */
VendorAdmin.propTypes = {
  vendor: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(VendorAdmin);

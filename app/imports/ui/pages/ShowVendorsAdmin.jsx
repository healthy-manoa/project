import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Image } from 'semantic-ui-react';
import VendorAdmin from '/imports/ui/components/VendorAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendors';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ShowVendors extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='content-wrap'>
        <div className={'vendor-background'}>
        <Container>
          <Header as="h2" textAlign="center" inverted> Vendors</Header>
          <Card.Group>
            {this.props.vendors.map((vendors, index) => <VendorAdmin
                key={index}
                vendor={vendors}
                />)}
          </Card.Group>
        </Container>
  </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ShowVendors.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Vendors');
  return {
    vendors: Vendors.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ShowVendors);

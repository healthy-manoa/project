import React from 'react';
import { Loader, Header, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import { Vendors } from '../../api/vendor/Vendors';

/** Renders the Page for editing a single document. */
class IndividualVendor extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <div>
          <Container>
          <Image size = 'large' src= {this.props.doc.image} />
          <Header> {this.props.doc.name}</Header>
            <span className='date'>{this.props.doc.location}</span>
          <Header> Description</Header>
             <p> {this.props.doc.description} </p>
        </Container>
        </div>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
IndividualVendor.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Vendors');
  return {
    doc: Vendors.findOne(documentId),
    ready: subscription.ready(),
  };
})(IndividualVendor);

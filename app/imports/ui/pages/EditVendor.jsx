import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Vendors, VendorSchema } from '/imports/api/vendor/Vendors';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';

/** Renders the Page for editing a single document. */
class EditVendor extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, image, description, location, _id } = data;
    Vendors.update(_id, { $set: { name, description, image, location } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Vendor</Header>
            <AutoForm schema={VendorSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='name'/>
                <TextField name='image'/>
                <LongTextField name='description'/>
                <TextField name='location'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Recipe document in the props object. Uniforms adds 'model' to the props, which we use. */
EditVendor.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Recipe documents.
  const subscription = Meteor.subscribe('Vendors');
  return {
    doc: Vendors.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditVendor);

import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Reviews, ReviewSchema } from '/imports/api/review/Reviews';
import swal from 'sweetalert';

/** A simple static component to render some text for the landing page. */
class Review extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, feedback } = data;
    Reviews.insert({ name, feedback },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  render() {
    let fRef = null;
    return (
        <div className='vendor-background'>
        <div className='content-wrap'>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Feedback</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={ReviewSchema} onSubmit={data => this.submit(data, fRef)} model={this.props.doc}>
                <Segment>
                  <TextField name='name'/>
                  <LongTextField name='feedback'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
        </div>
    );
  }
}

Review.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Review');
  return {
    ready: subscription.ready(),
  };
})(Review);

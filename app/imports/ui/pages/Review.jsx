import React from 'react';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Reviews, ReviewSchema } from '/imports/api/review/Reviews';

/** A simple static component to render some text for the landing page. */
class Review extends React.Component {
  render() {
    return (
        <div className='content-wrap'>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Feedback</Header>
              <AutoForm schema={ReviewSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
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

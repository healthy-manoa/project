import React from 'react';
import { Container, Grid, Header, Image, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Stuffs } from '/imports/api/stuff/Stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Profile</Header>
          <Grid celled='internally'>
            <Grid.Row>
            <Grid.Column width={3}>
              <Grid>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
              </Grid>
              <Header as="h2" textAlign="center">Uername: {this.props.currentUser}</Header>
            </Grid.Column>
            <Grid.Column>
              {this.props.stuffs.map((stuff) => <StuffItem key={stuff._id} stuff={stuff} />)}
            </Grid.Column>
          </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
  };
})(UserProfile);

import React from 'react';
import { Container, Grid, Header, Image, Loader, Card, Divider} from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import UserRecipe from '../components/UserRecipe';
import VendorAdmin from '../components/VendorAdmin';
import { Recipes } from '../../api/recipe/Recipes';
import { Vendors } from '../../api/vendor/Vendors';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class VendorProfile extends React.Component {
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
          <Header as="h2" textAlign="center" inverted>Profile</Header>
          <Divider inverted/>
          <Grid>
            <Grid.Row centered columns={2}>
                <Header as="h2" textAlign="center" inverted>Username: {this.props.currentUser}</Header>
                <Header textAlign="center"><Link to={'/change-password/:_id'}>Change Password</Link></Header>
            </Grid.Row>
            <Divider inverted/>
            <Grid.Row centered columns={2}>
              <Header as="h2" textAlign="center" inverted>Individual Vendors</Header>
              <Card.Group>
              {this.props.vendors.map((vendors) => <VendorAdmin key={vendors._id} vendor={vendors} />)}
              </Card.Group>
              </Grid.Row>
            <Divider inverted/>
            <Grid.Row>
              <Header textAlign="center"><Link to={'/add-recipe'}>Upload Recipes</Link></Header>
              <Header textAlign="center"><Link to={`/edit-vendor/:_id`}>Edit</Link></Header>
            </Grid.Row>
            <Divider inverted/>
              <Grid.Row centered columns={2}>
                <Header as="h2" textAlign="center" inverted>Individual Recipes</Header>
                <Card.Group>
                  {this.props.recipes.map((recipes) => <UserRecipe key={recipes._id} recipe={recipes} />)}
                </Card.Group>
              </Grid.Row>
          </Grid>
        </Container>
        </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
VendorProfile.propTypes = {
  recipes: PropTypes.array.isRequired,
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription1 = Meteor.subscribe('UserRecipes');
  const subscription2 = Meteor.subscribe('individualVendors');
  return {
    vendors: Vendors.find({}).fetch(),
    recipes: Recipes.find({}).fetch(),
    ready: [subscription1.ready(), subscription2.ready()],
    currentUser: Meteor.user() ? Meteor.user().username : '',
  };

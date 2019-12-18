import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image, Icon, Modal } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { border: 'none', boxShadow: 'none', backgroundColor: 'white', marginBottom: '10px' };
    return (
      <Menu borderless style={menuStyle} attached="top">
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header as='h5'><Image size='small' circular src="/images/icon.png"/>Healthy Manoa</Header>
        </Menu.Item>
        <Modal trigger={<Menu.Item><Header as='h4'><Icon name='id card'/>About Us</Header></Menu.Item>}>
            <Modal.Header>About Healthy Manoa</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='/images/icon.png' />
              <Modal.Description>
                <Header as='h1'>
                  Healthy Manoa is an organization dedicated to providing ways for students to eat healthy.
                </Header>
                <Header as='h3'>
                  The Healthy Manoa app allows students to learn and share recipes for healthy eating.
                  Students can also interact with vendors to find information on food and cooking items.
                </Header>
                <Header as='h3'>
                  For additional information, please visit our web page at:
                  <a href="https://healthy-manoa.github.io/">https://healthy-manoa.github.io/</a>
                </Header>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        {!Roles.userIsInRole(Meteor.userId(), 'admin') ? (
       [ <Menu.Item as={NavLink} activeClassName="" exact to="/vendor" key='vendor' >
          <Header as='h5'><Icon name='shop'/>Vendors</Header>
        </Menu.Item>,
        <Menu.Item as={NavLink} activeClassName="active" exact to="/list-recipes-public" key='list-recipes'>
          <Header as='h5'><Icon name='utensils'/>Recipes</Header>
        </Menu.Item>
          ]) : ''
          }
        {this.props.currentUser && !Roles.userIsInRole(Meteor.userId(), 'admin') ?  (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/add-recipe" key='add-recipe'>
                <Header as='h5'><Icon name='plus'/>Add Recipes</Header>
              </Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/profile" key='profile'>
                <Header as='h5'><Icon name='smile'/>Profile</Header>
              </Menu.Item>,
            ]) : ''
        }
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/vendor-admin" key= 'vendor' >
                <Header as='h5'><Icon name='shop'/>Vendor Admin</Header>
              </Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/list-inventory-admin" key= 'inventory' >
                <Header as='h5'><Icon name='boxes'/>Inventory Admin</Header>
              </Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/list-recipes" key='list-recipes'>
                <Header as='h4'><Icon name='utensils'/>Recipes</Header>
              </Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active"
                         exact to="/add-recipe" key='add-recipe'><Header as='h4'><Icon name='plus'/>Add Recipes</Header></Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active"
                         exact to="/add-vendor" key='add-vendor'><Header as='h4'><Icon name='plus'/>Add Vendors</Header></Menu.Item>,
            ]
        ) : '' }
        { this.props.currentRole === 'vendor' ? (
            [<Menu.Item as={NavLink} activeClassName="active"
                        exact to="/list-inventory" key= 'inventory' ><Header as='h4'><Icon name='boxes'/>Inventory</Header>
            </Menu.Item>,
            ]) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing="top right" icon={'user outline'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  currentRole: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  currentRole: Meteor.user() ? Meteor.user().profile.role : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);

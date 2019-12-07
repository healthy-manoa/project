import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', role: '', error: '', redirectToReferer: false, createRole: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, role } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true, createRole: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      if (this.state.role === 'vendor') {
        console.log(Meteor.userId());
        Roles.addUsersToRoles(Meteor.userId(), 'vendor');
      }
      return <Redirect to={from}/>;
    }
    const options = [
      {value:'student', text:'Student'},
      {value:'vendor', text:'Vendor'},
    ]
    return (
        <div className='content-wrap'>
        <div className={'vendor-background'} >
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Dropdown
                    label="Sign Up As:"
                    placeholder="Select Options"
                    options={options}
                    name="role"
                    type="role"
                    onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
        </div>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;

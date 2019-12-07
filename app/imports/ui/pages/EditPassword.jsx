import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Confirm } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class EditPassword extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', oldPassword: '', newPassword: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { oldPassword, newPassword } = this.state;
    Accounts.changePassword(oldPassword, oldPassword, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
        Accounts.changePassword(oldPassword, newPassword);
      }
    });
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <div className='content-wrap'>
        <div className={'vendor-background'} >
          <Container>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <Header as="h2" textAlign="center" inverted>
                  Change Your Username
                </Header>
                <Form onSubmit={this.submit}>
                  <Segment stacked>
                    <Form.Input
                        label="Current Password"
                        icon="lock"
                        iconPosition="left"
                        name="oldPassword"
                        type="oldPassword"
                        placeholder="current password"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="New Password"
                        icon="lock"
                        iconPosition="left"
                        name="newPassword"
                        type="newPassword"
                        placeholder="new password"
                        onChange={this.handleChange}
                    />
                    <Form.Button content="Submit"/>
                  </Segment>
                </Form>
                <Message>
                  Go back to profile <Link to="/profile">here</Link>
                </Message>
                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Change was not successful"
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
EditPassword.propTypes = {
  location: PropTypes.object,
};

export default EditPassword;

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Header as="h2" textAlign="center" inverted>
        <div className='glow'>
        <p className={'white-text'}>You are signed out.</p>
      </div>
      </Header>
    );
  }
}

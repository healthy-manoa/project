import React from 'react';
import { Header } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    return (
        <div className='content-wrap'>
      <Header as="h2" textAlign="center">
        <p>Page not found</p>
      </Header>
        </div>
    );
  }
}

export default NotFound;

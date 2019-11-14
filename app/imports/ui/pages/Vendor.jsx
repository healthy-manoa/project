import React from 'react';
import { Grid, Image, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Vendor extends React.Component {
  render() {
    return (
        <Container>
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Column width={8}>
            <h1>Welcome vendors!</h1>
            <p>You can manage your inventory here</p>
          </Grid.Column>

        </Grid>
          <Image size='very large' src="https://design215.com/images/gallery/ultra2011_2104.jpg"/>
        </Container>
    );
  }
}

export default Vendor;

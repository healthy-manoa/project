import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='background'>
          <Grid verticalAlign='middle' textAlign='center' container>
            <Grid.Column>
            <Image circular size='medium' centered src='/images/logo-image.jpg'/>
              <Card fluid>
                <div className='style'>
                <Card.Header as='h1'>Welcome to Healthy Manoa</Card.Header>
                  <Card.Description as='h3'>Learn and share recipes yummy for the tummy!</Card.Description>
                </div>
              </Card>
              </Grid.Column>
        </Grid>
        </div>
    );
  }
}

export default Landing;

import React from 'react';
import _ from 'lodash';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component { 
  render() {
    return (
        <div className='background'>
          <Grid verticalAlign='bottom' textAlign='center' container>
            <Grid.Column>
              <Image circular size='medium' centered src='/images/logo.png'/>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;

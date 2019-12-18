import React from 'react';
import { Grid, Card, Label } from 'semantic-ui-react';
import { withRouter, Redirect } from 'react-router-dom';

const initialState = { redirect: false };

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  state = initialState;

  handleOnClick = () => this.setState({ redirect: true });

  render() {
    const divStyle = { paddingTop: '10px' };
    return (
        <footer>
          <div className='footer'>
            <Grid verticalAlign='middle' textAlign='center'>
              <Grid.Column>
                <div style={divStyle}>
                  <Card fluid attached='bottom'>
                    <Card.Header>Healthy Manoa</Card.Header>
                    <Card.Description><a href="https://healthy-manoa.github.io/">Home Page</a></Card.Description>
                  </Card>
                  <Label onClick={this.handleOnClick}>
                    Give us some feedback!
                  </Label>
                </div>
              </Grid.Column>
            </Grid>
          </div>
          <div>
            {this.state.redirect &&
            <Redirect to={{
            pathname: '/feedback',
            }}/>
            }
          </div>
        </footer>
    );
  }
}
export default withRouter(Footer);

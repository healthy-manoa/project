import React from 'react';
import _ from 'lodash';
import { Grid, Image, Search } from 'semantic-ui-react';

const initialState = { isLoading: false, results: [], value: '' };

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.name });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 300);
  }

  render() {
    const { isLoading, value, results } = this.state

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

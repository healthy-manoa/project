import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Grid, Image, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Vendors } from '../../api/vendor/Vendor';
import { Recipes } from '../../api/recipe/Recipes';

const initialState = { isLoading: false, results: [], value: '' };

const source = Meteor.settings.defaultVendors;

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
    const { isLoading, value, results } = this.state;
    const style = { paddingTop: '150px' };
    return (
        <div className='background'>
          <Grid style={style} verticalAlign='bottom' textAlign='center' container>
            <Grid.Row>
              <Image size='medium' centered src='/images/logo.png'/>
            </Grid.Row>
            <Grid.Row>
              <Search
                  size='massive'
                  fluid
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                  })}
                  results={results}
                  value={value}
                  {...this.props}
              />
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

Landing.propTypes = {
  vendors: PropTypes.array.isRequired,
  recipes: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const vendorSub = Meteor.subscribe('Vendors');
  const recipeSub = Meteor.subscribe('Recipes');
  return {
    vendors: Vendors.find({}).fetch(),
    recipes: Recipes.find({}).fetch(),
  };
})(Landing);

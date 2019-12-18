import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Grid, Image, Search, Label, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Redirect } from 'react-router-dom';
import { Recipes } from '../../api/recipe/Recipes';
import { Vendors } from '../../api/vendor/Vendors';

const initialState = {
  isLoading: false,
  results: [],
  value: '',
  redirectVendors: false,
  redirectRecipes: false,
  id: '',
  dropdownValue: 'Vendors',
};

const options = [
  {
    key: 'Vendors',
    text: 'Vendors',
    value: 'Vendors',
  },
  {
    key: 'Recipes',
    text: 'Recipes',
    value: 'Recipes',
  },
];

const resultRenderer = ({ name }) => <Label content={name}/>;

resultRenderer.propTypes = {
  name: PropTypes.string,
};

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  state = initialState;

  handleResultSelect = (e, { result }) => {
    if (this.state.dropdownValue === 'Recipes') {
      this.setState({ redirectRecipes: true, id: result._id });
    } else {
      this.setState({ redirectVendors: true, id: result._id });
    }
  }

  handleDropdownChange =(e, { value }) => this.setState({ dropdownValue: value });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      let source;
      if (this.state.dropdownValue === 'Recipes') {
        source = this.props.recipes;
      } else {
        source = this.props.vendors;
      }
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.name);

      return this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 300);
  }

  render() {
    const style = { paddingTop: '150px' };
    const dropdownStyle = { marginRight: '150px' };
    const { value, results } = this.state;
    return (
        <div className='background'>
          <Grid style={style} verticalAlign='bottom' textAlign='center' container>
            <Grid.Row>
              <Image size='medium' centered src='/images/logo.png'/>
            </Grid.Row>
            <Grid.Row column={2}>
              <Grid.Column style={dropdownStyle}>
                <Dropdown
                  placeholder='Choose what to search'
                  selection
                  options={options}
                  defaultValue={'Vendors'}
                  onChange={this.handleDropdownChange}
                />
              </Grid.Column>
              <Grid.Column style={dropdownStyle}>
                <Search
                    size='huge'
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                      leading: true,
                    })}
                    results={results}
                    value={value}
                    resultRenderer={resultRenderer}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div>
            {this.state.redirectVendors &&
            <Redirect from='/' to={{
              pathname: `/individual-vendor/${this.state.id}`,
            }}/>
            }
          </div>
          <div>
            {this.state.redirectRecipes &&
            <Redirect from='/' to={{
              pathname: `/recipes/${this.state.id}`,
            }}/>
            }
          </div>
        </div>
    );
  }
}

Landing.propTypes = {
  recipes: PropTypes.array.isRequired,
  vendors: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LandingContainer = withTracker(() => {
  // Get access to Stuff documents.
  Meteor.subscribe('PublicRecipes');
  Meteor.subscribe('Vendors');
  return {
    recipes: Recipes.find({}).fetch(),
    vendors: Vendors.find({}).fetch(),
  };
})(Landing);

export default withRouter(LandingContainer);

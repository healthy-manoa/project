import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Grid, Image, Search, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipe/Recipes';

const resultRenderer = ({ name }) => <Label content={name}/>;

resultRenderer.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
};

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

      return this.setState({
        isLoading: false,
        results: _.filter(this.props.recipes, isMatch),
      });
    }, 300);
  }

  render() {
    const style = { paddingTop: '150px' };
    const { value, results } = this.state;
    return (
        <div className='background'>
          <Grid style={style} verticalAlign='bottom' textAlign='center' container>
            <Grid.Row>
              <Image size='medium' centered src='/images/logo.png'/>
            </Grid.Row>
            <Grid.Row>
              <Search
                  fluid
                  size='huge'
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                  })}
                  results={results}
                  value={value}
                  resultRenderer={resultRenderer}
              />
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

Landing.propTypes = {
  recipes: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  Meteor.subscribe('PublicRecipes');
  return {
    recipes: Recipes.find({}).fetch(),
  };
})(Landing);

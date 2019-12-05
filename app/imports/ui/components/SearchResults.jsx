import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SearchResults extends React.Component {
  render() {
    return (
        <Label >
          <Link to={`/vendors/${this.props.results._id}`}>results</Link>
        </Label>
    );
  }
}

/** Require a document to be passed to this component. */
SearchResults.propTypes = {
  results: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SearchResults);

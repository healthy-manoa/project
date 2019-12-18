import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
          <Feed as={ Link } to={`/feedback/${this.props.review._id}`}>
            <Feed.Event>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>{this.props.review.name}</Feed.User> commented!
                </Feed.Summary>
                <Feed.Extra text>{this.props.review.feedback}</Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          </Feed>
    );
  }
}

/** Require a document to be passed to this component. */
Review.propTypes = {
  review: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Review);

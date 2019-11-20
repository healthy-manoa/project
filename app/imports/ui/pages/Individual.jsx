import React from 'react';
import { Header, Image, Container, Card } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Individual extends React.Component {
  render() {
    return (
        <Container>
          <Image centered size='very large' src="/images/recipe-book.jpg"/>
          <Header as="h2" textAlign="center">Welcome Students!</Header>
          <Header as="h3" textAlign="center">You can save recipes here</Header>
              <Card>
                <Image src='/images/background-image.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Food</Card.Header>
                  <Card.Description>
                    Recipe
                  </Card.Description>
                </Card.Content>
              </Card>
        </Container>
    );
  }
}

export default Individual;
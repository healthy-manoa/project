import React from 'react';
import { Recipes } from '/imports/api/recipe/Recipes';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  description: String,
  ingredients: Array,
  'ingredients.$': String,
  steps: String,
  tags: Array,
  'tags.$': String,
});

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, description, ingredients, steps, tags } = data;
    const owner = Meteor.user().username;
    Recipes.insert({ name, description, ingredients, steps, tags, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Recipe</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <TextField description='description'/>
                <TextField ingredients='ingredients'/>
                <TextField steps='steps'/>
                <TextField tags='tags'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddRecipe;

import React from 'react';
import { Recipes } from '/imports/api/recipe/Recipes';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import ListField from 'uniforms-semantic/ListField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  image: String,
  description: String,
  ingredients: Array,
  'ingredients.$': String,
  steps: String,
  tags: Array,
  'tags.$': String,
});

/** Renders the Page for adding a document. */
class AddRecipes extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, image, description, steps } = data;
    let { ingredients, tags } = data;
    const owner = Meteor.user().username;
    ingredients = ingredients.join(', ');
    tags = tags.join(', ');
    Recipes.insert({ name, image, description, ingredients, steps, tags, owner },
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
        <div className='content-wrap'>
        <div className={'vendor-background'} >
        <Grid container centered >
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Recipes</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <TextField name='image'/>
                <LongTextField name='description'/>
                <ListField name='ingredients'/>
                <LongTextField name='steps'/>
                <ListField name='tags'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
        </div>
        </div>
    );
  }
}

export default AddRecipes;

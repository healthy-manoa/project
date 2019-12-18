import React from 'react';
import { Inventories } from '/imports/api/inventory/Inventories';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  vendor: String,
  location: String,
  ingredient: String,
  image: String,
  description: String,
  owner: String,
  price: Number,
});

/** Renders the Page for adding a document. */
class AddInventory extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { vendor, location, ingredient, image, description, owner, price } = data;
    Inventories.insert({ vendor, location, ingredient, image, description, owner , price},
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
                <TextField name='vendor'/>
                <TextField name='location'/>
                <TextField name='ingredient'/>
                <TextField name='image'/>
                <LongTextField name='description'/>
                <TextField name='owner'/>
                <TextField name='price'/>
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

export default AddInventory;

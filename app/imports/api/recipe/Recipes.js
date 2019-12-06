import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Recipes = new Mongo.Collection('Recipes');

/** Define a schema to specify the structure of each document in the collection. */
const RecipeSchema = new SimpleSchema({
  name: String,
  image: String,
  description: String,
  ingredients: Array,
  'ingredients.$': String,
  steps: String,
  tags: Array,
  'tags.$': String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Recipes.attachSchema(RecipeSchema);

/** Make the collection and schema available to other code. */
export { Recipes, RecipeSchema };

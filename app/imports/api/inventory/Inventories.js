import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Inventories = new Mongo.Collection('Inventories');

/** Define a schema to specify the structure of each document in the collection. */
const InventoriesSchema = new SimpleSchema({
  vendor: String,
  location: String,
  contact: String,
  ingredient: String,
  image: String,
  description: String,
  owner: String,
  price: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Inventories.attachSchema(InventoriesSchema);

/** Make the collection and schema available to other code. */
export { Inventories, InventoriesSchema };

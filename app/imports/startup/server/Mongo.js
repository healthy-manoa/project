import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Inventories } from '../../api/inventory/Inventories.js';
import { Vendors } from '../../api/vendor/Vendor.js';
import { Recipes } from '../../api/recipe/Recipes.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}


function addInventory(data) {
  console.log(`  Adding: ${data.vendor} (${data.owner})`);
  Inventories.insert(data);
}

if (Inventories.find().count() === 0) {
  if (Meteor.settings.defaultInventories) {
    console.log('Creating default data.');
    Meteor.settings.defaultInventories.map(data => addInventory(data));
  }
}
function addRecipe(data) {
  console.log(` Adding: ${data.name} (${data.owner})`);
  Recipes.insert(data);
}

if (Recipes.find().count() === 0) {
  if (Meteor.settings.defaultRecipes) {
    console.log('Creating default recipes.');
    Meteor.settings.defaultRecipes.map(data => addRecipe(data));
  }
}

function addVendor(data) {
  console.log(` Adding: ${data.name}`);
  Vendors.insert(data);
}

if (Vendors.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default vendors.');
    Meteor.settings.defaultVendors.map(data => addVendor(data));
  }
}

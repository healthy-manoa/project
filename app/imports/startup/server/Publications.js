import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Inventories } from '../../api/inventory/Inventories';
import { Vendors } from '../../api/vendor/Vendor';
import { Recipes } from '../../api/recipe/Recipes';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('UserRecipes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipes.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('PublicRecipes', function publish() {
  return Recipes.find();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

Meteor.publish('Inventories', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Inventories.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('InventoriesAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Inventories.find();
  }
  return this.ready();
});

Meteor.publish('Vendor', function publish() {
  return Vendors.find();
});

import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import UserProfile from '../pages/UserProfile';
import VendorProfile from '../pages/VendorProfile';
import AddRecipes from '../pages/AddRecipe';
import AddVendor from '../pages/AddVendor';
import ListRecipes from '../pages/ListRecipes';
import ListInventory from '../pages/ListInventory';
import ShowVendors from '../pages/ShowVendors';
import IndividualRecipe from '../pages/IndividualRecipe';
import EditRecipe from '../pages/EditRecipe';
import EditVendor from '../pages/EditVendor';
import IndividualVendor from '../components/IndividualVendor';
import EditPassword from '../pages/EditPassword';
import ListInventoryAdmin from '../pages/ListInventoryAdmin';
import ShowVendorsAdmin from '../pages/ShowVendorsAdmin';
import EditInventory from '../pages/EditInventory';
import EditInventoryAdmin from '../pages/EditInventoryAdmin';
import Review from '../pages/Review';
import AddInventory from '../pages/AddInventory';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/feedback" component={Review}/>
              <Route path="/list-recipes-public" component={ListRecipes}/>
              <AdminProtectedRoute path="/vendor-admin" component={ShowVendorsAdmin}/>
              <Route path="/vendor" component={ShowVendors}/>
              <AdminProtectedRoute path="/list-inventory-admin" component={ListInventoryAdmin}/>
              <ProtectedRoute path="/list-inventory" component={ListInventory}/>
              <ProtectedRoute path="/list-recipes" component={ListRecipes}/>
              <Route path="/individual-vendor/:_id" component={IndividualVendor}/>
              <ProtectedRoute path="/profile" component={UserProfile}/>
              <ProtectedRoute path="/individual-vendor/:_id" component={IndividualVendor}/>
              <ProtectedRoute path="/list" component={ListRecipes}/>
              <ProtectedRoute path="/edit-vendor/:_id" component={EditVendor}/>
              <ProtectedRoute path="/profile" component={UserProfile}/>
              <ProtectedRoute path="/vendor-profile" component={VendorProfile}/>
              <ProtectedRoute path="/add-recipe" component={AddRecipes}/>
              <ProtectedRoute path="/add-vendor" component={AddVendor}/>
              <ProtectedRoute path="/add-inventory" component={AddInventory}/>
              <ProtectedRoute path="/edit/:_id" component={EditRecipe}/>
              <ProtectedRoute path="/edit-inventory/:_id" component={EditInventory}/>
              <AdminProtectedRoute path="/edit-InventoryAdmin/:_id" component={EditInventoryAdmin}/>
              <ProtectedRoute path="/change-password/:_id" component={EditPassword}/>
              <Route path="/recipes/:_id" component={IndividualRecipe}/>
              <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

const VendorProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isVendor = Roles.userIsInRole(Meteor.userId(), 'vendor');
          return (isLogged && isVendor) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

VendorProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};
export default App;

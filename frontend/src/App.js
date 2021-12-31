import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hocs/Layout'
import Home from './pages/Home';
import Theory from './pages/Theory';
import List from './pages/List';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Activate from './pages/Activate';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminRoute from './components/Common/AdminRoute';
import UserAccount from './pages/UserAccount';
import StructuresToBeVerified from './pages/StructuresToBeVerified';
import StructureDetails from './pages/StructureDetails';
import UsersList from './pages/UsersList';

import { Provider } from 'react-redux';
import store from './store';

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import AddStructure from './pages/AddStructure';


//alert Options
const alertOptions = {
  timeout:5000,
  position: 'bottom center',
  transition: 'fade',
  offset: '-30px 0 60px 0'
}

function App() {
  return (
    <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
    <Router>
      <Layout>
      <Switch>
        <Route path="/" exact component={Home}></Route> 
        <Route path="/contact" exact component={Contact}></Route>
        <Route path="/theory" exact component={Theory}></Route>
        <Route path="/list" exact render={(props) => <List {...props} showStructuresOfAllUsers={true} />}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <PrivateRoute path="/my_account" exact component={UserAccount}></PrivateRoute>
        <PrivateRoute path="/my_structures" exact component={List}></PrivateRoute>
        <Route path="/structure/:id" exact component={StructureDetails}></Route>
        <AdminRoute path="/waiting_structures" exact component={StructuresToBeVerified}></AdminRoute>
        <AdminRoute path="/users_list" exact component={UsersList}></AdminRoute>
        <PrivateRoute path="/addstructure" exact component={AddStructure}></PrivateRoute>
        <Route path="/reset_password" exact component={ResetPassword}></Route>
        <Route path="/password/reset/confirm/:uid/:token" exact component={ResetPasswordConfirm}></Route>
        <Route path="/activate/:uid/:token" exact component={Activate}></Route>

      </Switch>
      </Layout>
    </Router>
    </AlertProvider>
    </Provider>
  );
}

export default App;

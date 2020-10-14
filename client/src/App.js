import React, {Component, Suspense} from 'react';
import './App.css';
// import { Provider } from 'react-redux';
import store from './store';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'

import {loadUser} from './_actions/user_actions'
import {loadImage} from './_actions/updateProfile';

// protected route
import PrivateRoute from './protectedRoutes/protectedRoutes'

// components
import Reset from './components/Reset';
import NavBar from './components/Navbar';
import Forgot from './components/Forgot';

// pages
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from "./pages/Profile";
import Updateuser from './components/profile/Updateuser';
import Blog from './pages/Blogs'
import CreateBlog from './components/Blog/section/CreateBlog';
import BlogPage from './components/Blog/BlogPage';
import Createcategories from './components/Blog/categoryandtag/Categoryindex'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
    store.dispatch(loadImage())
  }
  render() {
    const {token} = this.props.auth
    return (
      <>
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={"/signin"} component={Signin} />
          <Route exact path={"/signup"} component={Signup} />
          <Route exact path={"/forgot"} component={Forgot} />
          <Route exact path={"/blog"} component={Blog} />
          <Route exact path={"/blog/post/:postId"} component={Blog} />
          <PrivateRoute exact path={"/profile"} component={Profile} />
          <PrivateRoute exact path={"/profile/updateuser"} component={Updateuser} />
          <PrivateRoute exact path={"/profile/createblog"} component={CreateBlog} />
          <PrivateRoute exact path={"/profile/createcategories"} component={Createcategories} />
          {/* <Route exact path={`/auth/password/reset/${token}`} component={Reset} /> */}
        </Switch>
      </Suspense>
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(App);
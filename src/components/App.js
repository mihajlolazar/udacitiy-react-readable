import React, { Component } from 'react';
import {Route, withRouter, Switch}  from 'react-router-dom'

import Nav        from './Nav';
import Posts      from './Posts';
import Post       from './Post';
import CreatePost from './CreatePost';
import EditPost   from './EditPost';

import * as url   from '../helpers/url';

import '../App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        <Switch>
          <Route exact path={`${url.CREATE_POST}`} component={CreatePost} />
          <Route exact path={`${url.EDIT_POST}`} component={EditPost} />
          <Route exact path={`${url.POST}`} component={Post} />
          <Route exact path={`${url.CATEGORY}`} component={Posts} />
          <Route exact path={`${url.INDEX}`} component={Posts}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)











import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {connect}            from 'react-redux'

import * as request from '../utils/request';

import * as url   from '../helpers/url';

class Nav extends Component {
  componentDidMount(){
    this.props.requestAllCategories();
  }

  render(){
    return (
        <div className="nav-box clearfix">
          <div className="container">
            <nav className="nav">
              <Link to={`${url.INDEX}`}>Home</Link>
              <Link to={`${url.CREATE_POST}`}>Create New Post</Link>
            </nav>
            <ul className="nav-list">
              {this.props.categories.map(category =>
                  <li key={category.name}>
                    <Link to={`/${category.name}`}>{category.name}</Link>
                  </li>
              )}
            </ul>
          </div>
        </div>
    )
  }
}

function mapStateToProps({reducerCategories}) {
  return {
    categories: reducerCategories || []
  }
}


function mapDispatchToProps (dispatch) {
  return {
    requestAllCategories: () => dispatch(request.allCategories())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav)

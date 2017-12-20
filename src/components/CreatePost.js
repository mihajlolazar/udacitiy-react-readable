import React, { Component } from 'react'
import Modal                from 'react-modal'
import {Link}               from 'react-router-dom'
import {connect}            from 'react-redux'
import serializeForm        from 'form-serialize'

import * as request   from '../utils/request'
import {getParam}     from '../helpers/url'

import {modalStyles}  from '../constants/modal';

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    }
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };

  componentWillReceiveProps(nextProps){
    if( nextProps.postAdded ){
      this.openModal();
    }
  }

  submitNewPost = (event) => {
    event.preventDefault();

    const data = serializeForm(event.target, {hash: true});

    this.props.requestNewPost({
      id:         Math.random().toString(36).substr(-20),
      timestamp:  Date.now(),
      title:      data.title,
      body:       data.body,
      author:     data.author,
      category:   data.category
    });
  };

  render (){
    let categoryParam = getParam('category',this.props.location.search);
    const { newPost } = this.props;

    return (
      <div className="container create-post">
        <Modal
            contentLabel="Modal"
            ariaHideApp={false}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={modalStyles}
        >
          <h1>Post added successfully!</h1>
          <p>Great! You just added post to the <Link to={`/${newPost.category}/`}>{newPost.category}</Link> category.</p>
          <p>Would you like to go see your new <Link to={`/${newPost.category}/${newPost.id}`}>Post</Link> or to go <Link to={'/'}>Home</Link> maybe?</p>
        </Modal>

        <form className="post-form clearfix" onSubmit={this.submitNewPost}>
          <div className="row">
            <label>Title:</label>
            <input type="text" name="title" placeholder="Title" required />
          </div>
          <div className="row">
            <label>Author:</label>
            <input type="text" name="author" placeholder="Author" required />
          </div>
          <div className="row">
            <label>Category:</label>
            <select name="category" value={categoryParam} readOnly={true}>
              {this.props.categories.map(category =>
                  <option key={category.name}>{category.name}</option>
              )}
            </select>
          </div>
          <div className="row">
            <label>Post:</label>
            <textarea name="body" placeholder="Write something nicely here" required ></textarea>
          </div>
          <div className="row submit-row">
            <button type="submit">Create Post</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({reducerCategories,reducerPosts}) {
  return {
    newPost:    reducerPosts.newPost || {},
    postAdded:  reducerPosts.postAdded,
    categories: reducerCategories || []
  }
}


function mapDispatchToProps(dispatch){
  return {
    requestNewPost:  (post) => dispatch(request.newPost(post))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreatePost)
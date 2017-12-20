import React, { Component } from 'react'
import Modal                from 'react-modal'
import {Link}               from 'react-router-dom'
import {connect}            from 'react-redux'

import serializeForm        from 'form-serialize'

import * as request   from "../utils/request";
import {filterArrayBy} from '../helpers/post';
import {modalStyles}  from '../constants/modal';

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    }
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  };

  closeModal = (event) => {
    event.preventDefault();
    this.setState({modalIsOpen: false});
  };

  submitEditPost = (event) => {
    event.preventDefault();

    const data = serializeForm(event.target, {hash: true});

    this.props.requestUpdatePost(data);
  };

  componentDidMount(){
    if( !this.props.post ){
      this.props.requestPost(this.props.match.params.postId);
    }
  }

  componentWillReceiveProps(nextProps){
    const oldPost = this.props.post;
    const newPost = nextProps.post;

    if( oldPost && newPost ){
      if( oldPost.title !== newPost.title || oldPost.body !== newPost.body ){
        this.openModal();
      }
    }
  }

  render(){
    const {post} = this.props;

    if( post ){
      return (
        <div className="container edit-post">
          <Modal
              contentLabel="Modal"
              ariaHideApp={false}
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={modalStyles}
          >
            <h1>Post edited successfully!</h1>
            <p>Great! You just edited a post.</p>
            <p>Would you like to go <Link to={`/${post.category}/${post.id}`}>see updated Post</Link>, <Link to={'/'}>go Home</Link> or <span className="link" onClick={this.closeModal}>continue</span>?</p>
          </Modal>

          <Link to={`/${post.category}/${post.id}`}>Go back to the Post</Link>

          <form className="post-form" onSubmit={this.submitEditPost}>
            <input type="hidden" name="id" value={post.id}/>
            <div className="row">
              <label>Title</label>
              <input type="text" name="title" placeholder="Title" required={true} defaultValue={post.title} />
            </div>
            <div className="row">
              <label>Post</label>
              <textarea name="body" placeholder="Write something nicely here" required={true} defaultValue={post.body}></textarea>
            </div>
            <div className="row submit-row">
              <button type="submit">Update Post</button>
            </div>
          </form>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

function mapStateToProps({reducerPosts},ownProps){
  let post;
  if( reducerPosts.posts ){
    post = filterArrayBy(reducerPosts.posts,{property:'id',operator:'===',value: ownProps.match.params.postId})[0];
  }

  return {
    post: post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestPost:        (id)    => dispatch(request.post(id)),
    requestUpdatePost:  (data)  => dispatch(request.updatePost(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPost)
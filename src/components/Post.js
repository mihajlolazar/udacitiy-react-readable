import React, { Component } from 'react';
import Modal                from 'react-modal'
import {Link}               from 'react-router-dom'
import {connect}            from 'react-redux'
import serializeForm        from 'form-serialize'

import Sort                 from './Sort'
import Vote                 from './Vote'
import AddCommentForm       from './AddCommentForm'
import EditCommentForm      from './EditCommentForm'

import * as sortType        from '../constants/sort'
import * as request         from "../utils/request";
import * as url             from '../helpers/url';
import {filterArrayBy}      from '../helpers/post';

import {
  sortCommentsByCreationTimeAsc,
  sortCommentsByCreationTimeDesc,
  sortCommentsByVotesAsc,
  sortCommentsByVotesDesc
} from "../actions/index";

import {modalStyles}  from '../constants/modal';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditCommentForm: {},
      modalIsOpen: false
    }
  }

  componentWillMount(){
    if( !this.props.post ){
      const {postId} = this.props.match.params;

      this.props.requestPost(postId);
      this.props.requestComments(postId);
    }
    else {
      if( this.props.comments && !this.props.comments[this.props.post.id] && this.props.post.commentCount ){
        this.props.requestComments(this.props.post.id)
      }
    }
  }

  // post functions
  upvoteFn(postId){
    this.props.requestUpvotePost(postId);
  }

  downvoteFn(postId){
    this.props.requestDownvotePost(postId);
  }

  deletePost(postId){
    this.props.requestDeletePost(postId);
  }

  // comment functions
  deleteComment(commentId){
    this.props.requestDeleteComment(commentId);
  }

  upvoteComment(commentId){
    this.props.requestUpvoteComment(commentId);
  }

  downvoteComment(commentId){
    this.props.requestDownvoteComment(commentId);
  }

  toggleEditCommentForm({id,show}){
    this.setState({
      showEditCommentForm: {
      ...this.state.showEditCommentForm,
      [id]: show
      }
    })
  }

  addNewComment = (event) => {
    event.preventDefault();

    const data    = serializeForm(event.target, {hash: true});
    let   target  = event.target;

    this.props.requestNewComment({
      id:         Math.random().toString(36).substr(-20),
      timestamp:  Date.now(),
      body:       data.body,
      author:     this.props.post.author,
      parentId:   this.props.post.id
    }).then(() => {
      target.getElementsByTagName('textarea')[0].value = '';
    });
  };

  onEditCommentSubmit = (event) => {
    event.preventDefault();

    const data = serializeForm(event.target, {hash: true});

    this.props.requestEditComment({
      id:         data.id,
      timestamp:  Date.now(),
      body:       data.body,
    }).then(() => {
      this.toggleEditCommentForm({id:data.id,show: false});
    });
  };

  sortByFn = (data) => {
    if( data !== null && data !== undefined ){
      let val = isNaN(parseInt(data,10)) ? data.target.value : data;

      switch (parseInt(val,10)){
        case sortType.SORT_BY_VOTES_DESC:
          this.props.sortCommentsByVotesDesc(this.props.post.id);
          break;
        case sortType.SORT_BY_VOTES_ASC:
          this.props.sortCommentsByVotesAsc(this.props.post.id);
          break;
        case sortType.SORT_BY_CREATION_TIME_DESC:
          this.props.sortCommentsByCreationTimeDesc(this.props.post.id);
          break;
        case sortType.SORT_BY_CREATION_TIME_ASC:
          this.props.sortCommentsByCreationTimeAsc(this.props.post.id);
          break;
        default:
      }
    }
  };

  render(){
    const { post }      = this.props;

    let comments        = this.props.comments && this.props.comments[post.id] ? this.props.comments[post.id] : [];
    if( comments.length ){
      comments = filterArrayBy(comments,{property: 'deleted', operator: '!==', value: true })
    }

    const showEditForm  = this.state.showEditCommentForm;
    const isPostPage    = this.props.match && this.props.match.params.postId;

    if( post && post.deleted ){
      return (
          <Modal
              contentLabel="Modal"
              ariaHideApp={false}
              isOpen={true}
              style={modalStyles}
          >
            <h1>Post deleted :(</h1>
            <p>But fear not! You can still <Link to={`${url.CREATE_POST}`}>create a new Post</Link> or visit our <Link to={`${url.INDEX}`}>Homepage</Link>.</p>
          </Modal>
      )
    }
    else if( post ){
      return (
        <div className="container post">

          <h2 className="title">
            <Link to={`/${post.category}/${post.id}`}>{post.title}</Link> <span className="medium-text regular">(by <strong>{post.author}</strong> @ <strong>{(new Date(post.timestamp)).toLocaleString()}</strong>)</span>
          </h2>

          <p className="post-body">{post.body}</p>

          <div className="post-info">
            <span className="score">{post.voteScore > 0 ? '+' : ''}{post.voteScore} Like{post.voteScore !== 1 ? 's' : ''}</span>
            <span className="separator">|</span>
            <span className="comments-size medium-text">{comments.length} Comment{comments.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="post-fn clearfix">
            <Link className="edit-post left" to={`/post/edit/${post.id}`}>Edit post</Link>
            <button type="button" className="right" onClick={() => { this.deletePost(post.id) }}>Delete post</button>
            <Vote upvoteFn={() => this.upvoteFn(post.id)} downvoteFn={() => this.downvoteFn(post.id)} />
          </div>

          {isPostPage && (
              <AddCommentForm label={'Add a New Comment'} onSubmit={this.addNewComment} />
          )}

          {isPostPage && comments && (comments.length > 0) && (
            <div className="comment-list">
              <Sort label={'Sort Comments By:'} sortByFn={this.sortByFn}/>

              {comments.map( comment => {
                if( !comment.deleted ){
                  if( showEditForm[comment.id] ){
                    return (
                      <div key={comment.id} className="comment edit-comment">
                        <EditCommentForm onSubmit={this.onEditCommentSubmit} onCancel={() => { this.toggleEditCommentForm({id:comment.id,show:false}) }} id={comment.id} body={comment.body} />
                      </div>
                    )
                  }
                  else {
                    return (
                      <div key={comment.id} className="comment">
                        <p className="comment-body">{comment.body}</p>
                        <div className="bottom-box">
                          <div className="comment-data medium-text">
                            <strong>{comment.voteScore > 0 ? '+' : ''}{comment.voteScore} Like{comment.voteScore !== 1 ? 's' : ''}</strong><br/>
                            <span>{(new Date(comment.timestamp)).toLocaleString()}</span>
                          </div>
                          <div className="comment-fn  text-right">
                            <button className="right" type="button" onClick={() => { this.deleteComment(comment.id) }}>Delete comment</button>
                            <button className="right" type="button" onClick={() => { this.toggleEditCommentForm({id:comment.id,show:true}) }}>Edit comment</button>
                            <Vote upvoteFn={() => this.upvoteComment(comment.id)} downvoteFn={() => this.downvoteComment(comment.id)} />
                          </div>
                        </div>
                      </div>
                    )
                  }
                }
                else {
                  return null;
                }
            })}
            </div>
          )}
        </div>
      )
    }
    else {
      return null;
    }
  }
}

function mapStateToProps({reducerPosts}, ownProps){
  let post,
      comments;

  // post list
  if( ownProps.post ){
    post = ownProps.post;
  }
  // single post page
  else if( reducerPosts.posts ){
    post = reducerPosts.posts.filter( item => {
      return item.id === ownProps.match.params.postId;
    })[0];
  }

  // post comments
  if( post && post.id ){
    comments = reducerPosts.comments || {};
    comments[post.id] = comments[post.id] || undefined;
  }

  return {
    post:       post,
    comments:   comments,
    postLoaded: reducerPosts.postLoaded
  }
}

function mapDispatchToProps(dispatch){
  return {
    requestUpvotePost:              (postId)    => dispatch(request.upvotePost(postId)),
    requestDownvotePost:            (postId)    => dispatch(request.downvotePost(postId)),
    requestPost:                    (postId)    => dispatch(request.post(postId)),
    requestDeletePost:              (postId)    => dispatch(request.deletePost(postId)),
    requestNewComment:              (data)      => dispatch(request.newComment(data)),
    requestComments:                (postId)    => dispatch(request.postComments(postId)),
    requestDeleteComment:           (commentId) => dispatch(request.deleteComment(commentId)),
    requestEditComment:             (data)      => dispatch(request.editComment(data)),
    requestUpvoteComment:           (commentId) => dispatch(request.upvoteComment(commentId)),
    requestDownvoteComment:         (commentId) => dispatch(request.downvoteComment(commentId)),
    sortCommentsByCreationTimeAsc:  (postId)  => dispatch(sortCommentsByCreationTimeAsc(postId)),
    sortCommentsByCreationTimeDesc: (postId)  => dispatch(sortCommentsByCreationTimeDesc(postId)),
    sortCommentsByVotesAsc:         (postId)  => dispatch(sortCommentsByVotesAsc(postId)),
    sortCommentsByVotesDesc:        (postId)  => dispatch(sortCommentsByVotesDesc(postId)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)
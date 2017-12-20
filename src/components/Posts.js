import React, {Component}   from 'react'
import {connect}            from 'react-redux'
import {Link}               from 'react-router-dom'
import Sort                 from './Sort'
import Post                 from './Post'
import * as sortType        from '../constants/sort'

import {
  sortPostsByCreationTimeAsc,
  sortPostsByCreationTimeDesc,
  sortPostsByVotesAsc,
  sortPostsByVotesDesc,
} from '../actions';


import { SORT_BY_VOTES_DESC } from "../constants/sort";

import * as request     from "../utils/request";
import * as url         from '../helpers/url';
import {filterArrayBy}  from '../helpers/post';

class Posts extends Component {
  sortByFn = (event) => {
    switch (parseInt(event.target.value,10)){
      case sortType.SORT_BY_VOTES_DESC:
        this.props.sortByVotesDesc();
        break;
      case sortType.SORT_BY_VOTES_ASC:
        this.props.sortByVotesAsc();
        break;
      case sortType.SORT_BY_CREATION_TIME_DESC:
        this.props.sortByCreationTimeDesc();
        break;
      case sortType.SORT_BY_CREATION_TIME_ASC:
        this.props.sortByCreationTimeAsc();
        break;
      default:
        return false;
    }
  };

  componentDidMount(){
    this.props.requestAllPosts({sortValue: SORT_BY_VOTES_DESC});
  }

  render() {
   const category = this.props.match.params.category;

   let posts  = filterArrayBy(this.props.posts,{property: 'deleted', operator: '===', value: false });

   if( category ){
    posts = filterArrayBy(posts,{property: 'category', operator: '===', value: category });
   }

    if( posts && posts.length ){
      return (
        <div className="container post-list-box">
          <Sort label={'Sort Posts By:'} sortByFn={this.sortByFn}/>

          <ul className="post-list">
            {posts.map(post => {
              if (!post.deleted) {
                return (
                    <li key={post.id} className="post-list-item">
                      <Post post={post} upvoteFn={this.props.requestUpvotePost} downvoteFn={this.props.requestDownvotePost} />
                    </li>
                )
              } else {
                return null
              }
            })}
          </ul>
        </div>
      )
    }
    // prevent showing this block on the initial render
    else if( posts && !posts.length ) {
      return (
        <div className="container post-list-empty">
          <p>Sorry but there are no available posts {category ? 'for the "' + category + '" category' : ''} right now.</p>

          <p>Maybe you would like to help us out and <Link to={{
            pathname: `${url.CREATE_POST}`,
            search: category ? '?category=' + category : ''
          }}>create</Link> one?</p>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    sortByCreationTimeAsc:  ()      => dispatch(sortPostsByCreationTimeAsc()),
    sortByCreationTimeDesc: ()      => dispatch(sortPostsByCreationTimeDesc()),
    sortByVotesAsc:         ()      => dispatch(sortPostsByVotesAsc()),
    sortByVotesDesc:        ()      => dispatch(sortPostsByVotesDesc()),
    requestUpvotePost:      (id)    => dispatch(request.upvotePost(id)),
    requestDownvotePost:    (id)    => dispatch(request.downvotePost(id)),
    requestAllPosts:        (data)  => dispatch(request.allPosts(data))
  }
}

function mapStateToProps({reducerPosts}) {
  return {
    posts:      reducerPosts.posts || undefined,
    sortValue:  reducerPosts.sortValue
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts)

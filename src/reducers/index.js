import { combineReducers }  from 'redux'
import * as types           from '../actions/types';
import sortBy               from 'sort-by'
import * as sortType        from '../constants/sort'

const reducerCategories = (state = [], action) => {
  switch(action.type) {
    case types.GET_CATEGORIES:
      return action.categories.map(category => {
        return category;
      });
    default:
      return state
  }
};

const reducerPosts = (state = {}, action) => {
  let post;
  const {sortValue} = action;

  switch( action.type ){
    case types.GET_POSTS:
      let result = action.posts.reduce((obj,item) => {
        obj.push(item);
        return obj;
      }, []);

      // sort fetched posts
      switch (sortValue){
        case sortType.SORT_BY_CREATION_TIME_ASC:
          result = result.sort(sortBy('timestamp'));
          break;
        case sortType.SORT_BY_CREATION_TIME_DESC:
          result = result.sort(sortBy('-timestamp'));
          break;
        case sortType.SORT_BY_VOTES_ASC:
          result = result.sort(sortBy('voteScore'));
          break;
        case sortType.SORT_BY_VOTES_DESC:
          result = result.sort(sortBy('-voteScore'));
          break;
        default:
          result = result.sort(sortBy('timestamp'));
      }

      return {
          ...state,
          posts: result,
          sortValue: sortValue
      };

    case types.GET_POST:
      let postsArray = state.posts || [];
      postsArray.push(action.post);

      return {
        ...state,
        posts: postsArray
      };

    case types.POST_ADD:
    case types.POST_ADDED:
      return {
        postAdded:  action.postAdded,
        newPost:    action.newPost
      };

    case types.SORT_POSTS_BY_CREATION_TIME_ASC:
      return {
        ...state,
        posts: state.posts.sort(sortBy('timestamp')),
        sortValue: sortType.SORT_BY_CREATION_TIME_ASC
      };

    case types.SORT_POSTS_BY_CREATION_TIME_DESC:
      return {
        ...state,
        posts: state.posts.sort(sortBy('-timestamp')),
        sortValue: sortType.SORT_BY_CREATION_TIME_DESC
      };

    case types.SORT_POSTS_BY_VOTES_ASC:
      return {
        ...state,
        posts: state.posts.sort(sortBy('voteScore')),
        sortValue: sortType.SORT_BY_VOTES_ASC
    };

    case types.SORT_POSTS_BY_VOTES_DESC:
      return {
        ...state,
        posts: state.posts.sort(sortBy('-voteScore')),
        sortValue: sortType.SORT_BY_VOTES_DESC
      };

    case types.UPDATE_POST:
      post = action.post;

      return {
        ...state,
        posts: state.posts.map( (item, index) => {
          // don't edit
          if(item.id !== post.id) {
            return item;
          }

          // edit this array item
          return {
            ...item,
            ...post
          };
        })
      };

    case types.DELETE_POST:
    case types.UPVOTE_POST:
    case types.DOWNVOTE_POST:
      post = action.post;

      return {
        ...state,
        posts: state.posts.map( (item, index) => {
          // don't edit
          if(item.id !== post.id) {
            return item;
          }

          // edit this array item
          return {
            ...item,
            ...post
          };
        })
      };

    case types.COMMENT_ADD:
    case types.GET_POST_COMMENTS:

      return {
        ...state,
        comments: {
          [action.postId]: state.comments && state.comments[action.postId] ? [...state.comments[action.postId], ...action.comments] : action.comments
        }
      };

    case types.EDIT_COMMENT:
    case types.DELETE_COMMENT:
    case types.UPVOTE_COMMENT:
    case types.DOWNVOTE_COMMENT:
      const {comment} = action;

      return {
        ...state,
        comments: {
          [comment.parentId]: state.comments[comment.parentId].map(item => {
            // don't edit
            if(item.id !== comment.id) {
              return item;
            }

            // edit this array item
            return {
              ...item,
              ...comment
            };
          })
        }
      };

    case types.SORT_COMMENTS_BY_CREATION_TIME_ASC:
      return {
        ...state,
        comments: {
          [action.postId]: state.comments[action.postId].sort(sortBy('timestamp'))
        }
      };

    case types.SORT_COMMENTS_BY_CREATION_TIME_DESC:
      return {
        ...state,
        comments: {
          [action.postId]: state.comments[action.postId].sort(sortBy('-timestamp'))
        }
      };

    case types.SORT_COMMENTS_BY_VOTES_ASC:
      return {
        ...state,
        comments: {
          [action.postId]: state.comments[action.postId].sort(sortBy('voteScore'))
        }
      };

    case types.SORT_COMMENTS_BY_VOTES_DESC:
      return {
        ...state,
        comments: {
          [action.postId]: state.comments[action.postId].sort(sortBy('-voteScore'))
        }
      };

    default:
      return state;
  }
};

export default combineReducers({
  reducerCategories,
  reducerPosts
})
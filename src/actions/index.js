import * as types from './types';

export function getCategories(categories) {
  return {
    type: types.GET_CATEGORIES,
    categories
  }
}

export function getPosts({posts,sortValue}) {
  return {
    type: types.GET_POSTS,
    posts,
    sortValue
  }
}

export function getPost(post) {
  return {
    type: types.GET_POST,
    post
  }
}

export function updatePost(post) {
  return {
    type: types.UPDATE_POST,
    post
  }
}

export function postAdded(data) {
  return {
    type:       types.POST_ADDED,
    postAdded:  true,
    addingPost: false,
    newPost:    data
  }
}

export function deletePost(post) {
  return {
    type: types.DELETE_POST,
    post
  }
}

export function upvotePost(post) {
  return {
    type: types.UPVOTE_POST,
    post
  }
}

export function downvotePost(post) {
  return {
    type: types.DOWNVOTE_POST,
    post
  }
}

export function sortPostsByCreationTimeAsc() {
  return {
    type: types.SORT_POSTS_BY_CREATION_TIME_ASC
  }
}

export function sortPostsByCreationTimeDesc() {
  return {
    type: types.SORT_POSTS_BY_CREATION_TIME_DESC
  }
}

export function sortPostsByVotesAsc() {
  return {
    type: types.SORT_POSTS_BY_VOTES_ASC
  }
}

export function sortPostsByVotesDesc() {
  return {
    type: types.SORT_POSTS_BY_VOTES_DESC
  }
}

export function getPostComments(data,postId) {
  return {
    type:     types.GET_POST_COMMENTS,
    comments: data,
    postId
  }
}

export function createComment(data) {
  return {
    type:     types.COMMENT_ADD,
    comments: [data],
    postId:    data.parentId
  }
}

export function deleteComment(data) {
  return {
    type:     types.DELETE_COMMENT,
    comment:  data
  }
}

export function editComment(data) {
  return {
    type:     types.EDIT_COMMENT,
    comment:  data
  }
}

export function upvoteComment(comment) {
  return {
    type:     types.UPVOTE_COMMENT,
    comment:  comment
  }
}

export function downvoteComment(comment) {
  return {
    type:     types.DOWNVOTE_COMMENT,
    comment:  comment
  }
}

export function sortCommentsByCreationTimeAsc(postId) {
  return {
    type: types.SORT_COMMENTS_BY_CREATION_TIME_ASC,
    postId
  }
}

export function sortCommentsByCreationTimeDesc(postId) {
  return {
    type: types.SORT_COMMENTS_BY_CREATION_TIME_DESC,
    postId
  }
}

export function sortCommentsByVotesAsc(postId) {
  return {
    type: types.SORT_COMMENTS_BY_VOTES_ASC,
    postId
  }
}

export function sortCommentsByVotesDesc(postId) {
  return {
    type: types.SORT_COMMENTS_BY_VOTES_DESC,
    postId
  }
}
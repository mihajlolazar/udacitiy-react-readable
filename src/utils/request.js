import * as fetch from  './fetch'
import * as action from '../actions/index';

export const allCategories = () => dispatch => (
    fetch.categories().then(data => dispatch(action.getCategories(data.categories)))
);

export const allPosts = (data) => dispatch => (
    fetch.posts().then(resp => dispatch(action.getPosts({posts:resp, sortValue: data.sortValue})))
);

export const post = (id) => dispatch => (
    fetch.post(id).then(resp => dispatch(action.getPost(resp)))
);

export const updatePost = (data) => dispatch => (
    fetch.updatePost(data).then(resp => dispatch(action.updatePost(resp)))
);

export const upvotePost = (id) => dispatch => (
    fetch.upvotePost(id).then(resp => dispatch(action.upvotePost(resp)))
);

export const downvotePost = (id) => dispatch => (
    fetch.downvotePost(id).then(resp => dispatch(action.downvotePost(resp)))
);

export const newPost = (data) => dispatch => (
    fetch.createPost(data).then(() => dispatch(action.postAdded(data)))
);

export const deletePost = (id) => dispatch => (
    fetch.deletePost(id).then(resp => dispatch(action.deletePost(resp)))
);

export const newComment = (data) => dispatch => (
    fetch.createComment(data).then(resp => dispatch(action.createComment(resp)))
);

export const postComments = (postId) => dispatch => (
    fetch.getPostComments(postId).then(resp => dispatch(action.getPostComments(resp,postId)))
);

export const deleteComment = (commentId) => dispatch => (
    fetch.deleteComment(commentId).then(resp => dispatch(action.deleteComment(resp)))
);

export const editComment = (data) => dispatch => (
    fetch.editComment(data).then(resp => dispatch(action.editComment(resp)))
);

export const upvoteComment = (commentId) => dispatch => (
    fetch.upvoteComment(commentId).then(resp => dispatch(action.upvoteComment(resp)))
);

export const downvoteComment = (commentId) => dispatch => (
    fetch.downvoteComment(commentId).then(resp => dispatch(action.downvoteComment(resp)))
);
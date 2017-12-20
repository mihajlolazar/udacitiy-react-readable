const localhost         = 'http://localhost:3001';
const authorizationKey  = 'c24690';
const headers           = {
  'Accept': 'application/json',
  'Authorization': authorizationKey,
  'Content-Type': 'application/json'
};

export const categories = () => {
  return fetch(`${localhost}/categories`,{headers}).then(res => res.json());
};

export const posts = () => {
  return fetch(`${localhost}/posts`,{headers}).then(res => res.json());
};

export const post = (id) => {
  return fetch(`${localhost}/posts/${id}`,{
    method: 'GET',
    headers: headers
  }).then(res => res.json());
};

export const updatePost = (data) => {
  return fetch(`${localhost}/posts/${data.id}`,{
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      title: data.title,
      body: data.body
    })
  }).then(res => res.json());
};

export const createPost = (data) => {
  return fetch(`${localhost}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
};

export const deletePost = (id) => {
  return fetch(`${localhost}/posts/${id}`, {
    method: 'DELETE',
    headers: headers,
  }).then(res => res.json())
};

export const upvotePost = (id) => {
  return fetch(`${localhost}/posts/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({option: 'upVote'})
  }).then(res => res.json())
};

export const downvotePost = (id) => {
  return fetch(`${localhost}/posts/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({option: 'downVote'})
  }).then(res => res.json())
};

export const getPostComments = (id) => {
  return fetch(`${localhost}/posts/${id}/comments`, {
    method: 'GET',
    headers: headers,
  }).then(res => res.json())
};

export const createComment = (data) => {
  return fetch(`${localhost}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
};

export const deleteComment = (commentId) => {
  return fetch(`${localhost}/comments/${commentId}`, {
    method: 'DELETE',
    headers: headers,
  }).then(res => res.json())
};


export const editComment = (data) => {
  return fetch(`${localhost}/comments/${data.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
};

export const upvoteComment = (commentId) => {
  return fetch(`${localhost}/comments/${commentId}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({option: 'upVote'})
  }).then(res => res.json())
};

export const downvoteComment = (commentId) => {
  return fetch(`${localhost}/comments/${commentId}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({option: 'downVote'})
  }).then(res => res.json())
};

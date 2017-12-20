import React from 'react';

export default function EditCommentForm(props) {
  const {comment} = props;

  return (
    <form className="comment-form" onSubmit={props.onSubmit}>
      <input type="hidden" name="id" defaultValue={comment.id} />
      <div className="row">
        <input type="text" name="author" required={true} placeholder="Author" defaultValue={comment.author} />
      </div>
      <textarea name="body" defaultValue={comment.body} required={true}></textarea>
      <div className="comment-fn text-right">
        <button type="submit">Save</button>
        <button type="button" onClick={props.onCancel}>Cancel</button>
      </div>
    </form>
  )
}

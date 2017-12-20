import React from 'react';

export default function EditCommentForm(props) {
  return (
    <form className="comment-form" onSubmit={props.onSubmit}>
      <input type="hidden" name="id" defaultValue={props.id} />
      <textarea name="body" defaultValue={props.body}></textarea>
      <div className="comment-fn text-right">
        <button type="submit">Save</button>
        <button type="button" onClick={props.onCancel}>Cancel</button>
      </div>
    </form>
  )
}

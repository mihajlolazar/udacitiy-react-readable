import React from 'react';

export default function AddCommentForm(props) {
  return (
      <form className="comment-form comment-add-form" onSubmit={props.onSubmit}>
        {props.label && (
            <span className="label">{props.label}</span>
        )}

        <div className="row">
          <input type="text" name="author" required={true} placeholder="Author" defaultValue="" />
        </div>
        <textarea name="body" defaultValue="" required={true} placeholder="Post"></textarea>
        <div className="comment-fn text-right">
          <button type="submit">Submit</button>
        </div>
        {props.children}
      </form>
  )
}

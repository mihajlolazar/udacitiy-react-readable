import React from 'react';

export default function AddCommentForm(props) {
  return (
      <form className="comment-form comment-add-form" onSubmit={props.onSubmit}>
        {props.label && (
            <span className="label">{props.label}</span>
        )}
        <textarea name="body" defaultValue="" required={true}></textarea>
        <div className="comment-fn text-right">
          <button type="submit">Submit</button>
        </div>
        {props.children}
      </form>
  )
}

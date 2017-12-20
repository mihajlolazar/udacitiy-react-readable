import React from 'react';

export default function Vote(props) {
  const {upvoteFn,downvoteFn} = props;

  return (
      <div className="vote-box">
        <button type="button" onClick={upvoteFn}>Upvote</button>
        <button type="button" onClick={downvoteFn}>Downvote</button>
      </div>
  )
}

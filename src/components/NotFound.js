import React from 'react';
import { Link } from 'react-router-dom';

export const PostNotFound = () => (
    <div className="container page-404">
      <p>It seems like this post is deleted.</p>
      <p>Would you like to <Link to='/'>read some other posts</Link>?</p>
    </div>
);

export const PageNotFound = () => (
    <div className="container page-404">
      <p>The page you requested doesn't exist.</p>
      <p>Would you like to visit our <Link to='/'>Homepage</Link>?</p>
    </div>
);


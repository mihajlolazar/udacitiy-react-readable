import React          from 'react';
import * as sortType  from '../constants/sort'

export default function Sort(props) {
  return (
      <div className="sort-by">
        <span className="label">{props.label ? props.label : 'Sort by:'}</span>
        <select onChange={props.sortByFn}>
          <option value={sortType.SORT_BY_VOTES_DESC}>Votes (Better first)</option>
          <option value={sortType.SORT_BY_VOTES_ASC}>Votes (Worse first)</option>
          <option value={sortType.SORT_BY_CREATION_TIME_DESC}>Creation Time (Newer first)</option>
          <option value={sortType.SORT_BY_CREATION_TIME_ASC}>Creation Time (Older first)</option>
        </select>
      </div>
  )
}

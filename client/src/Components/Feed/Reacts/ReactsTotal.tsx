import React from 'react'

export const ReactsTotal = (props) => {
  return (
    <div className='reacts-total'>
      <div className='reacts-total-container'>
      <div className='reacts-plus'>+</div>
      <div>{props.total}</div>
    </div>
    </div>
  )
}
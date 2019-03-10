import React from 'react'

import '../../Styles/Creator.scss'

export const CreatorPanel = (props) => {
  if (props.docked) {
    return <div className='creator-panel'></div>
  }
  else return null
}
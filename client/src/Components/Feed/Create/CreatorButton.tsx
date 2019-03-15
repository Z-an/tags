import React from 'react'

import '../../../Styles/Creator.css'

import { ReactComponent as Twitter } from '../../../Assets/twitter.svg'

const CreatorButton = (props) => {
  if (props.docked) {
    return (
    <div className="circle">
      <div className="creator">
        <Twitter className='twitter'/>
      </div>
    </div>
    )
  }
  return (null)
}

export default CreatorButton
import React from 'react'
import {ReactComponent as Twitter} from '../../../Assets/twitter.svg'

const CreatorButton = (props) => (
  <div className='create-circle' onClick={() => props.toggle()}>
    <Twitter className='twitter'/>
  </div>
)

export default CreatorButton
import React from 'react'
import Emoji from './Emoji'

export const NewReact = (props) => {
  return (
<div className='react-notification'>
<img className= 'react-notification-icon' src={props.reactData.user.icon} alt={props.reactData.user.name}/>
<Emoji emoji={props.reactData.reactId} style={'react-notification-emoji'}/>
</div>
  )
}
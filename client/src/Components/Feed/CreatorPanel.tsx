import React from 'react'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';

import '../../Styles/Creator.scss'

const mapStateToProps = state => {
  return {user: state.user}
}

export const ConnectedCreatorPanel = (props) => {
  if (props.docked) {
    return (
      <div className='creator-panel'>
        <div className='creator-tag'>
          <img className='creator-user-icon' src={props.user.icon} alt={props.user.name}/>
          <TextField
            id="standard-with-placeholder"
            label=''
            placeholder="Share something new"
            className='text-field'
            margin="normal"
          />
        </div>
        <div className='post'>POST</div>
      </div>
    )
  }
  else return null
}

export const CreatorPanel = connect(mapStateToProps)(ConnectedCreatorPanel)
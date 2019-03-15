import React from 'react'
import { connect } from 'react-redux'
import { SUBMIT_TAG } from '../../../Mutations/index'
import { Mutation } from 'react-apollo'
import TextField from '@material-ui/core/TextField';

import '../../../Styles/Creator.css'

const mapStateToProps = state => {
  return {user: state.user,
          merchant: {id: state.merchant.id}}
}

export const ConnectedCreatorPanel = (props) => {

  const keyPress = (e) => {
    return(null)
  }

  if (props.docked) {
    return (
      <Mutation mutation={SUBMIT_TAG}>
      { createTag  => (
        <div className='creator-panel'>
          <div className='creator-tag'>
            <img className='creator-user-icon' src={props.user.icon} alt={'your face'}/>
            <TextField
              id="new-tag-input"
              label=''
              placeholder="Share something new"
              className='text-field'
              onKeyDown={keyPress}
              margin="normal"
              onChange={keyPress}
            />
          </div>
        <div className='post' onClick={() => createTag({variables: {userId: props.user.id, merchantId: props.merchant.id, content: document.getElementById("new-tag-input").value}})}>POST</div>
      </div>
      )}
    </Mutation>
    )
  }
  else return null
}

export const CreatorPanel = connect(mapStateToProps)(ConnectedCreatorPanel)
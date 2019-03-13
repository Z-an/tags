import React, {useState} from 'react'
import { connect } from 'react-redux'
import { SUBMIT_TAG } from '../../Mutations/index'
import { Mutation } from 'react-apollo'
import TextField from '@material-ui/core/TextField';

import '../../Styles/Creator.scss'
import { userInfo } from 'os';

const mapStateToProps = state => {
  return {user: state.user,
          merchant: {id: state.merchant.id}}
}

export const ConnectedCreatorPanel = (props) => {
  const[text,setText] = useState('')

  const keyPress = (e) => {
    setText(e.target.value)
  }

  if (props.docked) {
    return (
      <Mutation mutation={SUBMIT_TAG}>
      { createTag  => (
        <div className='creator-panel'>
          <div className='creator-tag'>
            <img className='creator-user-icon' src={props.user.icon} alt={props.user.name}/>
            <TextField
              id="standard-with-placeholder"
              label=''
              placeholder="Share something new"
              className='text-field'
              onKeyDown={keyPress}
              margin="normal"
            />
          </div>
        <div className='post' onClick={() => createTag({variables: {userId: props.user.id, merchantId: props.merchant.id, content: text}})}>POST</div>
      </div>
      )}
    </Mutation>
    )
  }
  else return null
}

export const CreatorPanel = connect(mapStateToProps)(ConnectedCreatorPanel)
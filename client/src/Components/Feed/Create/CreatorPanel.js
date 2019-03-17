import React, {useState} from 'react'
import { connect } from 'react-redux'
import { SUBMIT_TAG } from '../../../Mutations/index'
import { Mutation } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'
import TextField from '@material-ui/core/TextField';
import { ReactComponent as Twitter } from '../../../Assets/twitter.svg'

import '../../../Styles/Creator.css'

const mapStateToProps = state => {
  return {user: state.user,
          merchant: {id: state.merchant.id},
          openModal: state.openModal
        }
}


const CreatorButton = (props) => (
  <div className="circle">
    <div className="creator">
      <Twitter className='twitter'/>
    </div>
  </div>
)

export const ConnectedCreatorPanel = (props) => {
  const[open,setOpen] = useState(props.open)

  console.log('open',open)

  if (!open) {
    return <div className='creator-button' onClick={()=>setOpen(true)}><CreatorButton /></div>
  }

  else {
    if (props.openModal!==null) {setOpen(false)}
    return (
      <Mutation mutation={SUBMIT_TAG}>
      { createTag  => (
        <div className='creator-panel'>
          <div className='minimize'onClick={() => setOpen(false)}>Minimize</div>
          <div className='creator-tag'>
            <img className='creator-user-icon' src={props.user.icon} alt={'your face'}/>
            <TextField
              id="new-tag-input"
              label=''
              placeholder="Share something new"
              className='text-field'
              margin="normal"
              autoFocus
            />
          </div>
        <div className='post' onClick={() => (document.getElementById("new-tag-input").value !== '')? (
          createTag({variables: {userId: props.user.id, merchantId: props.merchant.id, content: document.getElementById("new-tag-input").value}}),setOpen(false)):null}>
            POST
        </div>
      </div>
      )}
    </Mutation>
    )
  }
}

export const CreatorPanel = connect(mapStateToProps)(ConnectedCreatorPanel)
import React, {useState} from 'react'
import { connect } from 'react-redux'
import { SUBMIT_TAG, ADD_MERCHANT } from '../../../Mutations/index'
import { Mutation } from 'react-apollo'
import TextField from '@material-ui/core/TextField';
import { ReactComponent as Twitter } from '../../../Assets/twitter.svg'
import Modal from 'react-awesome-modal'
import Button from '@material-ui/core/Button'

import '../../../Styles/Creator.css'

const mapStateToProps = (state,ownProps) => {
  if (!ownProps.merchants) 
  return {user: state.user,
          merchant: {id: state.merchant.id},
          openModal: state.openModal }
   else 
    return {user:state.user,
          openModal:state.openModal}
  
}

const CreatorButton = (props) => (
  <div className="circle">
    <div className="creator">
      <Twitter className='twitter'/>
    </div>
  </div>
)

export const ConnectedCreatorPanel = (props) => {
  const[open,setOpen] = useState(false)
  const merchants = props.merchants

  if (!open) {
    return <div className='creator-button' onClick={()=>setOpen(true)}><CreatorButton /></div>
  }

  else if (open && merchants) {
    return (
      <Modal className='merchant-modal' visible={open} width="350"  height="230px" effect="fadeInUp">
        <div className='close-modal'><Button onClick={()=> setOpen(false)}>Close</Button></div>
        <div className='creator-tag'>
        <h1>Add a new restaurant</h1>
        <Mutation mutation={merchants? ADD_MERCHANT:SUBMIT_TAG}>
      { createTag  => (
        <div className='creator-panel'>
          <div className='creator-tag'>
            <img className='creator-user-icon' src={props.user.icon} alt={'your face'}/>
            <TextField
              id="new-tag-input"
              label=''
              placeholder={merchants? 'Add a new restaurant':"Share something new"}
              className='text-field'
              margin="normal"
              autoFocus
            />
          </div>
        <div className='post' onClick={() => (document.getElementById("new-tag-input").value !== '')? (
          createTag({variables: merchants? {name: document.getElementById("new-tag-input").value}:{userId: props.user.id, merchantId: props.merchant.id, content: document.getElementById("new-tag-input").value}}),setOpen(false),window.scrollTo(0,0)):null}>
            POST
        </div>
      </div>
      )}
    </Mutation>
          </div>
      </Modal>
    )
  }
  
  else {
    if (props.openModal!==null && !merchants) {setOpen(false)}
    return (
      <Mutation mutation={merchants? ADD_MERCHANT:SUBMIT_TAG}>
      { createTag  => (
        <div className='creator-panel'>
          <div className='minimize'onClick={() => setOpen(false)}>Minimize</div>
          <div className='creator-tag'>
            <img className='creator-user-icon' src={props.user.icon} alt={'your face'}/>
            <TextField
              id="new-tag-input"
              label=''
              placeholder={merchants? 'Add a new restaurant':"Share something new"}
              className='text-field'
              margin="normal"
              autoFocus
            />
          </div>
        <div className='post' onClick={() => (document.getElementById("new-tag-input").value !== '')? (
          createTag({variables: merchants? {name: document.getElementById("new-tag-input").value}:{userId: props.user.id, merchantId: props.merchant.id, content: document.getElementById("new-tag-input").value}}),setOpen(false),window.scrollTo(0,0)):null}>
            POST
        </div>
      </div>
      )}
    </Mutation>
    )
  }
}

export const CreatorPanel = connect(mapStateToProps)(ConnectedCreatorPanel)
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Modal from 'react-responsive-modal'
import { SubmitButton } from './SubmitButton'

interface ISubmitTagProps {
  content: string,
  merchantID: number
}

const CreatorForm = (props) => {
  const [tagText, setText] = useState('')

  const keyPress = (e) => {
    setText(e.target.value)
  }

  return (
    <Modal open={props.open} 
      onClose={props.toggle}
      onOverlayClick={props.toggle}
      focusTrapped={true}
      center
    >
        <h1>Share something new!</h1>
        <div className='row'>
          <TextField
            id="new-tag-input"
            autoFocus={false}
            type="string"
            onKeyDown={keyPress}
            variant={"outlined"}
          />
          <SubmitButton tag={tagText}
                      toggle={props.toggle}
                      merchantID={props.merchantID}
          />
        </div>
    </Modal>
  )
}

export default CreatorForm
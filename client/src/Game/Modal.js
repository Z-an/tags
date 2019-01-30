import React from 'react';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-responsive-modal'

function Creator (props) {
  const open = props.open

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      props.adder(e.target.value)
      document.getElementById("new-tag-input").value = ""
      props.toggler()
      window.scrollTo(0, 0)
    }
  }

    if (open) {
    return(
      <div>
        <Modal open={open} onClose={props.toggler}
                onOverlayClick={props.toggler} focusTrapped={true}
                center>
            <h1>Share something new!</h1>
            <TextField
            id="new-tag-input"
              autoFocus='false'
              type="string"
              onKeyDown={keyPress}
              variant={"outlined"}
              placeholder={props.placeholder}
            />
        </Modal>
      </div>
    )
  } else return(<div></div>)
}

export default Creator

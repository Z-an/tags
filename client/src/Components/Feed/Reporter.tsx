import React, { useState } from 'react'
import Modal from 'react-awesome-modal'
import { useMutation } from 'react-apollo-hooks'
import { REPORT } from '../../Mutations'
import { connect } from 'react-redux'
import { openModal } from '../../Actions'

const mapStateToProps = (state) => {
  let open = false
  if (state.openModal!==null) {
    open = state.openModal.type==='report'? true:false
    console.log('open reporter',open)
    return {open: open, tag: state.tags[state.openModal.tagID], userID: state.user.id}
  } 
  else return ( {open: false, tag: {id: ''}, userID: null})
}

function mapDispatchToProps(dispatch) {
  return { openModal: payload => { dispatch(openModal(payload)) }}
}
export const ConnectedReporter = (props) => {

  const[report,setReport] = useState('')

  const sendReport = useMutation(REPORT, {variables: { userId: "61usaCJd3YBqpmFOdbS8"
                                                      , tagId: props.tag.id
                                                      , reportId: report } })
  
  const clickhandler = (report) => {
      props.openModal(null)
      sendReport()
  }

  if (props.open) {
    return (
      <Modal visible={open} width="350" height="200" effect="fadeInUp" onClickOutside={()=>props.openModal(null)}>
        <div className='report-select'>
            <div className='this-is'>"{props.tag.content}" is... </div>
            <div className='cause-container'>
                <div className='cause' onClick={() => clickhandler('abuse')}>abusive</div>
                <div className='cause' onClick={() => clickhandler('inaccuracy')}>inaccurate</div>
                <div className='cause' onClick={() => clickhandler('duplicacy')}>a duplicate</div>
            </div>
            <div className='none' onClick={() => props.openModal(null)}>none of the above</div>
        </div>
      </Modal>
    )
  } else return null
}

  export const Reporter = connect(mapStateToProps,mapDispatchToProps)(ConnectedReporter)
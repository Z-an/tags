import React, {useState, Fragment} from 'react'
import { connect } from 'react-redux'
import '../../../Styles/TagView.css'
import Modal from 'react-awesome-modal'
import Emoji from '../Reacts/Emoji'
import { openModal } from '../../../Actions/index'
import { updateReactors } from '../../../Actions'
import ReactorUpdate from './ReactorUpdate'

import Button from '@material-ui/core/Button'
import { ReactorsList } from './ReactorsList'

const mapStateToProps = (state) => {
  if (state.openModal===null) {return { open: false } } 
  else {
  const tagID = state.openModal.tagID
  const open = (state.openModal.type==='tagview' && state.openModal.tagID===tagID)
  return {open: open
        , tag: {id: tagID, content: state.tags[tagID].content, user: state.tags[tagID].user, reacts: state.tags[tagID].reacts}
        , emojis: ['tongue','heart-eyes','shock','sleep','cry','angry','comment']}
  }
}

function mapDispatchToProps(dispatch) {
  return { openModal: payload => { dispatch(openModal(payload))}
        , updateReactors: payload => dispatch(updateReactors(payload))}
}

const ConnectedTagView = (props) => {
  const open = props.open
  const[view,setView] = useState('cry')
  
  if (open) {
    const emojis = props.emojis
    const tag = props.tag

    return (
      <Fragment>
        <ReactorUpdate tagID={tag.id} updater={props.updateReactors}/>

        <Modal visible={open} width="340" height="500" effect="fadeInUp">
          <div className='modal-container'>
            <div className='top'>
              <div className='header'>
                <img className='image' src={tag.user.icon} alt={tag.user.name}/>
                <div className='user'>
                  <div className='handle'>@{'handle' || tag.user.handle}</div>
                  <div className='name'>{ tag.user.name } says...</div>
                </div>
              </div>
              <div className='close-modal'>
                <Button onClick={()=>props.openModal(null)}>close</Button>
              </div>
            </div>
            <div className='content'>{tag.content}</div>
            <div className='summary'>
              <div className='total-reacts'>+{tag.reacts}</div>
              <div className='total-reacts'>date/time</div>
              <div className='reactor-summary'></div>
            </div>
            <div className='emoji-panel'>
              { emojis.map( view =>
                <div className='emoji-button' onClick={()=>setView(view)}><Emoji emoji={view} style={'emoji-button'}/></div>
              )}
            </div>
            <ReactorsList tag={tag} view={view} tagID={tag.id}/>
          </div>
        </Modal>
        )}
      </Fragment>
    )
  }
  else return null
}

export const TagView = connect(mapStateToProps,mapDispatchToProps)(ConnectedTagView)
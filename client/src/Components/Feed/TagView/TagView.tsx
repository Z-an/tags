import React, {useState, Fragment} from 'react'
import { connect } from 'react-redux'
import '../../../Styles/TagView.css'
import Modal from 'react-awesome-modal'
import Emoji from '../Reacts/Emoji'
import { openModal } from '../../../Actions/index'
import { updateReactors } from '../../../Actions'
import { timeSince } from './timeSince'
import ReporterButton from '../Report/ReporterButton'

import Button from '@material-ui/core/Button'
import { ReactorsList } from './ReactorsList'
import { UsersCarousel } from '../Tag/UsersCarousel'

const mapStateToProps = (state) => {
  if (state.openModal===null) {return { open: false } } 
  else {
  const tagID = state.openModal.tagID
  const open = (state.openModal.type==='tagview' && state.openModal.tagID===tagID)
  const emojis = ['angry','cry','shock','heart-eyes','tongue','fire','comment']
  const reactors = state.tags[tagID].recentReactors
  let emojiTotals = emojis.map( emoji => { return {emoji: emoji, total: reactors.filter(react => emoji===react.reactId).length }} )
  console.log(emojiTotals)
  return {open: open
        , tag: {id: tagID, content: state.tags[tagID].content, user: state.tags[tagID].user, reacts: state.tags[tagID].reacts}
        , emojis: emojiTotals }
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
        <Modal visible={open} width="350" height="600" effect="fadeInUp">
          <div className='modal-container'>
            <div className='top'>
              <div className='header'>
                <img className='image' src={tag.user.icon} alt={tag.user.name}/>
                <div className='user'>
                  <div className='name'>{ tag.user.name }</div>
                  <div className='handle'>@{'handle' || tag.user.handle}</div>
                </div>
              </div>
              <div className='close-modal'>
                <Button onClick={()=>props.openModal(null)}>back</Button>
              </div>
            </div>
            <div className='content'>{tag.content}</div>
            <div className='summary'>
              <div className='total-reacts'>date/time</div>
              <div className='total-reacts'>{tag.reacts} reacts</div>
              <div className='tag-reactors'>
                <UsersCarousel tagID={tag.id} style={'tag-view-reactor-icon'} tagView={true}/>
              </div>
            </div>
            <div className='emoji-panel'>
              { emojis.map( view =>
                <div className='emoji-button' onClick={()=>setView(view.emoji)}><Emoji emoji={view.emoji} style={'emoji-button'}/><div className='emoji-total'>{view.total}</div></div>
              )}
            </div>
            <ReactorsList tag={tag} view={view} tagID={tag.id}/>
            <ReporterButton tagID={tag.id} toggleModal={props.openModal}/>
            <Button onClick={()=>props.openModal(null)}>back</Button>
          </div>
        </Modal>
        )}
      </Fragment>
    )
  }
  else return null
}

export const TagView = connect(mapStateToProps,mapDispatchToProps)(ConnectedTagView)
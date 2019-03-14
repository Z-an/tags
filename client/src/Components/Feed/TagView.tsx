import React, {useState, Fragment} from 'react'
import { connect } from 'react-redux'
import '../../Styles/TagView.scss'
import Modal from 'react-awesome-modal'
import Emoji from './Reacts/Emoji'
import { openModal } from '../../Actions/index'
import { GET_USER } from '../../Queries/index'
import { Query } from 'react-apollo'
import Loading from '../Loading'
import Button from '@material-ui/core/Button'
import { ReactorsList } from './ReactorsList'


const mapStateToProps = (state) => {
  console.log(state.openModal==='tagview')
  if (state.openModal===null) { 
    return { open: false }
  } 
  else {
  const tagID = state.openModal.tagID
  return {open: state.openModal.type==='tagview'? true:false
        , tag: state.tags[tagID]
        , emojis: ['up','tongue','heart-eyes','shock','sleep','cry','angry']}
  }
}

function mapDispatchToProps(dispatch) {
  return { openModal: payload => { dispatch(openModal(payload))}}
}

const ConnectedTagView = (props) => {
  const open = props.open
  const[view,setView] = useState('cry')
  
  if (open) {
    const emojis = props.emojis
    const tag = props.tag
    return (
      <Modal visible={open} width="350" height="500" effect="fadeInUp" onClickOutside={()=>props.openModal(null)}>
        <div className='modal-container'>
          <div className='close-modal'>
            <Button onClick={()=>props.openModal(null)}>X</Button>
          </div>
          <div className='header'>
            <img className='image' src={tag.user.icon} alt={tag.user.name}/>
            <div className='content'>{tag.content}</div>
          </div>
          <div className='users-who'>Users who responded with {view}</div>

          <div className='emoji-panel'>
            { emojis.map( view =>
              <Button onClick={() => setView(view)}><Emoji emoji={view} style={'emoji-button'}/></Button>
            )}
          </div>
          <ReactorsList tag={tag} view={view} />
          </div>
      </Modal>
    )
  }
  else return null
}

export const TagView = connect(mapStateToProps,mapDispatchToProps)(ConnectedTagView)
import React, {useState} from 'react'
import { connect } from 'react-redux'
import '../../Styles/TagView.scss'
import Modal from 'react-awesome-modal'
import Emoji from './Reacts/Emoji'
import { openModal } from '../../Actions/index'
import { GET_USER } from '../../Queries/index'
import { Query } from 'react-apollo'
import Loading from '../Loading'
import Button from '@material-ui/core/Button'


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
  const emojis = props.emojis
  const[view,setView] = useState('up')
  if (open) {
    const emojis = props.emojis
    const tag = props.tag
    return (
      <Modal visible={open} width="350" height="500" effect="fadeInUp" onClickOutside={()=>props.openModal(null)}>
        <div className='modal-container'>
          <div className='close-modal'>
            <Button>X</Button>
          </div>
          <div className='header'>
            <img className='image' src={tag.user.icon} alt={tag.user.name}/>
            <div className='content'>{tag.content}</div>
          </div>
          <div className='emoji-panel'>
            { emojis.map( view =>
              <Button><Emoji emoji={view} style={'emoji-button'} onClick={() => setView(view)}/></Button>
            )}
          </div>
          <div className='users-who'>Users who responded with {view}</div>
          <div className='reactors-container'>
              <div className='reactor'>
                { tag.reactors.map( reactDoc => {
                  if (reactDoc.react===view){ reactDoc.reactors.map( userID => (
                    <Query query={GET_USER} variables={{id: userID}}>
                      {({ loading, error, data}) => {
                        if (loading) {return <Loading />}
                        else if (error) {return null}
                        else {
                        <div>
                        <img className='reactor-image' src={data.user.icon} alt={data.user.name}/>
                        <div className='name'>{tag.content}</div> 
                        </div>
                      }}}
                    </Query>
                  ))}
                })}
              </div>
          </div>
          </div>
      </Modal>
    )
  }
  else return null
}

export const TagView = connect(mapStateToProps,mapDispatchToProps)(ConnectedTagView)
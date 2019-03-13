import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useMutation } from 'react-apollo-hooks'
import { REACT } from '../../../Mutations/index'

import '../../../Styles/Reactor.scss'

const mapStateToProps = (state,ownProps) => {
    const userID = state.user.id
    let reacts = state.tags[ownProps.tagID].reactors.map( doc => doc.reactors.includes(state.user.id))
    const voted = reacts.includes(true)
    return { voted: voted
            , userID: state.user.id
            , tagID: ownProps.tagID
            , merchantID: state.merchant.id }
}

const ConnectedVoter = (props) => {
    const[voted,setVoted] = useState(props.voted)
    const style = voted? 'voted':'voter'

    const toggleVote = useMutation(REACT, {variables: { userId: props.userID
        , merchantId: props.merchantID
        , tagId: props.tagID
        , reactId: 'up'
        , unreact: voted }})

    return (

        <div className={style} onClick={()=> voted? props.decrement(props.tagID):props.increment(props.tagID)}>
            <div onClick={()=>setVoted(!voted)}>
                <div onClick={()=>toggleVote()}>
                    ⬆
                </div>
            </div>
        </div>
    )
}

export const Voter = connect(mapStateToProps)(ConnectedVoter)
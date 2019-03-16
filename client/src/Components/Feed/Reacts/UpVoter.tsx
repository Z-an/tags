import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useMutation } from 'react-apollo-hooks'
import { REACT } from '../../../Mutations/index'
import Emoji from './Emoji'
import {increment,decrement} from '../../..//Actions/index'

import '../../../Styles/Reactor.css'

const mapStateToProps = (state,ownProps) => {
    const userID = state.user.id
    let reacts = state.tags[ownProps.tagID].reactors.map( doc => doc.reactors.includes(state.user.id) )
    const voted = reacts.includes(true)
    return { voted: voted
            , userID: state.user.id
            , tagID: ownProps.tagID
            , merchant: state.merchant }
}

function mapDispatchToProps(dispatch) {
    return { increment: tagID => { dispatch(increment(tagID))}
            , decrement: tagID => { dispatch(decrement(tagID))} }
}

const ConnectedVoter = (props) => {
    const[voted,setVoted] = useState(props.voted)
    const style = voted? 'voted':'voter'

    const actionProps = {tagID: props.tagID, age: props.merchant.age, rho: props.merchant.rho}

    const toggleVote = useMutation(REACT, {variables: { userId: props.userID
        , merchantId: props.merchantID
        , tagId: props.tagID
        , reactId: 'up'
        , unreact: voted }})

    return (
        <div className={style} onClick={()=> voted? props.decrement(actionProps):props.increment(actionProps)}>
            <div onClick={()=>setVoted(!voted)}>
                <div onClick={()=>toggleVote()}>
                    <Emoji emoji={'up'} style={'up-emoji'} onClick={()=> voted? props.decrement(actionProps):props.increment(actionProps)}/>
                </div>
            </div>
        </div>
    )
}

export const Voter = connect(mapStateToProps, mapDispatchToProps)(ConnectedVoter)
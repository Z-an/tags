import React, { useState, Fragment, PureComponent } from 'react'
import { useQuery, useSubscription } from 'react-apollo-hooks'
import Tag from './Tag'
import { GET_TAGS } from '../../Queries/index'
import { TAG_SUBSCRIPTION } from '../../Subscriptions'
import Loading from '../Loading'
import { Waypoint } from 'react-waypoint';
import { TagListener } from './Tag/TagListener'

import { connect } from 'react-redux'
import { addTags, newTag } from '../../Actions/index'

const compare = (a, b) => {
  const ucbA = a.ucb===null? 1000:a.ucb
  const ucbB = b.ucb===null? 1000:b.ucb

  let comparison = 0;
  if (ucbA > ucbB) {
    comparison = -1;
  } else {
    comparison = 1;
  } return comparison

}

function orderByUCB(hashMap,ucb) {
  if (ucb) {
  let values = Object.values(hashMap)
  return values.sort(compare)
  }
  return null
}

const mapStateToProps = state => {
  let ordered = orderByUCB(state.tags,state.ucb)
  return { merchant: state.merchant, tags: ordered, live: state.live }
}

function mapDispatchToProps(dispatch) {
  return { addTags: tags => dispatch(addTags(tags))
        , newTag: tag => dispatch(newTag(tag)) }
}

const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6']



const ConnectedWall = (props) => {
  const [initialized,init] = useState(false)
  const [moreToGet,reachedEnd] = useState(false)

  const { data, error, loading, fetchMore } = useQuery(GET_TAGS, {variables: {id: props.merchant.id}, pollInterval: props.live?1000:0})
    if (error) { console.log(`Error! ${error.message}`)
    } else if (loading) {
      return <div className='init-loading-container'><Loading style={'wall-loading'}/></div>
    } else if (!initialized) {init(true),props.addTags(data.merchantTags)}

  console.log(data.merchantTags)
  return (
    <Fragment>
      {data.merchantTags.map((tag: any) => 
        <Tag tagID={tag.id} total={tag.reacts} content={tag.content} key={tag.id} color={colors[Math.floor(Math.random() * colors.length)]}/>
      )}
      { moreToGet && 
        <div onClick={() => fetchMore({ variables: {id: props.merchant.id}, 
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return previousResult }
            return {
              ...previousResult,
              merchantTags: {
                ...previousResult.merchantTags,
                ...fetchMoreResult.merchantTags,
              }
            }
          }
        })}>
          <Waypoint onEnter={() => reachedEnd(true)} onLeave={() => reachedEnd(false)}>
            <div className='loading-container'>
              <Loading style={'wall-loading'}/>
            </div>
          </Waypoint>
        </div> }
      <TagListener merchantID={props.merchant.id}/>
    </Fragment> 
  )
}

const Wall = connect(mapStateToProps, mapDispatchToProps)(ConnectedWall)

export default Wall
import React, { useState, Fragment, PureComponent } from 'react'
import { useQuery } from 'react-apollo-hooks'
import Tag from './Tag'
import { GET_TAGS } from '../../Queries'
import Loading from '../Loading'

import { connect } from 'react-redux'
import { addTags } from '../../Actions/index'

const compare = (a, b) => {
  const ucbA = a.ucb
  const ucbB = b.ucb

  let comparison = 0;
  if (ucbA > ucbB) {
    comparison = -1;
  } else {
    comparison = 1;
  } return comparison
}

function orderByRank(hashMap,ucb) {
  if (ucb) {
  let values = Object.values(hashMap)
  return values.sort(compare)
  }
  return null
}

const mapStateToProps = state => {
  let ordered = orderByRank(state.tags,state.ucb)
  return { merchant: state.merchant, tags: ordered}
}

function mapDispatchToProps(dispatch) {
  return { addTags: tags => dispatch(addTags(tags)) }
}

const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6']

const ConnectedWall: React.FC<any> = (props) => {
  const [initialized,init] = useState(false)

  const nullify = addTags({})

  const { data, error, loading } = useQuery(GET_TAGS, {variables: {id: props.merchant.id}})
    if (error) {
      return `Error! ${error.message}`
    } else if (loading) {
      return <div className='loading-container'><Loading style={'wall-loading'}/></div>
    } else if (!initialized) {init(true),props.addTags(data.merchantTags)}


  return (
      props.tags.map((tag: any) => 
        <Tag tagID={tag.id} content={tag.content} key={tag.id} color={colors[Math.floor(Math.random() * colors.length)]}/>
      )
  )
}

const Wall = connect(mapStateToProps, mapDispatchToProps)(ConnectedWall)

export default Wall
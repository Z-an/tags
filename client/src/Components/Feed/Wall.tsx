import React, { useState, Fragment } from 'react'
import { Query, Subscription } from 'react-apollo'
import Tag from './Tag'
import { GET_TAGS, TAG_SUBSCRIPTION } from '../Queries'

import '../Styles/Feed.scss'

const Wall = (props) => {
  const [tags, setTags] = useState([])
  const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];

  return (
    <Fragment>
      <div className='popular'>What's popular</div>
      <div className="wall">
          
        <Subscription 
          subscription={TAG_SUBSCRIPTION}
          variables={{merchantId: props.id}}
          shouldResubscribe={true}>
          {({data, loading }) => {
            if (!loading) return (<Tag tag={data.tagCreated} key={data.tagCreated.id} merchant={props.id} color={colors[Math.floor(Math.random() * colors.length)]}/>)
            else return (null)
          }}
        </Subscription>
        <Query query={GET_TAGS} variables={{id: props.id}} pollInterval={10000}>
          {({ loading, error, data}) => { 
            if (loading) return null
            else if (error) return `Error! ${error.message}`
            else if (data.merchantTags===[]) return 'Be the first to say something!'
            setTags(data.merchantTags)
          return (
          <div>{ tags.map((tag: any) => <Tag tag={tag} key={tag.id} merchant={props.id} color={colors[Math.floor(Math.random() * colors.length)]}/>) }</div>
          )
          }}
        </Query>
      </div>
    </Fragment>
    )
}


export default Wall
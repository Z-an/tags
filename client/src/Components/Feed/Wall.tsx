import React, { useState, Fragment, PureComponent } from 'react'
import { Query, Subscription } from 'react-apollo'
import Tag from './Tag'
import { GET_TAGS, TAG_SUBSCRIPTION } from '../../Queries'

import { connect } from 'react-redux'
import { addTag } from '../../Actions/index'

const mapStateToProps = state => {
  return { merchant: state.merchant,
          tags: state.tags }
}

function mapDispatchToProps(dispatch) {
  addTag: tags => dispatch(addTag(tags))
}

const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6']

class ConnectedWall extends PureComponent<any> {
  render() {
    console.log(this.props.merchant)
    return (
      <div className="wall">    
        <Subscription 
          subscription={TAG_SUBSCRIPTION}
          variables={{merchantId: this.props.merchant.id}}
          shouldResubscribe={true}>
          {({data, loading, error }) => {
            if (loading) return (<div>Loading...</div>)
            else if (error) return (`Error! ${error.message}`)
            else return (
              <Tag tag={data.tagCreated} key={data.tagCreated.id} color={colors[Math.floor(Math.random() * colors.length)]}/>
            )
          }}
        </Subscription>
        <Query query={GET_TAGS} variables={{id: this.props.merchant.id}} pollInterval={10000}>
          {({ loading, error, data}) => { 
            if (loading) return null
            else if (error) return `Error! ${error.message}`
            else if (data.merchantTags===[]) return 'Be the first to say something!'
            addTag(data.merchantTags)
          return (
          <div>{ this.props.tags.map((tag: any) => <Tag tag={tag} key={tag.id} color={colors[Math.floor(Math.random() * colors.length)]}/>) }</div>
          )
          }}
        </Query>
      </div>
    )
  }
}

const Wall = connect(mapStateToProps)(ConnectedWall)

export default Wall
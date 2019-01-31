import React, { Component } from "react"
//import { ReactComponent as Smile} from './assets2/tongue2.svg'
import Engager from './Engager.js'
import {UnmountClosed as Collapse} from 'react-collapse'
import Button from "@material-ui/core/Button"
import Tag from './Tag'

import "./Wall.css"
const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6']

class Wall extends Component {
  state = {
    reacts: []
  }

  render() {
    return (
    <div className="container">
      {this.props.tags.map(tag =>
      <div>
        <div className="wall-row">
        <Tag handle={tag.creatorHandle}
             icon={tag.creatorIcon}
             content={tag.content}
             key={tag.id}
             userId={this.props.userId}
             merchantId={this.props.merchantId}
             tagId={tag.id}
             expanded={this.props.expanded}
             expander={this.props.expander}
             color={colors[Math.floor(Math.random() * colors.length)]}/>
         </div>
         <div className="icons-box">
           <img className="icon" src = {tag.creatorIcon} alt={tag.creatorName}/>
        </div>
      </div>)}
    </div>
  )}
}

export default Wall;

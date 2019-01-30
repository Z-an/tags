import React from "react"
//import { ReactComponent as Smile} from './assets2/tongue2.svg'
import Engager from './Engager.js'
import {UnmountClosed as Collapse} from 'react-collapse'
//import Button from "@material-ui/core/Button"

import "./Wall.css"

function Wall (props) {
  return (
    <div className="container">
      {props.tags.map(tag => <Tag handle={tag.creatorHandle}
                                       icon={tag.creatorIcon}
                                       content={tag.content}
                                       key={tag.id}
                                       userId={props.userId}
                                       merchantId={props.merchantId}
                                       voter={props.voter}
                                       tagId={tag.id}
                                       expanded={props.expanded}
                                       expander={props.expander}/> )}
    </div>
  )
}

function Tag (props) {
  var colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];
  var random_color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div>
        <div className={"tag col-center background " + random_color}>
          <img src = {props.icon} alt={props.handle}/>
          <span><font>{props.content}</font></span>
          <div onClick={() => props.expander(props.tagId)}>
            {"⤽"||"⥅"||"⥆"}
          </div>
        </div>
      <Collapse isOpened={props.expanded===props.tagId}>
        <Engager
          tagId={props.tagId}
          tagContent={props.content}
          voter={props.voter}
          merchantId={props.merchantId}
          userId={props.userId}/>
      </Collapse>
    </div>
  )
};

export default Wall;

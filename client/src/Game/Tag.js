import React from "react"
import { ReactComponent as Heart} from './assets2/stars.svg'
import Engager from './Engager.js'
import {UnmountClosed as Collapse} from 'react-collapse'

import "./Wall.css"

function Tag (props) {
  var colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];
  var random_color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div>
        <div className={"tag col-center background " + random_color}>
          <img src = {props.icon} alt={props.handle}/>
          <span onClick={() => props.expander(props.tagId)}><font>{props.content}</font></span>
          <div className="btn" onClick={() => props.expander(props.tagId)}>
            <Heart/>
          </div>
          <div>{props.treacts}</div>
        </div>
      <Collapse isOpened={props.expanded===props.tagId}>
        <Engager
          tagId={props.tagId}
          tagContent={props.content}
          voter={props.voter}
          merchantId={props.merchantId}
          userId={props.userId}
          tokens={props.tokens}/>
      </Collapse>
    </div>
  )
};

export default Tag;

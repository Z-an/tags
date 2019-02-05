import React, { Component } from 'react';
import Reactors from "./Reactors.js"
import {UnmountClosed as Collapse} from 'react-collapse'

import { ReactComponent as Cool } from './assets2/cool.svg'
import { ReactComponent as Tongue } from './assets2/tongue.svg'
import { ReactComponent as Cry } from './assets2/crying.svg'
import { ReactComponent as Sleepy } from './assets2/sleepy.svg'
import { ReactComponent as Surprised } from './assets2/surprised.svg'
import { ReactComponent as Love } from './assets2/in-love.svg'
import { ReactComponent as Angry} from './assets2/angry.svg'

import './Engager.css'
import getFirebaseData from "./getData"

class Engager extends Component {
  state = {
    merchantId: this.props.merchantId,
    userId: this.props.userId,
    tagId: this.props.tagId,
    tagContent: this.props.tagContent,
    open: false,
    reacts: false,
    reactorView: null,
    openReactors: null,
    reactorDesc: null,
    tokens: this.props.tokens,

      angry: 0,
      cry: 0,
      shocked: 0,
      sleep: 0,
      tongue: 0,
      cool: 0,
      love: 0,
  }

  toggleSeeMore() {
    this.setState(prevState => ({open: !prevState.open}))
  }

  toggleReport() {
    this.setState(prevState => ({report: !prevState.report}))
  }

  async componentDidMount() {
    await getFirebaseData("/getReacts/"+this.state.merchantId+"/"+this.state.tagId)
      .then(user => user.json())
      .then(val => this.setState({reacts: val}))
  }

  aggregator = (arr) => {
    console.log(arr)
    var map = arr.reduce(function(prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {})
    return map
  }

  showReactors = (props) => {
    console.log(props)
    if (!this.state.reactorView===props.react) {
      this.setState({open: false})

    } else if (this.state.open && !(this.state.reactorView===props.react)) {
      const agg = this.aggregator(props.openReactors)
      this.setState({reactorView: props.react
                    ,openReactors: agg
                    ,reactorDesc: props.descriptor
                    ,content: this.state.tagContent})
    } else {
      const agg = this.aggregator(props.openReactors)
      this.setState({open: true
                    ,reactorView: props.react
                    ,openReactors: agg
                    ,reactorDesc: props.descriptor
                    ,content: this.state.tagContent})
    }
  }

  reactor = (react) => {
    if (this.state.tokens === 0) {return null}
    this.props.voter({ userId: this.props.userId,
                       tagId: this.props.tagId,
                       vote: react,
                       merchantId: this.props.merchantId })

    if      (react==="angry")   {this.setState({angry: this.state.angry+1})}
    else if (react==="cry")     {this.setState({cry: this.state.cry+1})}
    else if (react==="sleep")   {this.setState({sleep: this.state.sleep+1})}
    else if (react==="shocked") {this.setState({shocked: this.state.shocked+1})}
    else if (react==="tongue")  {this.setState({tongue: this.state.tongue+1})}
    else if (react==="cool")    {this.setState({cool: this.state.cool+1})}
    else if (react==="love")    {this.setState({love: this.state.love+1})}
    this.setState({tokens: this.state.tokens-1})
  }

  render() {
    console.log(this.state)
    if (this.state.reacts) {
        return (
          <div>
          <div className="dropdown">
            <div className="total-box">
              <div className="total"
                  onClick={func => this.showReactors(
                    { openReactors: this.state.reacts.angry.ids
                    , descriptor: "aggrieved by"
                    , react: "angry"})}
              >{this.state.reacts.angry.total + this.state.angry}
            </div>
              <div className="total"
                  onClick={func => this.showReactors(
                    { openReactors: this.state.reacts.cry.ids
                    , descriptor: "saddened by"
                    , react: "cry"})}
              >{this.state.reacts.cry.total + this.state.cry}
            </div>
              <div className="total"
                  onClick={func => this.showReactors(
                    { openReactors: this.state.reacts.sleep.ids
                    , descriptor: "sent to sleep by"
                    , react: "sleep"})}
                >{this.state.reacts.sleep.total + this.state.sleep}
            </div>
              <div className="total"
                  onClick={func => this.showReactors(
                    { openReactors: this.state.reacts.shocked.ids
                    , descriptor: "shocked by"
                    , react: "shocked"})}
              >{this.state.reacts.shocked.total + this.state.shocked}
            </div>
              <div className="total"
                 onClick={func => this.showReactors(
                   { openReactors: this.state.reacts.tongue.ids
                   , descriptor: "who tongued"
                   , react: "tongue"})}
              >{this.state.reacts.tongue.total + this.state.tongue}
            </div>
              <div className="total"
                  onClick={func => this.showReactors(
                    { openReactors: this.state.reacts.cool.ids
                    , descriptor: "who cool guy'd"
                    , react: "cool"})}
              >{this.state.reacts.cool.total + this.state.cool}
            </div>
              <div className="total"
                    onClick={func => this.showReactors(
                      { openReactors: this.state.reacts.love.ids
                      , descriptor: "with heart eyes for"
                      , react: "love"})}
                >{this.state.reacts.love.total + this.state.love}
              </div>
            </div>
            <div className='emojis'>
              <div className='emoji'>
                <Angry onClick={func => this.reactor('angry')}/>
              </div>
              <div className='emoji'>
                <Cry onClick={func => this.reactor('cry')}/>
              </div>
              <div className='emoji'>
                <Sleepy onClick={func => this.reactor('sleep')}/>
              </div>
              <div className='emoji'>
                <Surprised onClick={func => this.reactor('shocked')}/>
              </div>
              <div className='emoji'>
                <Tongue onClick={func => this.reactor('tongue')}/>
              </div>

              <div className='emoji'>
                <Cool onClick={func => this.reactor('cool')}/>
              </div>
              <div className='emoji'>
                <Love onClick={func => this.reactor('love')}/>
              </div>
              </div>

        <br></br><div className="tokens">{this.props.tokens} actions left</div>
        </div>
        <Collapse isOpened={this.state.open} hasNestedCollapse={true}>
          <Reactors
            reactors={this.state.openReactors}
            react={this.state.reactorDesc}
            content={this.state.tagContent}
          />
        </Collapse>
      </div>
      )
    } else return (
      <div className="dropdown">
        <div className="emojis">
        </div>
      </div>
  )
  }
}

export default Engager

import React, { Component } from 'react'
import getFirebaseData from './getData'
import Emoji from './Emoji'

import './Wall.css'

class Tag extends Component {
  state = {
    reacts: []
  }

  async componentDidMount() {
    console.log('why the fuck arent you firing')
    await getFirebaseData("/getReacts/"+this.props.merchantId+"/"+this.props.tagId)
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

  reactor = (react) => {
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
  }


  render() {
    console.log(this.state)
    if (this.state.reacts===[]) {return (<p>...</p>)}
    else{
    return (
      <div>
        <div className={"speech-bubble " + this.props.color}>
          <p onClick={() => this.props.expander(this.props.tagId)}>{this.props.content}</p>
        </div>
        <div className="emoji-box">
          <div className="emoji"><Emoji emoji="angry" reactor={this.reactor}/></div>
          <div className="emoji"><Emoji emoji="tongue" reactor={this.reactor}/></div>
          <div className="emoji" ><Emoji emoji="love" reactor={this.reactor}/></div>
        </div>
      </div>
    )
  }
}
};

export default Tag

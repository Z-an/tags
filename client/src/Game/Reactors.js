import React, { Component } from 'react'
import './Reactors.css'
import getFirebaseData from "./getData"


function Reactors (props) {

  if (props.reactors) {
    return(
    <div>
      <div className="descriptor">
        Users {props.react || "..."}
        <div className="cont">"{props.content}"</div>
      </div>
      <div className="reactors-container">
            {Object.keys(props.reactors).map(r =>
              <Reactor id={r}
                       key={r}
                       react={props.react}
                       content={props.content}
                       total={props.reactors[r]}/> )}
      </div>
    </div>
    )
  } else {
    return(
      <div>blah</div>
    )
  }
}

class Reactor extends Component {
  state = {
    user: false
  }

  async componentDidMount() {
    getFirebaseData("/user/"+this.props.id)
      .then(data => data.json())
      .then(val => this.setState({user: val}))
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.user) {
      return (
        <div></div>
      )
    } else {
      return (
        <div>
          <div className="reactors-container">
            <div className="reactor">
              <img className='react-photo'
                   src={this.state.user.icon}
                   alt={this.state.user.name}
                   onClick={() => alert(this.state.user.name)}/>
              <div className="total-react">
                +{this.props.total}
              </div>
            </div>
          </div>
        </div>
    )}
  }
}

export default Reactors

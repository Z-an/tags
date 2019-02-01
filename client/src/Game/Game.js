import React, { Component } from 'react';
import Tag from './Tag.js'
import Button from '@material-ui/core/Button'
import getFirebaseData from "./getData"
import Headroom from 'react-headroom'
//import {PieChart, Pie, Tooltip, Cell, Label} from 'recharts'
import './Game.css'
//import CountUp from 'react-countup'
import ScrollToTop from 'react-scroll-up'
import { ReactComponent as Twitter} from './assets2/twitter.svg'
import Modal from "./Modal"

//const COLORS = ['#ff4868', '#D6498D', '#645896']

class Game extends Component {
  state = {
    userId: this.props.match.params.userId,
    user: [],
    tags: [],
    merchant: {id: this.props.match.params.merchantId,
               name: this.props.match.params.merchantName},
    score: 0,
    prior: 0,
    modal: false,
    expanded: null,
    tokens: 20,
}

  async componentDidMount() {
    console.log("firing user in CDM")
    getFirebaseData("/user/"+this.state.userId)
    .then(user => user.json())
    .then(val => this.setState({user: val}))
    .catch(err => console.log(err))

    getFirebaseData("/tags/"+this.state.merchant.id)
      .then(tags => tags.json())
      .then(val => this.setState({tags: val.sort(this.compare)}))
      .catch(err => console.log(err))
  }

  async onRefresh() {
    getFirebaseData("/tags/"+this.state.merchant.id)
      .then(tags => tags.json())
      .then(val => this.setState({tags: val.sort(this.compare)}))
      .catch(err => console.log(err))
  }

  voter = (props) => {
    fetch('/vote',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: props.userId,
        tagId: props.tagId,
        vote: props.vote,
        merchantId: props.merchantId
      })
    })
      .catch(err => console.log(err))
    if (props.vote > 0) {this.addScore('upvote')}
    else {this.addScore('downvote')}
    this.setState({tokens: this.state.tokens-1})
  }

  compare = (a, b) => {

    const ucbA = a.newUCB
    const ucbB = b.newUCB

    let comparison = 0;
    if (ucbA > ucbB) {
      comparison = -1;
    } else if (ucbA < ucbB) {
      comparison = 1;
    }
    return comparison;
  }

  addScore = (props) => {
    console.log('adding score')
    var bonus = 0
    if (props === 'create'){
      bonus = this.state.merchant.creation
    }
    else if (props === 'clean'){
      bonus = this.state.merchant.cleaning
    }
    else if (props === 'react'){
      bonus = this.state.merchant.upvoting
    }
    console.log(bonus)

    fetch('/addScore',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        merchantId: this.state.merchant.id,
        userId: this.state.userId,
        bonus: bonus,
      })
    })
    .catch(err => console.log(err))

    this.setState({prior: this.state.score,
                   score: (this.state.score+bonus),
                   tokens: (this.state.tokens-1)})
    console.log(this.state.score, this.state.prior)
  }

  addTag = (props) => {
    console.log('creating')
    fetch('/createTag',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        merchantId: this.state.merchant.id,
        creatorId: this.state.userId,
        creatorIcon: this.state.user.icon,
        content: props,
        hrounds: this.state.merchant.hrounds
      })
    })
    .then(newtag => newtag.json())
    .then(val => this.setState({tags: [val].concat(this.state.tags)}))
    .catch(err => console.log(err))

    this.addScore('creation')
    this.setState({tokens: this.state.tokens-1})
  }
  toggleCreator = (props) => {
    this.setState({modal: false})
  }

  expander = (tagId) => {
    if (this.state.expanded === tagId) {
      this.setState({expanded: null})
    }
    else {
      this.setState({expanded: tagId})
    }
  }

  render() {
    console.log(this.state.expanded)
    return (
      <div>
        <Headroom upTolerance={25} style={{
            background: 'white',
            border: "thin outset",
          }}>
          <div className='navbar-game'>
            <Button
              onClick={() => {window.location.href = "/merchants/"+this.state.userId}}
            >
              ⟵
            </Button>
            <ScrollToTop showUnder={20} style={
              { position: 'relative',
                top: "6px",
                right: "0",
                height: "100px",
                transitionDuration: '0.5s',
                transitionTimingFunction: 'linear',
                transitionDelay: '0s'
              }}>
                <Button color={"secondary"}>
                  top
                </Button>
            </ScrollToTop>
            <Button
              onClick={() => {this.onRefresh()}}
            >
              REFRESH
            </Button>
          </div>
        </Headroom>
        <br></br>
        <div className="preface">Have your say about...</div>
        <div className="greeting">{this.state.merchant.name}</div>
        <div>
          <div className="container">
            {this.state.tags.map(tag => <Tag handle={tag.creatorHandle}
                                             icon={tag.creatorIcon}
                                             content={tag.content}
                                             key={tag.id}
                                             userId={this.state.userId}
                                             merchantId={this.state.merchant.id}
                                             voter={this.voter}
                                             tagId={tag.id}
                                             treacts={tag.totalReacts}
                                             expanded={this.state.expanded}
                                             expander={this.expander}
                                             tokens={this.state.tokens}/> )}
          </div>
        </div>
        <div className="bottom">
          <div className="circle">
            <div className="creator">
              <Twitter onClick={()=>this.setState({modal: true})}/>
            </div>
          </div>
        </div>
        <div className="bottom">
          <Modal adder={this.addTag}
                  open={this.state.modal}
                  placeholder={""}
                  toggler={this.toggleCreator}/>
        </div>
      </div>
    );
  }
}

export default Game;

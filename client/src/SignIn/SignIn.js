import React from 'react';
import Button from '@material-ui/core/Button'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import './SignIn.css'

const config = {
  apiKey: 'AIzaSyCRHHknxMJdBEC0_4gxnJLefw-qGxkI5Qg',
  authDomain: 'tags-a56cc.firebaseapp.com',
};

const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

firebase.initializeApp(config);

class SignIn extends React.Component {

  state = {
    isSignedIn: false,
    name: '',
    url: '',
    id: '',
  }

  uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user,
                                name: user.displayName,
                                url: user.photoURL,
                                id: user.uid},
        () => {console.log('firing update user')
                fetch('/updateUser',{
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    name: this.state.name,
                    userId: this.state.id,
                    url: this.state.url
                  })
                })
              .catch(err => console.log(err))
              }
            )
    )
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    console.log(isInStandaloneMode())
    if (!this.state.isSignedIn) {
      return (
        <div className='notsignedin'>
          <div className='tags'>Tags</div>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
  } else {
      return(
        <div className='signedin'>
          <div className='tags'>Tags</div>
          <img className='photo'
               src={firebase.auth().currentUser.photoURL+'?height=500'}
               alt={this.state.name}
          />
          <div className='name'>{firebase.auth().currentUser.displayName}</div>
          <div className='options'>
            <Button
              onClick={() => window.location.href = "/merchants/"+this.state.id}>
            ⟶
            </Button>
          </div>
        </div>
      )
    }
  }
}

export default SignIn
